import { Injectable } from '@angular/core';
import { WriteBlogsComponent } from 'src/app/modules/main/write-blogs/write-blogs.component';
import { APIS } from 'src/app/common/constants';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { WriteBlogModal } from 'src/app/common/interfaces';

@Injectable({
  providedIn: 'root'
})
export class WriteBlogService {
  private path = environment.BASE_URL;
  constructor(private httpService:HttpClient) {}
   
  postBlog(data:FormData){
    
    return this.httpService.post(this.path+APIS.WRITE_BLOG.BLOG_POST,data)
  }

  postImage(data:FormData){
    return this.httpService.post(this.path+APIS.FILE.FILE_POST,data);
  }
  getBlog(){
    return this.httpService.get(this.path+APIS.WRITE_BLOG.BLOG_GET)
  }
  getBlogByUserId(id:string){
    return this.httpService.get(this.path+APIS.WRITE_BLOG.BLOG_GET_BY_USER_ID+id);
  }
  getBlogById(id:string){
    return this.httpService.get(this.path+APIS.WRITE_BLOG.BLOG_GET_BY_ID+id);
  }
  getBlogBySearchString(value:string){
    return this.httpService.get(this.path+APIS.WRITE_BLOG.BLOG_GET_BY_TAG+value);
  }
  getUserBlogs(){
    return this.httpService.get(this.path+ APIS.WRITE_BLOG.MY_BLOG_GET)
  }
  putBlog(data:FormData,id:string){

    return this.httpService.put(this.path+APIS.WRITE_BLOG.BLOG_PUT+id,data)
  }
  deleteBlog(id:string){
    return this.httpService.delete(this.path+APIS.WRITE_BLOG.BLOG_DELETE+id)
  }
  getFamousTags(){
    return this.httpService.get(this.path+APIS.WRITE_BLOG.FAMOUS_TAGS);
  }
  getRecommendedBlogs(){
    return this.httpService.get(this.path+APIS.WRITE_BLOG.RECOMMENDATIONS_BLOG);
  }
}
