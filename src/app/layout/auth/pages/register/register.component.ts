import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/_services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  login_form: FormGroup;

  loading: boolean;
  submitted = false;
  wrong_password = false;
  email_used = false;

  constructor(private APIauth: AuthService, private form_builder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.login_form = this.form_builder.group({
      // business_name: ['', [Validators.required]],
      name: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      confirm_password: ["", Validators.required],
    });
  }

  register() {
    this.email_used = false;
    this.loading = true;
    let user = {
      //business_name: this.login_form.value.business_name,
      name: this.login_form.value.name,
      lastname: this.login_form.value.lastname,
      email: this.login_form.value.email,
      password: this.login_form.value.password,
      phone: "",
    };

    this.APIauth.register(user).subscribe((res) => {
      this.loading = false;
      if (!res.status) {
        this.email_used = true;
      } else {
        this.router.navigateByUrl("/auth/success");
      }
    },error =>{
      this.loading= false
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.login_form.invalid) return;

    if (this.login_form.value.password !== this.login_form.value.confirm_password) {
      this.wrong_password = true;
      return;
    }

    this.register();
    this.wrong_password = false;
  }

  get f() {
    return this.login_form.controls;
  }
}
