import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WriteBlogsComponent } from './write-blogs/write-blogs.component';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PATHS } from 'src/app/common/constants';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';

const routes:Routes=[
  {path:PATHS.MAIN.BLOG_WRITE,component:WriteBlogsComponent},
  {path:PATHS.MAIN.DASHBOARD,component:DashboardComponent}
]
@NgModule({
  declarations: [
    WriteBlogsComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    NgxEditorModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports:[WriteBlogsComponent,DashboardComponent]
})
export class MainModule { }
