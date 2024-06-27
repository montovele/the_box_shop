import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertDialogComponent } from "src/app/shared/dialogs/alert-dialog/alert-dialog.component";
import { CartService } from "src/app/shared/_api/cart.service";
import { OrderService } from "src/app/shared/_api/order.service";

@Component({
  selector: "app-payment-sucess",
  templateUrl: "./payment-sucess.component.html",
  styleUrls: ["./payment-sucess.component.scss"],
})
export class PaymentSucessComponent implements OnInit {
  order_detail: any;
  products = new Array();

  constructor(
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public order_service: OrderService,
    public router: Router,
    public cart_service: CartService
  ) {
    this.aproveOrder();
  }

  ngOnInit() {}

  aproveOrder() {
    let uid = this.route.snapshot.queryParams.preference_id;
    let id_payment = this.route.snapshot.queryParams.payment_id;
    let id_cart_header = this.route.snapshot.queryParams.id_cart_header;
    let id_order = this.route.snapshot.queryParams.id_order;
    if ((uid && id_payment) || id_order) {
      this.order_service.approveOrder({ uid, id_payment, id_cart_header, id_order }).subscribe(
        (res) => {
          this.order_detail = res.data;
          this.cart_service.total_products = 0;
          this.cart_service.list_prod_cart = [];
          this.cart_service.list_group_cart = [];
        },
        (error) => {
          this.router.navigate(["/portal/home"]);
        }
      );
    } else {
      this.router.navigate(["/portal/home"]);
    }
  }
}
