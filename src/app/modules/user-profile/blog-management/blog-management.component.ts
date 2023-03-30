import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { WriteBlogService } from 'src/app/core/services/write-blog.service';
import { PATHS } from 'src/app/common/constants';
import { Router } from '@angular/router';
import swal from 'sweetalert2'


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
      this.usersData=res?.data
    })
  }
  toggleRow(id:any) {

    console.log(id)
    this.blogService.getBlogByUserId(id).subscribe((res:any)=>{
      this.blogData=res?.data;
    })
    this.toggleValue=true;
  }

  blockUser(){
    swal.fire(
      'Good job!',
      'User Blocked',
      'warning'
    )
    console.log("Blocked User")
  }
  deleteUser(){
    console.log("Deleted User")
  }

  editBlog(id:string){
    let blogData;
     this.blogData.find((res:any)=>{
      if(res?.blog?.blogId===id){
        blogData= res;
    this.router.navigateByUrl(PATHS.MAIN.BLOG_WRITE,{state:{data:blogData}})

      }
     })

  }
  deleteBlog(id:string){
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result?.isConfirmed) {
        this.blogService.deleteBlog(id).subscribe();
        this.getAllBlogs();
        swal.fire(
          'Deleted!',
          'Your Blog has been deleted.',
          'success'
        )
      }
    })

  }
  getAllBlogs(){
    this.blogService?.getUserBlogs().subscribe((res:any)=>{
      this.blogData=res?.data;
    })
  }

}
