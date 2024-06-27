import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../_api/user.service';
import { AuthService } from 'src/app/shared/_services/auth.service';
import { SystemService } from '../../_api/system.service';

@Component({
  selector: 'app-create-address-dialog',
  templateUrl: './create-address-dialog.component.html',
  styleUrls: ['./create-address-dialog.component.css']
})
export class CreateAddressDialogComponent implements OnInit {
  form: FormGroup;
  arr_states:Array<any>;
  loading = false;
  submitted = false;

  constructor(
    public auth_service: AuthService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateAddressDialogComponent>,
    private APIuser: UserService,
    public system_service:SystemService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  ngOnInit() {
    if(this.data){
      this.editForm();
    }else{
      this.createForm();
    }
    this.getStates()
  }

  editForm(){
    this.form = this.formBuilder.group({
      id_address: [this.data.id_address, [Validators.required]],
      name: [this.data.name, [Validators.required]],
      country: [{value: 'México', disabled:true}, [Validators.required]],
      id_state: [ this.data.id_state, [Validators.required]],
      city: [this.data.city,  [Validators.required]],
      address: [this.data.address,  [Validators.required]],
      zip: [this.data.zip,  [Validators.required]]
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      country: [{value: 'México', disabled:true}, [Validators.required]],
      id_state: [ '', [Validators.required]],
      city: ['',  [Validators.required]],
      address: ['',  [Validators.required]],
      zip: ['',  [Validators.required]]
    });
    this.form.patchValue({
        country: 'México'
    });
  }

  async createAddress(){
    this.submitted = true;
    if(this.form.invalid){
      console.log('Form is invalid');
      return;
    }
    this.loading = true;
    let data = { 
      id_user: this.auth_service.id_user,
      country: 'México',
      ...this.form.value 
    }
    this.APIuser.createAddress(data)
    .subscribe(res =>{
      if(res.status){
        this.dialogRef.close(res.data);
      }
    })
  }


  getStates(){
    this.system_service.getStates()
    .subscribe(res =>{
      this.arr_states = res.data;
    })
  }


  closeDialog() {
    this.dialogRef.close(false);
  }

  get f() { return this.form.controls; }
}
