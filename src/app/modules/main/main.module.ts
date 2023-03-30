import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WriteBlogsComponent } from './write-blogs/write-blogs.component';
import { NgxEditorModule,schema } from 'ngx-editor';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { PATHS } from 'src/app/common/constants';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TagInputModule } from 'ngx-chips';
import {MatChipsModule} from '@angular/material/chips';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AuthGuardGuard } from 'src/app/core/guards/auth-guard.guard';
import { BlogDisplayPageComponent } from './blog-display-page/blog-display-page.component';
const routes:Routes=[
  {path:PATHS.MAIN.BLOG_WRITE,canActivate:[AuthGuardGuard],component:WriteBlogsComponent},
  {path:PATHS.MAIN.DASHBOARD,component:DashboardComponent},
  {path:PATHS.MAIN.BLOG_DISPLAY+'/:id',component:BlogDisplayPageComponent}
]
@NgModule({
  declarations: [
    WriteBlogsComponent,
    DashboardComponent,
    BlogDisplayPageComponent
  ],
  imports: [
    MatButtonModule,
    SweetAlert2Module,
    MatChipsModule,
    TagInputModule,
    SweetAlert2Module,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    NgxEditorModule.forRoot({
      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        blockquote: 'Blockquote',
        underline: 'Underline',
        strike: 'Strike',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',

        // popups, forms, others...
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
      },
    }),
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports:[WriteBlogsComponent,DashboardComponent,BlogDisplayPageComponent]
})
export class MainModule { }
