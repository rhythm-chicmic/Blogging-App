import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { WriteBlogService } from 'src/app/core/services/write-blog.service';
import { PATHS } from 'src/app/common/constants';
import { Router } from '@angular/router';


@Component({
  selector: 'app-blog-management',
  templateUrl: './blog-management.component.html',
  styleUrls: ['./blog-management.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BlogManagementComponent implements OnInit {
constructor(private userService:UserProfileService,private blogService:WriteBlogService,private router:Router){}
  usersData:any;
  blogData:any;
  toggleValue:boolean=false;
  ngOnInit(): void {
    this.userService.getAllProfiles().subscribe((res:any)=>{
      console.log(res.data)
      this.usersData=res.data
    })
  }
  toggleRow(id:any) {
    
    console.log(id)
    this.blogService.getBlogByUserId(id).subscribe((res:any)=>{
      console.log(res)
      this.blogData=res.data;
    })
    this.toggleValue=true;
  }

  blockUser(){
    console.log("Blocked User")
  }




  editBlog(id:string){
    let blogData;
     this.blogData.find((res:any)=>{
      console.log(res.blog.blogId)
      if(res.blog.blogId===id){
        blogData= res;
    this.router.navigateByUrl(PATHS.MAIN.BLOG_WRITE,{state:{data:blogData}})

      }
     })
    
  }
  deleteBlog(id:string){
    this.blogService.deleteBlog(id).subscribe();
    this.blogService.getUserBlogs().subscribe((res:any)=>{
      this.blogData=res.data;
      console.log(res.data)
    })
  }
  
}
