import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/core/services/user-profile.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {
 isAdmin:boolean=false;
 constructor(private userService:UserProfileService){

    this.userService.getUserProfile().subscribe((res:any)=>{
      this.isAdmin=res?.data[0]?.isAdmin
    })

 }

}
