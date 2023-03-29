import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-genral-profile',
  templateUrl: './genral-profile.component.html',
  styleUrls: ['./genral-profile.component.scss']
})
export class GenralProfileComponent implements OnInit{
  userDetails:any;
  id:string=''
  constructor(private userProfileService:UserProfileService,private activeRoute:ActivatedRoute){}
  env = environment.BASE_URL+'/'
  demo_img="https://material.angular.io/assets/img/examples/shiba2.jpg"
  ngOnInit(){
    this.activeRoute.params.subscribe(params=>{
      this.id = params['id'];
      console.log(this.id);
  })
    this.userProfileService.getGeneralProfile(this.id).subscribe((res:any)=>{
      this.userDetails=res.data
    })
  }
}
