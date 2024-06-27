import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/_api/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  form:FormGroup
  message_error = null
  is_loading: boolean = false
  success: boolean = false;


  constructor(
    public form_builder:FormBuilder,
    public user_service:UserService
  ) {
    this.form = this.form_builder.group({
      email: ["", [Validators.required, Validators.email]]
    })
   }

  ngOnInit() {
  }

  sendEmail(){
    if(this.form.invalid){
      this.message_error = "Favor de introducir un correo valido"
      return
    }
    this.is_loading = true;
    this.user_service.restorePassword(this.form.value)
    .subscribe(res =>{
      if(res.status){
        this.success = true;
      }else{
        this.is_loading = false;
        this.message_error = "No hay una cuenta registrada con este correo"
      }

    }, error =>{
      this.is_loading = false;
      this.message_error = "Error al tratar de restaurar contraseña, favor de intentarlo de nuevo"
    })
  }

}
