import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from 'src/app/shared/_api/system.service';
import { UserService } from 'src/app/shared/_api/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  is_loading: boolean = false;
  form: FormGroup
  error_message = null
  status = null;
  status_message = null;
  status_title = null;

  constructor(
    public system:SystemService,
    public form_builder: FormBuilder,
    public route: ActivatedRoute,
    public router:Router,
    public user_service:UserService
    ) {
    let token = this.route.snapshot.queryParams['code']
    if(token){
      this.verifyToken(token)
    }else{
      this.router.navigate(['auth/login'])
    }
    
    this.form = this.form_builder.group({
      password: ["", Validators.required],
      repeat_password: ["", Validators.required],
      email: ["", Validators.required]
    })
   }

  ngOnInit(): void {
  }

  resetPassword(){
    if(this.form.invalid){
      this.error_message = "Favor de completar el formulario"
      return;
    }
    if(this.form.controls.password.value != this.form.controls.repeat_password.value){
      this.error_message = "Las contraseñas no coinciden"
    }
    this.user_service.updatePassword(this.form.value)
    .subscribe(res =>{
      this.status = "success"
      this.status_title = "Actualizacion exitosa"
      this.status_message = "¡Felicidades! Has cambiado tu contraseña con éxito."
    }, error =>{
      this.status = "error"
      this.status_title = "Error"
      this.status_message = "Hubo al tratar de cambiar la contraseña"
    })
  }

  verifyToken(token){
    this.system.verifyToken(token)
    .subscribe(res =>{
      if(res.status){
       this.form.controls.email.setValue(res.data.email)
      }else{
        this.status = "error"
        this.status_title = "Error"
        this.status_message = "Token para cambio de contraseña expirado o no valido, favor de volver a generar una nueva solicitud de cambio de contraseña."
      }
    }, error =>{
      this.status = "error"
      this.status_title = "Error"
      this.status_message = "Token para cambio de contraseña expirado o no valido, favor de volver a generar una nueva solicitud de cambio de contraseña."
    })
  }


  redirect(){
    if(this.status == 'success'){
      this.router.navigate(['auth/login'])
    }
    if(this.status == 'error'){
      this.router.navigate(['auth/forgot'])
    }
  }

}
