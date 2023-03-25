import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { ReRoutingComponent } from './re-routing/re-routing.component'
import {MatCardModule} from '@angular/material/card';;
import { RouterModule, Routes } from '@angular/router';
import { PATHS } from 'src/app/common/constants';
import {StyleClassModule} from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import {MatChipsModule} from '@angular/material/chips';
import { CardModule } from 'primeng/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DashboardScrollBlogsComponent } from './dashboard-scroll-blogs/dashboard-scroll-blogs.component';
import { RecommendationScrollBlogsComponent } from './recommendation-scroll-blogs/recommendation-scroll-blogs.component';
const routes:Routes=[
  {path:PATHS.SHARED.RE_DIRECT,component:ReRoutingComponent}
]

@NgModule({
  declarations: [
    NavbarComponent,
    ReRoutingComponent,
    DashboardScrollBlogsComponent,
    RecommendationScrollBlogsComponent
  ],
  imports: [
    MatChipsModule,
    CommonModule,
    StyleClassModule,
    MatProgressSpinnerModule,
    MatCardModule,
    ButtonModule,
    MatToolbarModule,
    CardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    RouterModule.forChild(routes)
  ],
  exports:[NavbarComponent,ReRoutingComponent,DashboardScrollBlogsComponent]
})
export class SharedModule { }
