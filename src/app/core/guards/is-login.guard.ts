import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../services/auth.service';
import { PATHS } from 'src/app/common/constants';

@Injectable({
  providedIn: 'root'
})
export class IsLoginGuard implements CanActivate {
  constructor(private service:AuthenticateService,private router:Router){}
canActivate(){
  if(localStorage.getItem('token')){
    this.router.navigate([PATHS.MAIN.DASHBOARD]); 
    return false;
  } 
  else {
    return true;
  }
}
  
}
