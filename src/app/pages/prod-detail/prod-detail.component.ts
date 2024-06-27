import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { CartService } from "src/app/shared/_api/cart.service";
import { ProductService } from "src/app/shared/_api/product.service";
import { AuthService } from "src/app/shared/_services/auth.service";

@Component({
  selector: "app-prod-detail",
  templateUrl: "./prod-detail.component.html",
  styleUrls: ["./prod-detail.component.scss"],
})
export class ProdDetailComponent implements OnInit {
  params = {
    modelo: "",
    marca: "",
    part_num: "",
    tipo: "",
    id_product: null,
  };

  prod_detail: any = {};
  loading = false;
  nothing_selected = false;
  loading_adding = false;
  cart_added = false;
  arr_related = [];
  arr_distributors = [];
  arr_attributes = [];
  arr_icecat: any = null;

  constructor(
    private APIProduct: ProductService,
    public auth_service: AuthService,
    private APICart: CartService,
    private route: ActivatedRoute,
    private router: Router,
    public sanitizer: DomSanitizer
  ) {
    this.route.queryParams.subscribe((params) => {
      this.params.modelo = params.modelo;
      this.params.tipo = params.tipo;
      this.params.marca = params.marca;
      this.params.part_num = params.part_num;
      this.params.id_product = params.id_product;
      this.getProductDetail(params.id_product);
      this.getProductDistributor(params.id_product);
      this.getProductAttributes(params.id_product);
      this.insertViewProduct(params.id_product)
    });
  }

  ngOnInit() {
    window.scroll(0, 0);
  }

  getProductDetail(id_product) {
    let data = {
      id_product,
    };

    this.APIProduct.productByModel(data).subscribe((res: any) => {
      if (res.data) {
        this.prod_detail = res.data;
        this.getIcecatDetail();
      }
    });
  }

  addCart() {
    this.nothing_selected = false;
    this.loading_adding = true;
    let products = this.addedProducts();
    if (products.length == 0) {
      this.nothing_selected = true;
      this.loading_adding = false;
      return;
    }

    let obj = {
      id_user: this.auth_service.id_user,
      id_cart_header: this.APICart.id_cart_header,
      action: "add",
      products: products,
    };
    this.APICart.addCart(obj).subscribe((data) => {
      if (data) {
        if (!this.auth_service.token) {
          localStorage.setItem("id_cart_header", data.id_cart_header);
        }
        this.addedToCartTimeout();
      }
    });
  }

  getCartUser() {
    this.APICart.getListCart();
  }
  addedProducts() {
    let temp = [];
    this.arr_distributors.map((x) => {
      for (let item of x.items) {
        if (item.selected_qty > 0) {
          temp.push(item);
        }
      }
    });
    console.log("temp", temp);
    return temp;
  }

  // productRelated(type){
  //   console.log('Rel type',type);
  //   let obj = {
  //     attribute_json: '[]',
  //     type: type
  //   }
  //   console.log('obj', obj);
  //   this.APIProduct.productsByAttributes(obj).subscribe(data => {
  //     console.log('rel',data);
  //     this.arr_related = data;
  //   });
  // }

  getProductDistributor(id_product) {
    this.loading = true;
    let filter = {
      id_product: id_product,
    };
    this.APIProduct.productDistributors(filter).subscribe((res) => {
      this.arr_distributors = res.grouped_detail;
      this.loading = false;
    });
  }

  getProductAttributes(id_product) {
    this.loading = true;
    let filter = {
      id_product,
    };
    this.APIProduct.productAttributes(filter).subscribe((res) => {
      this.arr_attributes = res;
      this.loading = false;
    });
  }

  changeDistQuantity(x, y, event) {
    console.log(x, y, event);
    this.nothing_selected = false;
    this.arr_distributors[x].items[y].selected_qty = Number(event);
  }

  counter(i: number) {
    return new Array(i + 1);
  }

  addedToCartTimeout() {
    this.cart_added = true;
    this.loading_adding = false;
    this.getProductDistributor(this.params.id_product);
    this.getCartUser();
    setTimeout(() => {
      this.cart_added = false;
    }, 1200);
  }

  goToDetail(modelo: string) {
    this.router.navigate(["/portal/detalle-producto"], {
      queryParams: {
        marca: this.params.marca,
        tipo: this.params.tipo,
        modelo: this.params.modelo,
        part_num: this.params.part_num,
      },
    });
  }

  getSpefication(model) {
    let filter = {
      model: model,
    };
    this.APIProduct.productByModel(filter).subscribe((res: any) => {
      this.prod_detail = res.data;
    });
  }

  getIcecatDetail() {
    let filter = {
      part_num: this.prod_detail.part_num,
      brand: this.prod_detail.brand,
      model: this.prod_detail.model,
      upc: this.prod_detail.upc,
      ean:this.prod_detail.ean,
      internal_upc:this.prod_detail.internal_upc,
      internal_part_num:this.prod_detail.internal_part_num,
    };
    this.APIProduct.getIcecatDetail(filter).subscribe((res: any) => {
      if (res.data) {
        this.arr_icecat = res.data;
        this.saveDetailIcecat()
      }
    }),
      (error) => {
        console.log(error);
      };
  }

  saveDetailIcecat(){
    let data = {
      description_2: null,
      images: [],
      id_product: this.prod_detail.id_product
    }
    if(this.prod_detail.images.length == 1){
      for (const item of this.arr_icecat.Gallery) {
        if(item[`Pic500x500`]){
          data.images.push(item[`Pic500x500`])
          this.prod_detail.images.push({image_url: item[`Pic500x500`]})
        }else if(item[`Pic`]){
          data.images.push(item[`Pic`])
          this.prod_detail.images.push({image_url: item[`Pic`]})
        }
      }
    }
    if(!this.prod_detail.description_2){
      data.description_2 = this.arr_icecat.GeneralInfo.Description.LongDesc;
      this.prod_detail.description_2 = this.arr_icecat.GeneralInfo.Description.LongDesc;
    }

    if(data.description_2 || data.images.length > 0){
      this.APIProduct.saveDetailIcecat(data).subscribe(res =>{

      })
    }
  }

  insertViewProduct(id_product){
    let data ={
      id_product
    }
    this.APIProduct.insertViewProduct(data).subscribe(res =>{
      console.log(res)
    })
  }
}
