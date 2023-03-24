import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WriteBlogsComponent } from './write-blogs/write-blogs.component';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PATHS } from 'src/app/common/constants';

const routes:Routes=[
  {path:PATHS.MAIN.BLOG_WRITE,component:WriteBlogsComponent}
]
@NgModule({
  declarations: [
    WriteBlogsComponent
  ],
  imports: [
    CommonModule,
    NgxEditorModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports:[WriteBlogsComponent]
})
export class MainModule { }
