import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertDialogComponent } from '../../dialogs/alert-dialog/alert-dialog.component';
import { CreateAddressDialogComponent } from '../../dialogs/create-address-dialog/create-address-dialog.component';
import { UserService } from '../../_api/user.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-my-address',
  templateUrl: './my-address.component.html',
  styleUrls: ['./my-address.component.css']
})
export class MyAddressComponent implements OnInit {

  @Output() select_address = new EventEmitter();
  form_address: FormGroup;
  addresses: Array<any> = [];
  is_loading: boolean = false;
  is_submitted: boolean = false;
  address_selected:number = 0;
  index_default_address: number = 0;

  constructor(
    public form_builder: FormBuilder,
    public user_service: UserService,
    public dialog: MatDialog,
    public router: Router,
    public auth_service : AuthService
  ) { 
  }

  async ngOnInit() {
    await this.getUserAddress();
    if(this.addresses.length > 0){
      this.selectAddress(this.addresses[0])
    }
  }

  async getUserAddress(){
    this.is_loading = true;
    try {
      let res: any = await this.user_service.addressByUser(this.auth_service.id_user);
      this.is_loading = false;
        this.index_default_address = 0;
        this.addresses = res;
    } catch (error) {
    }
  }
  

  openDialog(address_info){
  let dialog = this.dialog.open(CreateAddressDialogComponent,{
    width : "800px",
    maxWidth: "100vh",
    maxHeight: "100vh",
    data: address_info,
  })

  dialog.afterClosed().subscribe(res=>{
    if(res){
      this.getUserAddress();
      if(typeof res === 'object' && res.id_address){
        this.selectAddress(res)
        this.address_selected = res.id_address
      }
    }
  })
  }
  
  deleteAddress(id_address:number){
    let dialog = this.dialog.open(AlertDialogComponent, {
      panelClass: "alert_dialog",
      data : {
        message: "¿Quieres eliminar esta direccion?",
        type: "warning"
      }
    })

    dialog.afterClosed().subscribe(accept=>{
      if(accept){
        this.user_service.deleteAddress(id_address)
        .subscribe(res=>{
          this.getUserAddress();
        })
      }
    })
  }

  updateDefaultAddress(address, index:number){
    this.addresses[this.index_default_address].default = false
    let data = {id_address: address.id_address}
    this.user_service.updateDefaultAddress(data)
    .subscribe(res =>{
      address.default = true;
      this.index_default_address = index;
    })
  }

  selectAddress(address){
    this.address_selected = address.id_address
    this.select_address.emit(address)
  }

}
