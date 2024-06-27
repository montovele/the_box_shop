import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from '../../_api/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  products: Array<any> = [];
  
  constructor(
    @Inject(MAT_DIALOG_DATA)public data,
    public dialog_ref: MatDialogRef<OrderDetailComponent>,
    public order_service:OrderService
  ) { 

   }

  ngOnInit(): void {
    this.getOrderDetail();
  }

  getOrderDetail(){
    let data = {
      id_order : this.data.id_order
    }
    this.order_service.getOrderDetail(data)
    .subscribe(res =>{
      this.products = res.products;
    })
  }

  closeDialog(){
    this.dialog_ref.close();
  }
}
