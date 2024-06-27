import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlreadyLoggedInGuard implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate() : boolean {
    return true;
    // if (localStorage.getItem('session')) {
    //   return true;
    // } else {
    //   this.router.navigateByUrl('/home');
    //   return false;
    // }
  }
  
}
