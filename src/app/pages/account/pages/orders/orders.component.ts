import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { OrderDetailComponent } from "src/app/pages/order-detail/order-detail/order-detail.component";
import { OrderService } from "src/app/shared/_api/order.service";
import { AuthService } from "src/app/shared/_services/auth.service";
import { OrderDetailDialogComponent } from "./components/order-detail-dialog/order-detail-dialog.component";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"],
})
export class OrdersComponent implements OnInit {
  filter_orders;
  orders: Array<any> = [];
  total_results: Number = 0;
  page = 1;

  constructor(
    private router: Router,
    public order_service: OrderService,
    public dialog: MatDialog,
    public auth_service: AuthService
  ) {
    this.filter_orders = {
      criteria: "",
      page: 1,
      limit: 15,
      id_user: this.auth_service.id_user,
    };
  }

  ngOnInit() {
    this.getOrders();
  }

  goToOrderDetails(order) {
    let dialog = this.dialog.open(OrderDetailDialogComponent, {
      width: "900px",
      height: "800px",
      data: order,
    });
  }

  getOrders() {
    window.scroll(0, 0);
    this.order_service.getOrdersByUser(this.filter_orders).subscribe((res) => {
      if (res.status) {
        this.orders = res.data;
        this.total_results = res.total;
        console.log(this.total_results);
      }
    });
  }

  changeSearch(value) {
    this.filter_orders.criteria = value;
    this.filter_orders.page = 1;
    this.getOrders();
  }
}
