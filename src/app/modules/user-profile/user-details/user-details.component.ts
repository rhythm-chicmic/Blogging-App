import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { environment } from 'src/environments/environment.development';
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit{
  userDetails:any;
  id:string=''
  constructor(private userProfileService:UserProfileService,private route:ActivatedRoute){}
  env = environment.BASE_URL+'/'
  demo_img="https://material.angular.io/assets/img/examples/shiba2.jpg"
  ngOnInit(){
    this.userProfileService.getUserProfile().subscribe((res:any)=>{
      console.log(res)
      this.userDetails= res.data;
    })
  }

}
