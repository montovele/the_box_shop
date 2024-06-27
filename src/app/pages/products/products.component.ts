import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "src/app/shared/_api/product.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  @ViewChild("products", { static: false }) public products: ElementRef;
  params_subscribe: Subscription;
  private popstateListener: () => void;
  constructor(public APIProduct: ProductService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.popstateListener = () => {
      localStorage.removeItem("scroll");
    };
    window.addEventListener("popstate", this.popstateListener);
    this.APIProduct.filter_products.page = this.route.snapshot.queryParams["page"]
      ? Number(this.route.snapshot.queryParams["page"])
      : 1;
    this.getProducts();
    this.params_subscribe = this.route.queryParams.subscribe((params) => {
      this.APIProduct.filter_products.page = this.route.snapshot.queryParams["page"]
        ? Number(this.route.snapshot.queryParams["page"])
        : 1;
      this.APIProduct.getProducts();
    });
  }

  ngOnDestroy() {
    this.APIProduct.filter_products.criteria = null;
    const pos = window.pageYOffset;
    localStorage.setItem("scroll", pos.toString());
    this.params_subscribe.unsubscribe();
    window.removeEventListener("popstate", this.popstateListener);
  }

  ngAfterViewInit() {
    this.APIProduct.products_container = this.products;
  }

  getProducts() {
    window.scroll(0, 0);
    this.APIProduct.addQueryParams({ page: this.APIProduct.filter_products.page });
  }

  openGroup(attribute) {
    attribute.opened = !attribute.opened;
  }

  selectedAttribute(check, attribute) {
    this.APIProduct.filter_products.page = 1;
    localStorage.removeItem("scroll");
    window.scrollTo(0, 0);
    this.APIProduct.attributes = [];
    this.APIProduct.addQueryParams({
      [`${attribute.attribute}`]: check.checked ? attribute.value : null,
      page: this.APIProduct.filter_products.page,
    });
  }

  // Navigation
  goToDetail(product) {
    this.router.navigate(["/portal/detalle-producto"], {
      queryParams: {
        id_product: product.id_product,
      },
    });
  }

  changePage() {
    localStorage.removeItem("scroll");
    this.getProducts();
  }

  get arr_products() {
    return this.APIProduct.arr_products;
  }
  get attributes() {
    return this.APIProduct.attributes;
  }
}
