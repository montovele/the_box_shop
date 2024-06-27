import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ISelect } from "src/app/shared/components/select/select.component";
import { OrderService } from "src/app/shared/_api/order.service";
import { SystemService } from "../../../../../../shared/_api/system.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-quote-detail-dialog",
  templateUrl: "./quote-detail-dialog.component.html",
  styleUrls: ["./quote-detail-dialog.component.scss"],
})
export class QuoteDetailDialogComponent implements OnInit {
  quote_detail = <IQuote>{};
  form: FormGroup;

  select_state = <ISelect>{
    value_default: null,
    placeholder: "Selecciona Estado",
    data: [],
    name_select: "id_state",
    value: "id_state_mexico",
    option: "name_state",
    all: false,
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public order_service: OrderService,
    public dialog_ref: MatDialogRef<QuoteDetailDialogComponent>,
    public router: Router,
    public system_service: SystemService,
    public form_builder: FormBuilder
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
    this.getQuoteDetail();
    this.getStates();
  }

  closeDialog() {
    this.dialog_ref.close();
  }

  setValuesForm() {
    this.form.patchValue({
      name: this.quote_detail.name,
      last_name: this.quote_detail.last_name,
      email: this.quote_detail.email,
      phone: this.quote_detail.phone,
      address: this.quote_detail.address,
      city: this.quote_detail.city,
      country: this.quote_detail.country,
      id_state: this.quote_detail.id_state,
      zip: this.quote_detail.zip,
    });
    this.form.disable();
  }

  getQuoteDetail() {
    this.order_service.getQuoteDetail(this.data.id_quote).subscribe((res) => {
      console.log(res);
      this.quote_detail = res.data;
      this.select_state = {
        ...this.select_state,
        value_default: this.quote_detail.id_state,
      };
      this.setValuesForm();
    });
  }

  getCheckout(id_quote) {
    this.router.navigate(["/portal/checkout"], { queryParams: { id_quote } });
    this.closeDialog();
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

interface IQuote {
  address: string;
  last_name: string;
  full_name: string;
  city: string;
  country: string;
  created_date: Date;
  currency_usd: string;
  email: string;
  id_quote: number;
  id_state: number;
  id_status: number;
  id_user: number;
  iva: number;
  name: string;
  name_state: string;
  phone: string;
  products: Array<any>;
  quote_number: string;
  shipping_cost: number;
  status: string;
  subtotal: number;
  total: number;
  total_iva: number;
  zip: string;
}
