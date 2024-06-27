import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  

  // API = 'https://api.rushstarwireless.com/web_api_crm';
  // API = "http://localhost:57388/";
  // API = 'https://api.rushstarwireless.com/web_test';
  API = environment.api_url



  constructor(
    private http: HttpClient
  ) { }

  reqGet(url: string) {
    return this.http.get<any>(this.API + url)
          .pipe(
            map(
              data => {
                return data;
              },
              error => {
                return error;
              }
            )
          );
  }

  reqPost(url: string, data: any) {
    return this.http.post<any>(this.API + url, data)
          .pipe(
            map(
              data => {
                return data;
              },
              error => {
                return error;
              }
            )
          );
  }

}
