import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "../_services/auth.service";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  api = environment.api_url;

  constructor(private http: HttpClient, public auth_service: AuthService) {}

  filter_quote = {
    id_user:
      this.auth_service.user_info && this.auth_service.user_info.id_user ? this.auth_service.user_info.id_user : "",
    page: 1,
    limit: 15,
    criteria: "",
  };

  createOrder(data): Observable<any> {
    return this.http.post(`${this.api}order/create`, data);
  }

  getOrdersByUser(data): Observable<any> {
    return this.http.post(`${this.api}order/get_by_user`, data);
  }

  getOrderDetail(data): Observable<any> {
    return this.http.post(`${this.api}order/get_detail`, data);
  }

  searchOrder(data): Observable<any> {
    return this.http.post(`${this.api}order/search_order`, data);
  }

  getAllQuotes(): Observable<any> {
    return this.http.post(`${this.api}order/quote/get_by_user`, this.filter_quote);
  }

  getQuoteDetail(id_quote): Observable<any> {
    return this.http.get(`${this.api}order/quote_detail/get/${id_quote}`);
  }

  createTransaction(data): Observable<any> {
    return this.http.post(`${this.api}order/create_transaction`, data);
  }

  approveOrder(data): Observable<any> {
    return this.http.post(`${this.api}order/approve_order`, data);
  }
}
