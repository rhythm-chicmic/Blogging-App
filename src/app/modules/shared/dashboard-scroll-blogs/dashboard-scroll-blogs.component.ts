import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { WriteBlogService } from 'src/app/core/services/write-blog.service';
@Component({
  selector: 'app-dashboard-scroll-blogs',
  templateUrl: './dashboard-scroll-blogs.component.html',
  styleUrls: ['./dashboard-scroll-blogs.component.scss']
})
export class DashboardScrollBlogsComponent {
  blogPost:any=[]
  env:string = environment.BASE_URL +'/'
  demo_img:string = "https://material.angular.io/assets/img/examples/shiba2.jpg"
  constructor(private blogService:WriteBlogService){
    this.blogService.getBlog().subscribe((res:any)=>{
      console.log(res.data)
      this.blogPost = res?.data
    })
    

  }





}
