import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { PATHS } from 'src/app/common/constants';
import { WriteBlogService } from 'src/app/core/services/write-blog.service';
import swal from 'sweetalert2'


@Component({
  selector: 'app-user-blogs',
  templateUrl: './user-blogs.component.html',
  styleUrls: ['./user-blogs.component.scss']
})
export class UserBlogsComponent {
  allBlogs:any=[];

  constructor(private blogService:WriteBlogService,private router:Router){}

  ngOnInit(){
    this.blogService.getUserBlogs().subscribe((res:any)=>{
      this.allBlogs=res?.data;

    })
  }
  edit(id:string){
    let blogData;
     this.allBlogs.find((res:any)=>{

      if(res?.blog?.blogId===id){
        blogData= res;
    this.router.navigateByUrl(PATHS.MAIN?.BLOG_WRITE,{state:{data:blogData}})

      }
     })

  }
  delete(id:string){
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
        this.blogService?.deleteBlog(id).subscribe();
        this.blogService?.getUserBlogs().subscribe((res:any)=>{
          this.allBlogs=res.data;
        })
        swal.fire(
          'Deleted!',
          'Your Blog has been deleted.',
          'success'
        )
      }
    })


  }
}
