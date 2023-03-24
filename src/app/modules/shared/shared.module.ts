import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { ReRoutingComponent } from './re-routing/re-routing.component';
import { RouterModule, Routes } from '@angular/router';
import { PATHS } from 'src/app/common/constants';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
const routes:Routes=[
  {path:PATHS.SHARED.RE_DIRECT,component:ReRoutingComponent}
]

@NgModule({
  declarations: [
    NavbarComponent,
    ReRoutingComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    RouterModule.forChild(routes)
  ],
  exports:[NavbarComponent,ReRoutingComponent]
})
export class SharedModule { }
