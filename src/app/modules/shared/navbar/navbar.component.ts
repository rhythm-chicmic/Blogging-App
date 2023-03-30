import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { PATHS, STORAGE_KEYS } from 'src/app/common/constants';
import { AuthenticateService } from 'src/app/core/services/auth.service';
import { UserProfileService } from 'src/app/core/services/user-profile.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{
  id:string='';

  isLogged:boolean=false;
  constructor(private route:Router, private AuthService:AuthenticateService,private userService:UserProfileService){
    if(localStorage.getItem(STORAGE_KEYS.TOKEN)){
      this.isLogged=true;
    }

  }
 
  

  
  signIn(){
    this.route.navigate([PATHS.AUTH.LOGIN]);
  }
  signUp(){
    
    this.route.navigate([PATHS.AUTH.REGISTER]);
  }
  write(){
    this.route.navigate([PATHS.MAIN.BLOG_WRITE]);
    
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
      localStorage.clear()
      this.route.navigate([PATHS.MAIN.DASHBOARD]);
    })
  }

}
