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
 famousTags:string[]=[]
 recommendedBlogs:any=[]
  id:string=''
  demo_img:string="https://material.angular.io/assets/img/examples/shiba2.jpg"
  constructor(private blogService:WriteBlogService, private activeRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params=>{
      if(!this.id){
      this.id= params['id'];
      }
    })
    this.blogService.getBlogById(this.id).subscribe((res:any)=>{
      this.blogDetails=res.data;
    })
     this.blogService.getFamousTags().subscribe((res:any)=>{
      this.famousTags=res.data
     }) 
     this.blogService.getRecommendedBlogs().subscribe((res:any)=>{
      console.log(res.data);
      this.recommendedBlogs=res.data;
     })
  }
  viewBlog(id:string){
    this.id=id
    this.ngOnInit();
  }
}


