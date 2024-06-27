import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  url: string;
  attributes;
  selected_attributes = [];
  arr_products = [];
  is_loading: boolean = false;
  loading_products: boolean = false;
  total_results: Number = 0;
  products_container: ElementRef;

  filter_products = {
    criteria: "",
    selected_attributes: null,
    page: 1,
    limit: 100,
  };

  constructor(private httpClient: HttpClient, public router: Router, public route: ActivatedRoute) {
    this.url = environment.api_url;
    this.buildJsonParamters();
  }
  //Products
  allProducts(filter: object): Observable<any> {
    const response: Observable<any[]> = this.httpClient.post<any[]>(this.url + "products/all", filter);
    return response;
  }

  productsByAttributes(filter: object): Observable<any[]> {
    const response: Observable<any[]> = this.httpClient.post<any[]>(
      this.url + "products/getProductsAndAttributes",
      filter
    );
    return response;
  }
  productByModel(filter: object): Observable<any[]> {
    const response: Observable<any[]> = this.httpClient.post<any[]>(this.url + "products/productByModel", filter);
    return response;
  }
  activeProductTypes(): Observable<any[]> {
    const response: Observable<any[]> = this.httpClient.get<any[]>(this.url + "products/activeProductTypes/");
    return response;
  }
  mostViewed(): Observable<any[]> {
    const response: Observable<any[]> = this.httpClient.get<any[]>(this.url + "products/mostViewed/");
    return response;
  }
  newlyAdded(): Observable<any[]> {
    const response: Observable<any[]> = this.httpClient.get<any[]>(this.url + "products/newlyAdded/");
    return response;
  }
  productsFeatured(): Observable<any[]> {
    const response: Observable<any[]> = this.httpClient.get<any[]>(this.url + "products/productsFeatured/");
    return response;
  }
  searchProduct(filter: object): Observable<any> {
    const response: Observable<any[]> = this.httpClient.post<any[]>(this.url + "products/searchProduct", filter);
    return response;
  }

  //Atributes
  productAttributes(filters: object): Observable<any[]> {
    const response: Observable<any[]> = this.httpClient.post<any[]>(
      this.url + "products/getProductAttributes/",
      filters
    );
    return response;
  }

  productFilters(filters: object): Observable<any[]> {
    const response: Observable<any[]> = this.httpClient.post<any[]>(this.url + "products/productFilters", filters);
    return response;
  }

  //Types
  allTypes(): Observable<any[]> {
    const response: Observable<any[]> = this.httpClient.get<any[]>(this.url + "products/allTypes/");
    return response;
  }

  //Related
  productRelated(filters: object): Observable<any[]> {
    const response: Observable<any[]> = this.httpClient.post<any[]>(this.url + "products/productRelated", filters);
    return response;
  }

  //Dsitributors
  productDistributors(filter: object): Observable<any> {
    const response: Observable<any[]> = this.httpClient.post<any[]>(this.url + "products/productDistributors", filter);
    return response;
  }

  //Categories

  getCategoriesTypes(): Observable<any[]> {
    const response: Observable<any[]> = this.httpClient.get<any[]>(this.url + "products/getCategoriesTypes");
    return response;
  }

  //Categories
  getIcecatDetail(data): Observable<any> {
    const response: Observable<any[]> =
      this.httpClient.post<any[]>(`${this.url}products/get_icecat_detail`,data);
    return response;
  }

  saveDetailIcecat(data): Observable<any> {
    const response: Observable<any[]> =
      this.httpClient.post<any[]>(`${this.url}products/update_product_icecat`,data);
    return response;
  }

  insertViewProduct(data): Observable<any> {
    const response: Observable<any[]> =
      this.httpClient.post<any[]>(`${this.url}products/insert_view_product`,data);
    return response;
  }

  //search products
  /*     getProductFilters(type_json:any){
      let obj = {
        attribute_json: type_json ?  type_json.attribute_json: null, 
        type: type_json.type,
        arr_attributes: this.attributes
      }
      this.productFilters(obj).subscribe(data => {
        this.attributes = data;
      });
    } */

  getProducts() {
    this.is_loading = true;
    this.loading_products = true;
    this.buildJsonParamters();
    return new Promise((resolve, reject) => {
      this.searchProduct(this.filter_products).subscribe((res) => {
        this.arr_products = res.data.products;
        this.attributes = res.data.filters;
        this.total_results = res.data.total_results;
        this.is_loading = false;
        let scroll = localStorage.getItem("scroll");
        if (scroll) {
          setTimeout(() => {
            window.scrollTo(0, Number(scroll));
          }, 100);
        } else {
          window.scrollTo(0, 0);
        }
        setTimeout(() => {
          this.loading_products = false;
        }, 2000);
        resolve(true);
      });
    });
  }

  buildJsonParamters() {
    let query_params = this.route.snapshot.queryParams;
    this.filter_products.criteria = null;
    let temp = [];
    for (var key of Object.keys(query_params)) {
      if (key !== "filter" && key !== "page") {
        temp.push({ key: key, value: query_params[key] });
      }
      if (key == "filter") {
        this.filter_products.criteria = query_params[key];
      }
    }
    this.filter_products.selected_attributes = temp.length == 0 ? null : temp;
  }

  async addQueryParams(query_params) {
    const params = {
      ...this.route.snapshot.queryParams,
      ...query_params,
    };
    await this.router.navigate(["/portal/products"], {
      queryParams: {
        ...params,
      },
    });
  }

  async resetQueryParams(params) {
    await this.router.navigate(["/portal/products"], {
      queryParams: {
        ...params,
      },
    });
    this.filter_products.page = 1;
  }

  async deleteQueryParams(url) {
    await this.router.navigate([url], {
      queryParams: {},
    });
  }
}
