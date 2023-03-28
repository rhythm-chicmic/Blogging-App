import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PATHS } from 'src/app/common/constants';
import { AuthenticateService } from 'src/app/core/services/auth.service';
import { STORAGE_KEYS } from 'src/app/common/constants';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private route:Router, private AuthService:AuthenticateService){}
  signIn(){
    this.route.navigate([PATHS.AUTH.LOGIN]);
  }
  signUp(){
    
    this.route.navigate([PATHS.AUTH.REGISTER]);
  }
  write(){
    if(localStorage.getItem(STORAGE_KEYS.TOKEN)){
    this.route.navigate([PATHS.MAIN.BLOG_WRITE]);
    }
    else{
      this.route.navigate([PATHS.AUTH.LOGIN])
    }
  }
  bloggerClick(){
    this.route.navigate([PATHS.MAIN.DASHBOARD])
  }
  ViewProfile(){
    this.route.navigate([PATHS.USER_PROFILE.USER_PAGE])
  }
  SignOut(){
    this.AuthService.logOut().subscribe((res)=>{
      console.log(res);
      this.route.navigate([PATHS.MAIN.DASHBOARD]);
    })
  }

}
