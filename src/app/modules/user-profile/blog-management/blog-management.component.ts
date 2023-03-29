import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { WriteBlogService } from 'src/app/core/services/write-blog.service';


@Component({
  selector: 'app-blog-management',
  templateUrl: './blog-management.component.html',
  styleUrls: ['./blog-management.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BlogManagementComponent implements OnInit {
constructor(private userService:UserProfileService,private blogService:WriteBlogService){}
  usersData:any;
  blogData:any;
  toggleValue:boolean=false;
  ngOnInit(): void {
    this.userService.getAllProfiles().subscribe((res:any)=>{
      console.log(res.data)
      this.usersData=res.data
    })
    this.blogService.getBlog().subscribe((res:any)=>{
      this.blogData = res.data
    })
  }



  toggleRow(id:any) {
    

    this.toggleValue=!this.toggleValue
  }

  
}
