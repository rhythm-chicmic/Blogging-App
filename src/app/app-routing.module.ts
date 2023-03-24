import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PARENT_PATHS, PATHS } from './common/constants';

const routes: Routes = [
  {path:PARENT_PATHS.DEFAULT, redirectTo:PATHS.AUTH.LOGIN, pathMatch:'full'},
  {path:PARENT_PATHS.AUTH,loadChildren:()=>import('./modules/auth/auth.module').then(m=>m.AuthModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }