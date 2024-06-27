import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  token:string = "";

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(isPlatformBrowser(this.platformId)){
      this.token = window.localStorage.getItem('session');
    }
  
      let request = req;
      let no_header_custom = req.url.includes( `https://live.icecat.biz/api`)
      request = req.clone({
        setHeaders: {
          authorization: `${ this.token }`,
        }
      });
      if(no_header_custom){
        request = req.clone({
          setHeaders: {
            authorization: `${ this.token }`,
          }
        });
      }else{
        request = req.clone({
          setHeaders: {
            authorization: `${ this.token }`,
            app: '674383'
          }
        });
      }
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
        if(error.status == 401){
          
        }
        return throwError( error );
      })
      );
  }
}
