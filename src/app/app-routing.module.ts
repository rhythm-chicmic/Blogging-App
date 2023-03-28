import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PARENT_PATHS, PATHS } from './common/constants';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ExternalAuthguardService, InternalAuthguardService } from './core/guards/auth-guard';

const routes: Routes = [
  {path:PARENT_PATHS.DEFAULT, redirectTo:PATHS.MAIN.DASHBOARD, pathMatch:'full'},
  {path:PARENT_PATHS.MAIN,canActivate:[ExternalAuthguardService],loadChildren:()=>import('./modules/main/main.module').then(m=>m.MainModule)},
  {path:PARENT_PATHS.AUTH,canActivate:[InternalAuthguardService] ,loadChildren:()=>import('./modules/auth/auth.module').then(m=>m.AuthModule)},
  {path:PARENT_PATHS.USER_PROFILE, loadChildren:()=>import('./modules/user-profile/user-profile.module').then(m=>m.UserProfileModule)},
  {path:PARENT_PATHS.SHARED,loadChildren:()=>import('./modules/shared/shared.module').then(m=>m.SharedModule)}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
  ],
  exports: [RouterModule],
  providers:[InternalAuthguardService,ExternalAuthguardService]
})
export class AppRoutingModule { }
