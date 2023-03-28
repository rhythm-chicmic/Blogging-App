import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { PATHS } from 'src/app/common/constants';
import { WriteBlogService } from 'src/app/core/services/write-blog.service';


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
      this.allBlogs=res.data;
      console.log(res.data)
    })
  }
  edit(){
    this.router.navigate([PATHS.MAIN.BLOG_WRITE])
  }
}