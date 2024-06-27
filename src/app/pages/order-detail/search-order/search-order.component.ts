import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/shared/_api/order.service';
import { AuthService } from 'src/app/shared/_services/auth.service';

@Component({
  selector: 'app-search-order',
  templateUrl: './search-order.component.html',
  styleUrls: ['./search-order.component.css']
})
export class SearchOrderComponent implements OnInit {

  is_loading: boolean = false;
  form: FormGroup
  error_message = "";

  constructor(
    private form_builder: FormBuilder,
    public order_service: OrderService,
    public router: Router,
    public auth_service: AuthService,
    public route: ActivatedRoute
  ) { 
    this.form = this.form_builder.group({
      order_number: ["", Validators.required],
      token: ["",Validators.required]
    })
  }

  ngOnInit(): void {
    window.scroll(0,0)
    if(localStorage.getItem("session")){
      this.router.navigate(["/portal/account/orders"])
    }
    this.route.queryParams.subscribe(params =>{
      if(params.order_number && params.token){
        this.form.controls.order_number.setValue(params.order_number)
        this.form.controls.token.setValue(params.token)
      }else{
        if(localStorage.getItem("order_detail")){
          let order_detail = JSON.parse(localStorage.getItem("order_detail"));
          this.form.controls.order_number.setValue(order_detail.order_number)
          this.form.controls.token.setValue(order_detail.token)
        }
      }
    })
  }

  searchOrder(){
    if(this.form.invalid){
      this.error_message = "Favor de llenar los datos"
      return;
    }
    this.is_loading = true;
    this.order_service.searchOrder(this.form.value)
    .subscribe(res =>{
      if(res.status){
        localStorage.setItem("order_detail", JSON.stringify(this.form.value))
        this.router.navigate(["/portal/order/order_detail", this.form.controls.order_number.value])
      }else{
        this.is_loading = false;
        this.error_message = "No se encontro ninguna orden, verifica los datos."
      }
    }, error =>{
      this.is_loading = false;
      this.error_message = "Error al consultar orden"
    })
  }

  goToLogin(){
    this.auth_service.go_to_list_orders = true;
    this.router.navigate(["/auth/login"])
  }

}
