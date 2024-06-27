import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, userFilter } from '../_models/users/users.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API:string;
  constructor(private http: HttpClient) {
    this.API = environment.api_url;
  }


  getClientDetail(): Observable<any>{
    const response: Observable<any> = 
    this.http.post<any>(this.API + "client/detail", {});
    return response;
  }

  updateUser(filter:object): Observable<any> {
    const response: Observable<any> = 
    this.http.post<any>(this.API + "client/update", filter);
    return response;
  }

  createAddress(filter:object): Observable<any> {
    return this.http.post<boolean>(this.API + "users/create_update_address", filter);
  }

  editAddress(filter:object): Observable<boolean> {
    const response: Observable<boolean> = 
    this.http.post<boolean>(this.API + "users/editAddress", filter);
    return response;
  }

  addressByUser(id_user:number){
    return this.http.get<any>(this.API + "users/addressByUser/" + id_user).toPromise();
  }

  deleteAddress(id_address:number): Observable<any> {
    const response: Observable<any> = 
    this.http.get<any>(this.API + "users/deleteAddress/" + id_address);
    return response;
  }

  updateDefaultAddress(data):Observable<any>{
    return this.http.post(this.API + "users/update_default_address",data)
  }

  restorePassword(data):Observable<any>{
    return this.http.post(this.API + "users/restore_password",data)
  }

  updatePassword(data):Observable<any>{
    return this.http.post(this.API + "users/update_password",data)
  }

}

