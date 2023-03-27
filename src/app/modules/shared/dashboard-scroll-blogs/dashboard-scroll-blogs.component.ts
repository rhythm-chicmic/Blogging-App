import { Component } from '@angular/core';
import { toHTML } from 'ngx-editor';
import { WriteBlogService } from 'src/app/core/services/write-blog.service';
@Component({
  selector: 'app-dashboard-scroll-blogs',
  templateUrl: './dashboard-scroll-blogs.component.html',
  styleUrls: ['./dashboard-scroll-blogs.component.scss']
})
export class DashboardScrollBlogsComponent {
  blogPost:any=[]

  constructor(private blogService:WriteBlogService){
    this.blogService.getBlog().subscribe((res:any)=>{
      console.log(res.data)
      this.blogPost = res?.data
    })
    

  }





}
