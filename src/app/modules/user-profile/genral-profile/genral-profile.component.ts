import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { WriteBlogService } from 'src/app/core/services/write-blog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-genral-profile',
  templateUrl: './genral-profile.component.html',
  styleUrls: ['./genral-profile.component.scss']
})
export class GenralProfileComponent implements OnInit{
  userDetails:any;
  id:string=''
  constructor(private userProfileService:UserProfileService,private route:ActivatedRoute){}
  env = environment.BASE_URL+'/'
  demo_img="https://material.angular.io/assets/img/examples/shiba2.jpg"
  ngOnInit(){
    this.route.params.subscribe(params=>{
      this.id = params['id'];
      console.log(this.id);
  })
    this.userProfileService.getGeneralProfile(this.id).subscribe((res:any)=>{
      this.userDetails=res.data
    })
  }
}
