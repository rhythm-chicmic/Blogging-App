import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PARENT_PATHS, PATHS } from './common/constants';

const routes: Routes = [
  {path:PARENT_PATHS.DEFAULT, redirectTo:PATHS.MAIN.DASHBOARD, pathMatch:'full'},
  {path:PARENT_PATHS.MAIN,loadChildren:()=>import('./modules/main/main.module').then(m=>m.MainModule)},
  {path:PARENT_PATHS.AUTH,loadChildren:()=>import('./modules/auth/auth.module').then(m=>m.AuthModule)},
  {path:PARENT_PATHS.SHARED,loadChildren:()=>import('./modules/shared/shared.module').then(m=>m.SharedModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
