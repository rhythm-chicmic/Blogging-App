import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { WriteBlogService } from 'src/app/core/services/write-blog.service';
@Component({
  selector: 'app-blog-display-page',
  templateUrl: './blog-display-page.component.html',
  styleUrls: ['./blog-display-page.component.scss']
})
export class BlogDisplayPageComponent implements OnInit{
  env = environment.BASE_URL+'/'
 blogDetails:any;
  id:string=''
  constructor(private blogService:WriteBlogService, private activeRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params=>{
      this.id= params['id'];
    })
    this.blogService.getBlogById(this.id).subscribe((res:any)=>{
      this.blogDetails=res.data;
    })
  }
}


