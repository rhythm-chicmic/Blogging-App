import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { WriteBlogService } from 'src/app/core/services/write-blog.service';
import { PATHS, STORAGE_KEYS } from 'src/app/common/constants';
import { Router } from '@angular/router';
import { UserProfileService } from 'src/app/core/services/user-profile.service';
@Component({
  selector: 'app-dashboard-scroll-blogs',
  templateUrl: './dashboard-scroll-blogs.component.html',
  styleUrls: ['./dashboard-scroll-blogs.component.scss']
})
export class DashboardScrollBlogsComponent {
  blogPost:any=[]
  env:string = environment.BASE_URL +'/'
  demo_img:string = "https://material.angular.io/assets/img/examples/shiba2.jpg"
  constructor(private blogService:WriteBlogService,private router:Router,private userProfileService:UserProfileService){
    this.blogService.getBlog().subscribe((res:any)=>{
      console.log(res.data)
      this.blogPost = res?.data
    })
  }
  viewUser(id:string){
    this.router.navigate([PATHS.USER_PROFILE.GENERAL_PAGE+`/${id}`])
    
  }

  liked(){
    if(localStorage.getItem(STORAGE_KEYS.TOKEN)){

    }
    else{
      this.router.navigate([PATHS.AUTH.LOGIN]);
    }
  }

  disliked(){
    if(localStorage.getItem(STORAGE_KEYS.TOKEN)){

    }
    else{
      this.router.navigate([PATHS.AUTH.LOGIN]);
    }
  }


}
