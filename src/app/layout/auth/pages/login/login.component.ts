import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/_services/auth.service';
import jwt_decode from "jwt-decode";
import { CartService } from 'src/app/shared/_api/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  login_form: FormGroup;

  loading: boolean;
  submitted = false;
  show_alert = "";
  not_verified = false;

  constructor(
    private form_builder: FormBuilder,
    private auth_service: AuthService,
    private router: Router,
    public cart_service: CartService
  ) { }

  ngOnInit() {
    this.createLoginForm();
  }

  ngOnDestroy(): void {
    this.auth_service.go_to_list_orders = false;
  }

  createLoginForm() {
    this.login_form = this.form_builder.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() { return this.login_form.controls }

  login() {
    this.show_alert = "";
    this.loading = true;
    let user = {
      email: this.login_form.value.email,
      password: this.login_form.value.password
    }
    this.auth_service.login(user).subscribe(res => {
      if(res.status){
        this.decodeToken(res.token)
      }else{
        this.loading = false;
        this.show_alert = res.message;
      }
    }, error =>{
      this.show_alert = error.error.message ? error.error.message : error.message;
      this.loading = false;
    });
  }

  async decodeToken(token){
    localStorage.setItem('session', token);
    this.auth_service.token = token;
    this.auth_service.user_info = jwt_decode(token)
    this.auth_service.id_user =  this.auth_service.user_info.id_user;
    this.auth_service.id_user_type =  this.auth_service.user_info.id_user_type;
    this.auth_service.name = this.auth_service.user_info.name;
    if(localStorage.getItem("id_cart_header")){
      if(this.cart_service.list_prod_cart.length > 0){
        await this.addProductsToCart();
      }
      this.deleteCart();
      localStorage.removeItem("id_cart_header")
    }
    
    if(this.auth_service.go_to_list_orders){
      this.auth_service.go_to_list_orders = false;
      this.router.navigateByUrl('/portal/account/orders');
    }else{
      this.router.navigateByUrl('/portal/home');
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.login_form.invalid) return;
    this.login();
  }

  addProductsToCart(){
    return new Promise((resolve,reject) =>{
      let data = {
        id_user: this.auth_service.id_user,
        id_cart_header: this.auth_service.user_info.id_cart_header,
        action: "add",
        products: this.cart_service.list_prod_cart
      }
      this.cart_service.addCart(data).subscribe(data => {
        resolve(true);
      }, error =>{
        resolve(false);
      })
    })
  }

  deleteCart(){
    let data = {
      delete_all: true,
      id_cart_header: localStorage.getItem("id_product_header")
    }
    this.cart_service.deleteCart(data)
  }
}
