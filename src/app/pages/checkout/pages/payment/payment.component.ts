import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertDialogComponent } from "src/app/shared/dialogs/alert-dialog/alert-dialog.component";
import { CartService } from "src/app/shared/_api/cart.service";
import { OrderService } from "src/app/shared/_api/order.service";
import { SystemService } from "src/app/shared/_api/system.service";
import { UserService } from "src/app/shared/_api/user.service";
import { AuthService } from "src/app/shared/_services/auth.service";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"],
})
export class PaymentComponent implements OnInit {
  user_information: any;
  form_info_envio: FormGroup;
  form_pago: FormGroup;
  form_direccion: FormGroup;
  type_card: string;
  order_model;
  order_detail;
  is_submitted: boolean = false;
  is_loading: boolean = false;
  select_pay: number = 1;
  id_quote;
  states: Array<any> = [];

  arr_cart: any = [];
  constructor(
    public auth_service: AuthService,
    public user_service: UserService,
    public order_service: OrderService,
    private form_builder: FormBuilder,
    public dialog: MatDialog,
    public cart_service: CartService,
    public route: ActivatedRoute,
    public router: Router,
    public system_service: SystemService
  ) {
    this.form_info_envio = this.form_builder.group({
      name: ["", Validators.required],
      last_name: ["", Validators.required],
      email: [{ value: "", disabled: true }, Validators.required],
      phone: ["", Validators.required],
    });

    this.form_pago = this.form_builder.group({
      card_number: ["", Validators.required],
      card_name: ["", Validators.required],
      card_exp: ["", Validators.required],
      cvc: ["", Validators.required],
    });

    this.form_direccion = this.form_builder.group({
      address: ["", Validators.required],
      city: ["", Validators.required],
      country: ["Mexico", Validators.required],
      name: [""],
      name_state: [""],
      id_state: [null, Validators.required],
      zip: ["", Validators.required],
      id_address: [null],
      iva: [16],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params.id_quote) {
        this.id_quote = params.id_quote;
        this.getQuoteInfo();
      } else {
        if (this.auth_service.token) {
          this.getCartUser();
          this.userInformation();
        } else {
          this.getStates();
          this.form_info_envio.controls.email.enable();
        }
      }
    });
  }

  ngOnDestroy() {}

  getQuoteInfo() {
    this.userInformation();
    this.getQuoteDetail();
    this.getStates();
  }

  getQuoteDetail() {
    this.order_service.getQuoteDetail(this.id_quote).subscribe((res) => {
      if (res.data.id_status == 1) {
        this.cart_service.shipping = res.data.shipping_cost;
        this.cart_service.subtotal = res.data.subtotal;
        this.cart_service.iva = res.data.total_iva;
        this.cart_service.total = res.data.total;
        this.cart_service.list_prod_cart = res.data.products;
        this.form_direccion.patchValue({
          address: res.data.address,
          city: res.data.city,
          country: res.data.country,
          name: res.data.name,
          id_state: res.data.id_state,
          zip: res.data.zip,
          state: res.data.name_state,
        });
        this.form_direccion.controls.iva.setValue(res.data.iva);
      } else {
        this.updateQueryParams();
        this.getCartUser();
      }
    });
  }

  getCartUser() {
    this.cart_service.getListCart();
  }

  userInformation() {
    this.user_service.getClientDetail().subscribe((res) => {
      this.user_information = res.data;
      this.setFormValues();
    });
  }

  setFormValues() {
    this.form_info_envio.setValue({
      name: this.user_information.name,
      last_name: this.user_information.lastname,
      email: this.user_information.email,
      phone: this.user_information.phone,
    });
  }

  selectAddres(address) {
    this.form_direccion.patchValue({
      address: address.address,
      city: address.city,
      country: address.country,
      name: address.name,
      id_state: address.id_state,
      name_state: address.name_state,
      zip: address.zip,
      id_address: address.id_address,
      iva: address.iva,
    });
    this.cart_service.calculateTotal(address.iva);
  }

  changeState(id_state) {
    let state = this.states.find((e) => {
      if (id_state == e.id_state_mexico) {
        return e;
      }
    });
    this.f_direccion.id_state.setValue(state.id_state_mexico);
    this.f_direccion.name_state.setValue(state.name_state);
    this.f_direccion.iva.setValue(state.iva);
    this.cart_service.calculateTotal(state.iva);
  }

  setCreditCard() {
    let card_number = this.form_pago.controls.card_number.value;
    this.form_pago.controls.card_number.setValue(
      card_number
        .replace(/\s/g, "")
        .replace(/\D/g, "")
        .replace(/([0-9]{4})/g, "$1 ")
        .trim()
    );

    if (card_number.length <= 2 && card_number > 0) {
      this.getTypeCard(card_number);
    }
  }

  setCVC() {
    let card_cvc = this.form_pago.controls.cvc.value;
    this.form_pago.controls.cvc.setValue(card_cvc.replace(/\s/g, "").replace(/\D/g, "").trim());
  }

  setExpDate() {
    let exp_date = this.form_pago.controls.card_exp.value;
    if (exp_date.length == 2) {
      this.form_pago.controls.card_exp.setValue(
        exp_date
          .replace(/\s/g, "")
          .replace(/\D/g, "")
          .replace(/([0-9]{2})/g, "$1/")
          .trim()
      );
    }
  }

  getTypeCard(card_number) {
    if (card_number.substring(0, 1) == 4) {
      this.type_card = "Visa";
      return;
    }
    if (card_number.substring(0, 1) == 5) {
      this.type_card = "Mastercard";
      return;
    }
    if (card_number.substring(0, 2) == 37 || card_number.substring(0, 2) == 34) {
      this.type_card = "American Express";
      return;
    }
  }

  goPay() {
    this.is_submitted = true;
    console.log(this.form_direccion.value);
    console.log(this.form_info_envio.invalid);
    if (this.form_direccion.invalid || this.form_info_envio.invalid) {
      return this.alertDialog("Favor de completar todos los datos", "message");
    }
    this.is_loading = true;
    this.createOrderModel();
    this.order_service.createTransaction(this.order_model).subscribe(
      (res) => {
        if (this.select_pay == 1) {
          window.location.href = `${res.data.init_point}`;
        } else {
          localStorage.removeItem("id_cart_header");
          this.router.navigate(["/portal/checkout/payment_success"], {
            queryParams: { id_order: res.data.id_order, id_cart_header: res.data.id_cart_header },
          });
        }
      },
      (error) => {
        this.is_loading = false;
        this.alertDialog(error.message, "error");
      }
    );
    /*     this.order_service.createPreferencesMercadoPago(data)
    .subscribe(res =>{
      window.location.href = (`${ res.init_point }`)
    }) */
  }

  createOrder() {
    this.is_submitted = true;
    if (this.form_direccion.invalid || this.form_info_envio.invalid) {
      return this.alertDialog("Favor de completar todos los datos", "message");
    }
    this.is_loading = true;
    this.createOrderModel();
    this.order_service.createOrder(this.order_model).subscribe(
      (res) => {
        this.is_loading = false;
        this.createOrderDetail(res.order_number);
        if (!this.id_quote) {
          this.deleteCart();
        }
      },
      (error) => {
        this.is_loading = false;
        this.alertDialog(error.message, "error");
      }
    );
  }

  createOrderModel() {
    this.order_model = {
      ...this.form_direccion.value,
      ...this.form_info_envio.value,
      id_quote: this.id_quote,
      email: this.form_info_envio.controls.email.value,
      products: this.cart_service.list_prod_cart,
      id_payment_type: this.select_pay,
    };
    console.log(this.order_model);
    /*     this.order_model = {
      header: {
        ...this.form_direccion.value,
        ...this.form_info_envio.value,
        id_quote: this.id_quote,
        card_number: "XXXX " + last_digits[3],
        email: this.form_info_envio.controls.email.value,
        products: this.cart_service.list_prod_cart,
      },
      payment: this.form_pago.value,
    }; */
  }

  createOrderDetail(order_number) {
    this.order_detail = {
      ...this.form_direccion.value,
      ...this.form_info_envio.value,
      ...this.form_pago.value,
      order_number,
      products: this.cart_service.list_prod_cart,
      total: this.cart_service.total,
      sub_total: this.cart_service.subtotal,
      shipping: this.cart_service.shipping,
      iva: this.cart_service.iva,
    };
  }

  deleteCart() {
    if (this.cart_service.list_prod_cart.length > 0) {
      let data = {
        delete_all: true,
        id_cart_header: this.cart_service.id_cart_header,
      };
      this.cart_service.deleteCart(data).subscribe((res) => {
        this.getCartUser();
      });
    }
  }

  alertDialog(message, type) {
    let dialog = this.dialog.open(AlertDialogComponent, {
      panelClass: "alert_dialog",
      data: {
        message,
        type,
      },
    });
  }

  selectPay(number) {
    this.select_pay = number;
    if (this.select_pay == 2) {
      if (this.user_information.available_credit < this.cart_service.total) {
        this.alertDialog("No tienes suficiente credito para esta compra", "message");
        this.select_pay = 1;
      }
    }
  }

  clearValidatorsPayment() {
    this.f_pago.card_number.clearValidators();
    this.f_pago.card_name.clearValidators();
    this.f_pago.card_exp.clearValidators();
    this.f_pago.cvc.clearValidators();
    this.f_pago.card_number.updateValueAndValidity();
    this.f_pago.card_name.updateValueAndValidity();
    this.f_pago.card_exp.updateValueAndValidity();
    this.f_pago.cvc.updateValueAndValidity();
  }

  setValidatorsPayment() {
    this.f_pago.card_number.setValidators([Validators.required]);
    this.f_pago.card_name.setValidators([Validators.required]);
    this.f_pago.card_exp.setValidators([Validators.required]);
    this.f_pago.cvc.setValidators([Validators.required]);
    this.f_pago.card_number.updateValueAndValidity();
    this.f_pago.card_name.updateValueAndValidity();
    this.f_pago.card_exp.updateValueAndValidity();
    this.f_pago.cvc.updateValueAndValidity();
  }

  updateQueryParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { id_quote: null },
      queryParamsHandling: "merge",
    });
  }

  getStates() {
    this.system_service.getStates().subscribe((res) => {
      this.states = res.data;
    });
  }

  get f_direccion() {
    return this.form_direccion.controls;
  }
  get f_envio() {
    return this.form_info_envio.controls;
  }
  get f_pago() {
    return this.form_pago.controls;
  }
}
