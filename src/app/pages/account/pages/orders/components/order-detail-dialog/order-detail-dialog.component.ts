import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { OrderService } from "../../../../../../shared/_api/order.service";
import { SystemService } from "../../../../../../shared/_api/system.service";
import { ISelect } from "src/app/shared/components/select/select.component";

@Component({
  selector: "app-order-detail-dialog",
  templateUrl: "./order-detail-dialog.component.html",
  styleUrls: ["./order-detail-dialog.component.scss"],
})
export class OrderDetailDialogComponent implements OnInit {
  select_state = <ISelect>{
    value_default: this.data.id_state,
    placeholder: "Selecciona Estado",
    data: [],
    name_select: "id_state",
    value: "id_state_mexico",
    option: "name_state",
    all: false,
  };
  order_detail = <IOrder>{};
  form: FormGroup;
  constructor(
    public order_service: OrderService,
    public dialog_ref: MatDialogRef<OrderDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public form_builder: FormBuilder,
    public system_service: SystemService
  ) {
    this.form = this.form_builder.group({
      name: ["", Validators.required],
      last_name: ["", Validators.required],
      email: [{ value: "" }, Validators.required],
      phone: ["", Validators.required],
      address: ["", Validators.required],
      city: ["", Validators.required],
      country: ["Mexico", Validators.required],
      state: ["", Validators.required],
      id_state: [null, Validators.required],
      zip: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.getStates();
    this.getOrderDetail();
  }

  closeDialog() {
    this.dialog_ref.close();
  }

  getOrderDetail() {
    let data = {
      id_order: this.data.id_order,
    };
    this.order_service.getOrderDetail(data).subscribe((res) => {
      console.log(res);
      if (res.status) {
        this.order_detail = res.data;
        this.select_state.value_default = res.data.id_state;
        this.setValuesForm();
      }
    });
  }

  setValuesForm() {
    this.form.patchValue({
      name: this.order_detail.name,
      last_name: this.order_detail.last_name,
      email: this.order_detail.email,
      phone: this.order_detail.phone,
      address: this.order_detail.address,
      city: this.order_detail.city,
      country: this.order_detail.country,
      id_state: this.order_detail.id_state,
      zip: this.order_detail.zip,
    });
    this.form.disable();
  }

  getStates() {
    this.system_service.getStates().subscribe((res) => {
      this.select_state.data = res.data;
    });
  }

  changeSelect(event) {
    this.form.get(event.name).setValue(event.value);
  }
}

interface IOrder {
  phone: string;
  email: string;
  name: string;
  last_name: string;
  address: string;
  city: string;
  country: string;
  created_date: Date;
  id_order: number;
  id_order_status: number;
  id_quote: number;
  id_state: number;
  id_user: number;
  name_state: string;
  order_number: string;
  order_status: string;
  products: Array<any>;
  shipping_cost: number;
  subtotal: number;
  token: number;
  total: number;
  total_iva: number;
  total_products: number;
  user_name: string;
  zip: string;
}
