import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATHS, STORAGE_KEYS } from 'src/app/common/constants';
import { AuthenticateService } from 'src/app/core/services/auth.service';
import { WriteBlogService } from 'src/app/core/services/write-blog.service';
import swal from 'sweetalert2'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  id:string='';
  Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', swal?.stopTimer)
      toast.addEventListener('mouseleave', swal?.resumeTimer)
    }
  })
  isLogged:boolean=false;
  constructor(private route:Router, private AuthService:AuthenticateService,private blogService:WriteBlogService){
    if(localStorage.getItem(STORAGE_KEYS.TOKEN)){
      this.isLogged=true;
    }

  }
 ngOnInit(){
  this.AuthService?.isLoggedin$.subscribe((res)=>{
    this.isLogged=res;
  })
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
      this.Toast?.fire({
        icon: 'success',
        title: 'LogOut successfully'
      })
      this.route.navigate([PATHS.MAIN.DASHBOARD]);
    })
  }

}
