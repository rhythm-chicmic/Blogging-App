import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { UserPageComponent } from './user-page/user-page.component';
import { PATHS } from 'src/app/common/constants';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'primeng/api';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserBlogsComponent } from './user-blogs/user-blogs.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { GenralProfileComponent } from './genral-profile/genral-profile.component';
import { BlogManagementComponent } from './blog-management/blog-management.component'

const routes:Routes=[
  {path:PATHS.USER_PROFILE.USER_PAGE,component:UserPageComponent},
  {path:PATHS.USER_PROFILE.GENERAL_PAGE+'/:id',component:GenralProfileComponent},
  {path:PATHS.USER_PROFILE.BLOG_MANAGEMENT,component:BlogManagementComponent}
  
]

@NgModule({
  declarations: [
    UserPageComponent,
    UserDetailsComponent,
    UserBlogsComponent,
    GenralProfileComponent,
    BlogManagementComponent
  ],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports:[UserPageComponent,GenralProfileComponent]
})
export class UserProfileModule { }
