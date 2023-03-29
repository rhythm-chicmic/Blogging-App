import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { WriteBlogService } from 'src/app/core/services/write-blog.service';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  expanded: boolean;
}

const ELEMENT_DATA: User[] = [
  {
    "id": 123,
    "name": "Leanne Graham",
    "email": "Sincere@april.biz",
    "phone": "1-770-736-8031 x56442",
    "expanded": false
  }
];
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
  dataSource = ELEMENT_DATA;
  usersData:any;
  blogData:any;
  columnsToDisplay = ['id','name', 'phone', 'email'];

  ngOnInit(): void {
    this.userService.getAllProfiles().subscribe((res:any)=>{
      console.log(res.data)
      this.usersData=res.data
    })
    this.blogService.getBlog().subscribe((res:any)=>{
      this.blogData = res.data
    })
  }



  toggleRow(element: { expanded: boolean; }) {
    element.expanded = !element.expanded
  }

  manageAllRows(flag: boolean) {
    ELEMENT_DATA.forEach(row => {
      row.expanded = flag;
    })
  }
}
