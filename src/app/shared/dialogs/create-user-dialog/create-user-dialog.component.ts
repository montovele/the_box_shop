import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ignoreElements } from 'rxjs/operators';
import { UserService } from '../../_api/user.service';
import { User } from '../../_models/users/users.model';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.css']
})
export class CreateUserDialogComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  loading = false;
  email_invalid = false;
  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateUserDialogComponent>,
    private usersAPI: UserService, 
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.createForm();
  }

  ngOnInit() {
  }

  saveUser(){
    this.loading = true;
    let user = new User();
    user.user_type_id = this.form.value.user_type_id;
    user.user_status_id = this.form.value.user_status_id;
    user.name = this.form.value.name;
    user.lastname = this.form.value.lastname;
    user.email = this.form.value.email;
    user.phone = this.form.value.phone;;
    user.country = this.form.value.country;
    user.state = this.form.value.state;
    user.city = this.form.value.city;
    user.created_on = new Date();

    /* this.usersAPI.saveUser(user)
    .subscribe((data: boolean) => {
      this.openSnackBar("Usuario Creado!","Success","success");
      this.closeDialog();
    },error =>{
      if(error.error.text){
        this.email_invalid = true;
        this.openSnackBar("Correo en uso","Error","danger");
      }
    }) */
    this.loading = false;
  }

  submitForm(){
    this.submitted = true;
    if(this.form.valid){
      this.saveUser();
    }
    else{
      console.log("Forma incorrecta");
    }
  }

  createForm() {
    this.form = this.formBuilder.group({
      name:        ['', Validators.required],
      lastname: ['', Validators.required],
      email:     ['', [Validators.required, Validators.email]],
      phone:     ['', Validators.required],
      country:     ['', Validators.required],
      state:       ['', Validators.required],
      city:        ['', Validators.required],
      user_type_id: ['', Validators.required],
    });
  }
  get f() { return this.form.controls; }

  closeDialog() {
    this.dialogRef.close(true);
  }

  openSnackBar(message: string, action: string, panel_class:string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: [panel_class + '-snackbar']
    });
  }

}
