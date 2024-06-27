import { fromEvent, Subscription } from "rxjs";
import { Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "src/app/shared/_services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CartService } from "src/app/shared/_api/cart.service";
import { ProductService } from "src/app/shared/_api/product.service";
import { pluck, debounceTime, distinctUntilChanged } from "rxjs/operators";
import { getLocaleFirstDayOfWeek } from "@angular/common";

@Component({
  selector: "app-menu-navigation",
  templateUrl: "./menu-navigation.component.html",
  styleUrls: ["./menu-navigation.component.css"],
})
export class MenuNavigationComponent implements OnInit {
  @ViewChild("criteria", { static: true }) search_input: ElementRef;
  category_menu = false;
  is_open_flayout_menu = false;
  search_active = true;
  arr_cart: any = [];
  arr_types: any = [];
  arr_search: any = [];
  arr_categories: any;
  criteria: string = "";
  selected_category_types = [];
  selected_category: number = 0;
  selected_type: number = 0;

  @HostListener("window:resize", ["$event"])
  onResize() {
    if (window.innerWidth >= 920) this.is_open_flayout_menu = false;
  }

  constructor(
    public auth_service: AuthService,
    private router: Router,
    public APICart: CartService,
    public APIproducts: ProductService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this.APIproducts.filter_products.criteria = params["filter"];
    });
  }

  ngOnInit() {
    this.activeProductTypes();
    this.getCategoriesTypes();
    this.getCartUser();
  }

  ngOnDestroy() {}

  searchProducts(criteria) {
    localStorage.removeItem("scroll");
    let obj = {
      criteria,
    };
    this.APIproducts.searchProduct(obj).subscribe((res) => {
      if (!this.APIproducts.loading_products) {
        this.arr_search = res.data.products;
      }
    });
  }

  async changeSearch(event) {
    this.arr_search = [];
    await this.APIproducts.resetQueryParams({ filter: event, page: 1 });
    this.arr_search = [];
  }

  async goToProductsPage(params = {}) {
    this.APIproducts.addQueryParams(params);
  }

  selectCategory(type: string) {
    localStorage.removeItem("scroll");
    window.scroll(0, 0);
    this.APIproducts.resetQueryParams({ "Tipo de producto": type, page: 1 });
  }

  activeProductTypes() {
    this.APIproducts.activeProductTypes().subscribe((data) => {
      this.arr_types = data;
    });
  }

  clearSearch() {
    this.criteria = "";
    this.arr_search = [];
  }

  getCartUser() {
    this.APICart.getListCart();
  }

  logout() {
    this.auth_service.logout();
  }

  goToOrders() {
    if (this.auth_service.token) {
      this.router.navigate(["/portal/account/orders"]);
    } else {
      this.router.navigate(["/portal/order"]);
    }
  }

  openCategoryMenu() {
    this.category_menu = !this.category_menu;
  }

  closeCategoryMenu() {
    this.category_menu = false;
  }

  getCategoriesTypes() {
    this.APIproducts.getCategoriesTypes().subscribe((data: any) => {
      this.arr_categories = data.grouped_categories;
    });
  }

  selectCategoryTypes(arr) {
    if (arr) {
      this.selected_category = arr[0].id_category;
      this.selected_category_types = arr;
    }
  }

  selectType(id_type) {
    if (id_type) {
      this.selected_type = id_type;
    }
  }
}
