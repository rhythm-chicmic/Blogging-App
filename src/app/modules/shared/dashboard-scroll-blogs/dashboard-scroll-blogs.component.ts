import { Component, OnChanges } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { WriteBlogService } from 'src/app/core/services/write-blog.service';
import { PATHS, STORAGE_KEYS } from 'src/app/common/constants';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { SocketService } from 'src/app/core/services/socket.service';
import swal from 'sweetalert2'
@Component({
  selector: 'app-dashboard-scroll-blogs',
  templateUrl: './dashboard-scroll-blogs.component.html',
  styleUrls: ['./dashboard-scroll-blogs.component.scss']
})
export class DashboardScrollBlogsComponent{
  blogPost:any;
  userId=localStorage.getItem('userId')|| ''
  Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', swal.stopTimer)
      toast.addEventListener('mouseleave', swal.resumeTimer)
    }
  })
  private readonly searchSubject = new Subject<string | undefined>();
  env:string = environment.BASE_URL +'/'
  demo_img:string = "https://material.angular.io/assets/img/examples/shiba2.jpg"
  constructor(private blogService:WriteBlogService,private router:Router,private socketService:SocketService){
    this.blogService.getBlog().subscribe((res:any)=>{
      this.blogPost = res?.data
    })
  }
  viewUser(id:string){
    this.router.navigate([PATHS.USER_PROFILE.GENERAL_PAGE+`/${id}`])
    
  }


  likedandDisliked(blogId:string,value:number){
    
    let message:string=''
    let likeApi:any;
    let searchId:string=''
    if(localStorage.getItem(STORAGE_KEYS.TOKEN) && localStorage.getItem('userId')){
       this.userId=localStorage.getItem('userId')||''
      console.log(blogId,'----',this.userId,'-----',value);
      this.socketService?.likeAndDislike(blogId,this.userId,value).then((val:any)=>{
        console.log(val);
          searchId=val?.data?.blogId
          likeApi=val
        message=val?.message
        if(message!=='Success' && value===1){
          this.blogPost.find((value:any)=>{
            if(value.blog.blogId===searchId){
              value.blog.likes=val?.data?.likes
              value.blog.dislikes=val?.data?.dislikes
            }
          })
          this.Toast.fire({
            icon: 'warning',
            title: 'Like Removed'
          })
        }
        else if(value===1 && message==='Success'){
          this.blogPost.find((value:any)=>{
            if(value.blog.blogId===searchId){
              value.blog.likes=val?.data?.likes
              value.blog.dislikes=val?.data?.dislikes
            }
          })
          this.Toast.fire({
            icon: 'success',
            title: 'Blog Liked'
          })
        }
        else if(value===2 && message!=='Success'){
          this.blogPost.find((value:any)=>{
            if(value.blog.blogId===searchId){
              value.blog.likes=val?.data?.likes
              value.blog.dislikes=val?.data?.dislikes
            }
          })
          this.Toast.fire({
            icon: 'warning',
            title: 'Dislike Removed'
          })
        }
        else if (value===2 && message==='Success'){
          this.blogPost.find((value:any)=>{
            if(value.blog.blogId===searchId){
              value.blog.likes=val?.data?.likes
              value.blog.dislikes=val?.data?.dislikes
            }
          })
          this.Toast.fire({
            icon: 'success',
            title: 'Blog Disliked'
          })
        }
      });
    }
    else{
      this.router.navigate([PATHS.AUTH.LOGIN]);
    }
  }

  viewBlog(id:string){
    this.router.navigate([PATHS.MAIN.BLOG_DISPLAY+`/${id}`]);
  }
  Search(event:Event){
    const searchQuery= (event.target as HTMLInputElement).value
    this.searchSubject.next(searchQuery?.trim());
    this.searchSubject.pipe(debounceTime(300),distinctUntilChanged(),switchMap((search:any)=>
        this.blogService.getBlogBySearchString(search))).subscribe((res:any)=>{
          this.blogPost=res?.data;
        })

    }
  


}
