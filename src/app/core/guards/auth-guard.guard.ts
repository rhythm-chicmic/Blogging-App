import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../services/auth.service';
import { PATHS } from 'src/app/common/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private service:AuthenticateService,private router:Router){}
  canActivate(){
    if(localStorage.getItem('token')){
      return true;
    } 
    else {
      this.router?.navigate([PATHS.AUTH.LOGIN]); 
      return false;
    }
  }
  
}
