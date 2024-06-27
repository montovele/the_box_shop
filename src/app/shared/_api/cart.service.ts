import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  url:string;
  list_prod_cart: Array<any> = [];
  list_group_cart: Array<any> = [];
  list_prod_cart_in_stock: Array<any> = [];
  subtotal: number;
  total: number;
  shipping: number;
  iva: number;
  total_products:number = 0;
  is_loading: boolean = true;
  id_cart_header: number;

  constructor(private httpClient: HttpClient,
    public auth_service: AuthService
    ) {
    this.url = environment.api_url;
  }

  cartByUser(data): Observable<any> {
    const response: Observable<any> = 
    this.httpClient.post<any>(this.url + "cart/cart-user", data);
    return response;
  }

  addCart(filters:object): Observable<any> {
    return this.httpClient.post<any>(this.url + "cart/cart-add" , filters);
  }

  deleteCart(data: object): Observable<any>{
    return this.httpClient.post<any>(this.url + "cart/cart_delete" , data);
  }

  async getListCart(){
    if(this.auth_service.user_info || localStorage.getItem("id_cart_header")){
      this.is_loading = true;
      let data = {
        id_user : this.auth_service.user_info ? this.auth_service.user_info.id_user : null,
        id_cart_header:  localStorage.getItem("id_cart_header")
      }
      this.cartByUser(data)
      .subscribe(res => {
        this.is_loading = false;
        this.id_cart_header   = res.result.id_cart_header
        this.total_products   = res.result.grand_total_products;
        this.subtotal         = res.result.grand_subtotal;
        this.total            = res.result.grand_total;
        this.iva              = res.result.grand_iva;
        this.shipping         = res.result.grand_shipping_cost;
        this.list_prod_cart   = res.result.list_cart;
        this.list_group_cart  = res.result.grouped_cart;
        if(!this.auth_service.token && this.list_prod_cart.length == 0){
          let data = {
            delete_all: true,
            id_cart_header: this.id_cart_header
          }
          this.deleteCart(data);
          this.id_cart_header = null
          localStorage.removeItem("id_cart_header")
        }
      })
    }
  }

  calculateTotal(new_iva = null){
    this.total_products = 0;
    this.subtotal = 0;
    this.total = 0;
    this.iva = 0;
    this.shipping = 0;

    this.list_prod_cart_in_stock = [];
    this.list_prod_cart.map(e => {
      if(e.stock > 0){ 
        if(e.selected_qty >= e.stock){
          e.selected_qty = e.stock;
        }
        e.iva = new_iva ? new_iva : e.iva;
        e.price = (e.price_without_iva * ( 1 + (new_iva ? new_iva : e.iva)/100 ));
        this.list_prod_cart_in_stock.push(e)
        this.total_products += e.selected_qty;
        this.iva += e.selected_qty * (e.price_without_iva * ( (new_iva ? new_iva : e.iva)/100 ));
        this.shipping += e.shipping_cost;
        this.subtotal +=   e.selected_qty * e.price_without_iva;
      }
    })
    this.total = Number(this.subtotal + this.iva + this.shipping);
    this.is_loading = false;
  }

/*  async buildCartInfo(new_iva = null){
    this.total_products = 0;
    this.subtotal = 0;
    this.total = 0;
    this.iva = 0;
    this.shipping = 0;
    //Totals in cart
    if(this.list_prod_cart.length > 0){
      await this.list_prod_cart.map(item => {
        item.iva = new_iva ? new_iva : item.iva;
        item.price = (item.price_without_iva * ( 1 + (new_iva ? new_iva : item.iva)/100 ));
        this.total_products += item.selected_qty;
        this.subtotal += item.price_without_iva * item.selected_qty;
        this.iva += item.selected_qty * (item.price_without_iva * ( (new_iva ? new_iva : item.iva)/100 ));
        this.shipping += item.shipping_cost;
      });
      this.total = this.subtotal + this.iva + this.shipping;
    }
  
    const group = Object.values(this.list_prod_cart.reduce((item, {provider, id_provider, model, name, image_url, selected, id_product_warehouse, selected_qty,shipping_cost, id_warehouse, stock, price,price_without_iva ,state }) => {
  
      //Every provider
      item[id_provider] = item[id_provider] || { provider, id_provider, items: [], total_qty_provider: 0, subtotal: 0, iva_provider: 0, shipping_cost: 0, total: 0 }
  
      //Setting Calculations
      item[id_provider].total_qty_provider = item[id_provider].total_qty_provider + selected_qty;
      item[id_provider].subtotal = item[id_provider].subtotal + (selected_qty * price_without_iva);
      item[id_provider].iva_provider = item[id_provider].iva_provider + (selected_qty * (price - price_without_iva));
      item[id_provider].shipping_cost = item[id_provider].shipping_cost + shipping_cost;
      item[id_provider].total = item[id_provider].subtotal + item[id_provider].iva_provider + item[id_provider].shipping_cost;
  
      //Items
      item[id_provider].items.push({
        provider,
        model: model,
        name,
        image_url: image_url,
        selected: selected,
        id_product_warehouse: id_product_warehouse,
        selected_qty: selected_qty,
        id_warehouse,
        stock,
        price,
        price_without_iva,
        state,
        shipping_cost
      });
      return item;
    },{}));
    
    this.list_group_cart = group;
    this.is_loading = false;
  } */

}



