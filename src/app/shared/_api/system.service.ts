import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SystemService {
  api = environment.api_url;

  constructor(private http: HttpClient) {}

  getStates(): Observable<any> {
    return this.http.get(`${this.api}system/get_states`);
  }

  getImagesBanner(): Observable<any> {
    return this.http.get(`${this.api}system/get_banner_images`);
  }

  verifyToken(token): Observable<any> {
    return this.http.get(`${this.api}system/validate_token/${token}`);
  }
}
