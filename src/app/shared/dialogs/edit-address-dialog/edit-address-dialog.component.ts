import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { RequestService } from '../../_services/request.service';

@Component({
  selector: 'app-edit-address-dialog',
  templateUrl: './edit-address-dialog.component.html',
  styleUrls: ['./edit-address-dialog.component.css']
})
export class EditAddressDialogComponent implements OnInit {

  form: FormGroup;

  ID: string;
  addressId: string;
  name: string;
  telephone1: string;
  street1: string;
  street2: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;

  loading = false;
  submitted = false;
  spinnerLoading = false;

  constructor(
    private API: RequestService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditAddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.ID         = this.data['id'];
    this.addressId  = this.data['addressId'];
    this.name       = this.data['name'];
    this.telephone1 = this.data['telephone1'];
    this.street1    = this.data['street1'];
    this.street2    = this.data['street2'];
    this.country    = this.data['country'];
    this.state      = this.data['state'];
    this.city       = this.data['city'];
    this.postalCode = this.data['postalCode'];

    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.form = this.formBuilder.group({
      name:       [this.name, Validators.required],
      telephone1: [this.telephone1, Validators.minLength(10)],
      street1:    [this.street1, Validators.required],
      street2:    [this.street2],
      country:    [this.country, Validators.required],
      state:      [this.state, Validators.required],
      city:       [this.city, Validators.required],
      postalCode: [this.postalCode, [ Validators.required, Validators.minLength(5)]]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
