import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { CartService } from "src/app/shared/_api/cart.service";
import { ProductService } from "src/app/shared/_api/product.service";
import { AuthService } from "src/app/shared/_services/auth.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup;
  timeout_input_qty;

  arr_cart: any = [];
  arr_products: any = [];
  constructor(
    public APICart: CartService,
    private APIProduct: ProductService,
    private router: Router,
    public auth_service: AuthService,
    public form_builder: FormBuilder
  ) {
    this.form = this.form_builder.group({
      qty: [""],
    });
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.getCartUser();
    this.getProducts("Laptops");
  }

  getCartUser() {
    this.APICart.getListCart();
  }

  getProducts(type) {
    let obj = {
      attribute_json: "[]",
      type: type,
    };
    this.APIProduct.productsByAttributes(obj).subscribe((data) => {
      this.arr_products = data;
    });
  }

  goToDetail(product) {
    console.log(product);
    this.router.navigate(["/portal/detalle-producto"], {
      queryParams: {
        id_product: product.id_product,
      },
    });
  }

  addCart(prod) {
    const filter = {
      id_product: prod.id_product,
      id_user: this.auth_service.id_user,
      qty: 1,
    };
    this.APICart.addCart(filter).subscribe((data) => {
      this.getCartUser();
    });
  }

  deleteCart(product: any, index: number) {
    this.loading = true;
    let data = {
      id_product_warehouse: product.id_product_warehouse,
      id_cart_header: product.id_cart_header,
    };
    console.log(data);
    this.APICart.deleteCart(data).subscribe((res) => {
      this.getCartUser();
      this.loading = false;
    });
    /*     if(this.auth_service.token){
      let data = {
        id_product_warehouse: product.id_product_warehouse,
        id_cart_header: product.id_cart_header
      }
      this.APICart.deleteCart(data)
      .subscribe(res =>{
        this.getCartUser();
        this.loading = false;
      })
    }else{
      this.APICart.list_prod_cart.forEach((item, i) => {
        if(item.id_product_warehouse == id_product_warehouse){
          this.APICart.list_prod_cart.splice(i, 1)
          this.APICart.buildCartInfo();
          localStorage.setItem("local_list_prod_cart", JSON.stringify(this.APICart.list_prod_cart));
          this.loading = false;
          return
        }
      });
    } */
  }

  counter(i: number) {
    return new Array(i + 1);
  }

  updateQty(product) {
    this.loading = true;
    let data = {
      action: "update",
      id_user: this.auth_service.id_user,
      id_cart_header: this.APICart.id_cart_header,
      products: [product],
    };
    this.APICart.addCart(data).subscribe((res) => {
      setTimeout(() => {
        this.getCartUser();
        this.loading = false;
      }, 100);
    });
  }

  InputUpdateQty(product, selected_qty: any) {
    selected_qty = Number(selected_qty);
    console.log(product, selected_qty);
    this.APICart.list_prod_cart.map((item) => {
      if (item.id_product_warehouse == product.id_product_warehouse) {
        if (selected_qty > product.stock) {
          item.selected_qty = product.stock;
          product.selected_qty = product.stock;
          return;
        }
        this.loading = true;
        if (selected_qty && selected_qty > 0) {
          if (!selected_qty || selected_qty < 1) {
            selected_qty = 1;
          }
          if (selected_qty >= item.stock) {
            selected_qty = item.stock;
          }
          item.selected_qty = selected_qty;
          product.selected_qty = selected_qty;
        }
        clearTimeout(this.timeout_input_qty);
        this.timeout_input_qty = setTimeout(() => {
          if (item.selected_qty == null || item.selected_qty < 1) {
            item.selected_qty = 1;
          }
          if (item.selected_qty >= item.stock) {
            item.selected_qty = item.stock;
          }
          this.updateQty(product);
        }, 800);
      }
    });
  }
}
