import { map } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode from "jwt-decode";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {  

  API = environment.api_url;
  user_info:UserInfoI;
  token = null;
  id_user: number;
  id_user_type: number;
  id_user_status: number;
  email: string;
  name: string;
  go_to_list_orders: boolean = false;

  constructor(
    private http: HttpClient,
    /* private cart_service: CartService */
    ) {
      if(localStorage.getItem('session')){
        this.token = localStorage.getItem("session");
        this.user_info = jwt_decode(this.token)
        this.id_user = this.user_info.id_user;
        this.id_user_type = this.user_info.id_user_type;
        this.name = this.user_info.name;
      }else{
        if(localStorage.getItem('local_list_prod_cart')){
/*           this.cart_service.list_prod_cart = JSON.parse(localStorage.getItem('local_list_prod_cart'));
          this.cart_service.calculateTotal(); */
        }
      }
  }

  login(filter:object): Observable<any> {
    const response: Observable<any[]> = 
    this.http.post<any[]>(this.API + "users/userLogin/" , filter);
    return response;
  }

  register(filter:object): Observable<any> {
    return this.http.post<any>(this.API + "client/create_update", filter);
  }

  verifyAccount(code:string){
    return this.http.post<any>(this.API + "client/confirmation", {code});
  }

  logout() {
    localStorage.clear();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.reload();
  }

}

interface UserInfoI{
  email: string
  id_user: number
  id_user_status: number
  id_user_type: number
  name: string
  id_cart_header: number
}
