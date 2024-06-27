import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/shared/_api/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  order_detail:any;
  list_products = [];
  obj_order_detail: any;

  constructor(
    public order_service: OrderService,
    private router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let order_number = this.route.snapshot.paramMap.get('order_number')
    this.obj_order_detail = JSON.parse(localStorage.getItem("order_detail"));
    if(order_number && (this.obj_order_detail.order_number == order_number)){
      this.searchOrder();
    }else{
      this.router.navigate(["/portal/order/"])
    }
  }

  searchOrder(){
    this.order_service.searchOrder(this.obj_order_detail)
    .subscribe(res =>{
      console.log(res)
      if(res.status){
        this.order_detail = res.result;
        this.getOrderDetail(this.order_detail.id_order)
      }else{
        this.router.navigate(["/portal/order"])
      }
    }, error =>{
      this.router.navigate(["/portal/order"])
    })
  }

  getOrderDetail(id_order){
    let data = {
      id_order
    }
    this.order_service.getOrderDetail(data)
    .subscribe(res =>{
      console.log(res)
      if(res.status){
        this.list_products = res.data.products
      }else{
        this.router.navigate(["/portal/order"])
      }
    }, error =>{
      this.router.navigate(["/portal/order"])
    })
  }

}
