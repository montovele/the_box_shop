import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProductService } from "src/app/shared/_api/product.service";
import { AuthService } from "src/app/shared/_services/auth.service";
import { SystemService } from "../../shared/_api/system.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  loading_viewed: boolean = false;
  arr_mostviewed: any = [];
  arr_newlyadded: any = [];
  arr_homeoffice: any = [];
  arr_featured: any = [];
  banner_slides: any = [];

  constructor(
    private router: Router,
    private APIproducts: ProductService,
    public auth_service: AuthService,
    public system_service: SystemService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
    this.mostViewed();
    this.newlyAdded();
    this.productsFeatured();
    this.homeOffice();
    this.getImagesBanner();
  }

  mostViewed() {
    this.loading_viewed = true;
    this.APIproducts.mostViewed().subscribe((data) => {
      this.arr_mostviewed = data;
      this.loading_viewed = false;
    });
  }

  newlyAdded() {
    this.loading_viewed = true;
    this.APIproducts.newlyAdded().subscribe((data) => {
      this.arr_newlyadded = data;
      this.loading_viewed = false;
    });
  }

  productsFeatured() {
    this.loading_viewed = true;
    this.APIproducts.productsFeatured().subscribe((data) => {
      this.arr_featured = data;
      this.loading_viewed = false;
    });
  }

  homeOffice() {
    let obj = {
      attribute_json: "[]",
      type: "Computadoras",
    };
    this.APIproducts.productsByAttributes(obj).subscribe((res) => {
      this.arr_homeoffice = res;
    });
  }

  goToDetail(product) {
    this.router.navigate(["/portal/detalle-producto"], {
      queryParams: {
        id_product: product.id_product,
      },
    });
  }

  getImagesBanner() {
    this.system_service.getImagesBanner().subscribe((res) => {
      this.banner_slides = res;
    });
  }
}
