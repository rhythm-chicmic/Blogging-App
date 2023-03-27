import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { UserPageComponent } from './user-page/user-page.component';
import { PATHS } from 'src/app/common/constants';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'primeng/api';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const routes:Routes=[
  {path:PATHS.USER_PROFILE.USER_PAGE,component:UserPageComponent}
]

@NgModule({
  declarations: [
    UserPageComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class UserProfileModule { }
