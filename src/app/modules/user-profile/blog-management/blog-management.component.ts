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
constructor(private userService:UserProfileService,private blogService:WriteBlogService,private router:Router){
  
}
  usersData:any;
  blogData:any;
  page =1;
  totalPages: number=5;
  toggleValue:boolean=false;
  ngOnInit(): void {
    this.userService.getAllProfiles(this.page).subscribe((res:any)=>{
      this.usersData=res?.data
      
    })
  }

  /*Pagination Starts*/
  AllUsers(page:number){
    this.userService.getAllProfiles(page).subscribe((res:any)=>{
      this.usersData=res?.data
  })}

  onPreviousClick() {
   
    this.page--;
      this.AllUsers(this.page)
    
  }

  onNextClick() {
    this.page++;
      this.AllUsers(this.page)
    
  }
/*Pagination Ends*/


  toggleRow(id:any) {

    console.log(id)
    this.blogService.getBlogByUserId(id).subscribe((res:any)=>{
      this.blogData=res?.data;
    })
    this.toggleValue=true;
  }

  blockUser(id:string,type:number){
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteBlockUser(id,type).subscribe(res=>console.log(res))
        swal.fire(
          'Blocked!',
          'User has been blocked.',
          'success'
        )
      }
    }).then(()=>this.AllUsers(this.page))
   
  }
  blockBlog(id:string,type:number){
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, !'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id);
        this.blogService.deleteBlockBlog(id,type).subscribe(res=>console.log(res))
        swal.fire(
          'Blocked!',
          'Blog has been blocked.',
          'success'
        )
      }
   ;
  }).then(()=>this.toggleValue=false)
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
  deleteUser(){
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        swal.fire(
          'Deleted!',
          'User has been deleted.',
          'success'
        )
      }
    })
  }

}
