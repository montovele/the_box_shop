import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/_api/user.service';
import { AuthService } from 'src/app/shared/_services/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  form: FormGroup;
  user_information:any = {};
  submitted:boolean = false;
  edit_user:boolean = true;
  edit_address:boolean = true;
  
  constructor(
    private APIuser: UserService,
    private formBuilder: FormBuilder,
    public auth_service: AuthService
    ) { 
    
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.userForm();
    this.userInformation(this.auth_service.id_user);
  }

  userInformation(id_user){
    this.APIuser.getClientDetail().subscribe(res => {
      console.log(res);
      this.user_information = res.data;
      this.setFormValues();
    });
  }

  userForm() {
    this.form = this.formBuilder.group({
      name: [{value: '', disabled: true}, [,Validators.required]],
      lastname: [{value: '', disabled: true}, [,Validators.required]],
      email: [{value: '', disabled: true}, [,Validators.required]],
      phone: [{value: '', disabled: true}],
      birthday: [{value: '', disabled: true}]
    });
  }

  setFormValues(){
    this.form.setValue({
      name: this.user_information.name,
      lastname: this.user_information.lastname,
      email: this.user_information.email,
      phone: this.user_information.phone,
      birthday: this.user_information.birthday
    });
  }

  editUser(){
    this.edit_user = !this.edit_user;
    this.form.enable();
    this.form.controls.email.disable();
    let user = { ...this.form.value }

    if(this.edit_user == true){
      this.APIuser.updateUser(user).subscribe(data =>{
        console.log(data);
      });
    } 
  }


  get f() { return this.form.controls; }

}
