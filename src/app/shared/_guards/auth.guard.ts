import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate(): boolean {
    console.log('hola')
    if (localStorage.getItem('session')) {
      return true;
    } else {
      this.router.navigateByUrl('/auth');
      return false;
    }
  }
  
}
