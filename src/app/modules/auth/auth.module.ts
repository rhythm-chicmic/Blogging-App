import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RouterModule, Routes } from '@angular/router';
import { PARENT_PATHS, PATHS } from 'src/app/common/constants';

const routes:Routes=[
  { path: PARENT_PATHS.DEFAULT, redirectTo: PATHS.AUTH.LOGIN, pathMatch:'full' },
  { path: PATHS.AUTH.LOGIN, component: LoginComponent },
  { path: PATHS.AUTH.REGISTER, component: RegisterComponent },
  { path: PATHS.AUTH.FORGOT_PASSWORD, component: ForgotPasswordComponent },
]

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[LoginComponent,RegisterComponent,ForgotPasswordComponent,ResetPasswordComponent]
})
export class AuthModule { }
