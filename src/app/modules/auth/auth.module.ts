import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RouterModule, Routes } from '@angular/router';
import { PARENT_PATHS, PATHS } from 'src/app/common/constants';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import {GoogleLoginProvider} from '@abacritt/angularx-social-login';
import { HttpRequestInterceptor } from 'src/app/core/interceptors/http-request.interceptor';
import { IsLoginGuard } from 'src/app/core/guards/is-login.guard';

const routes:Routes=[
  { path: PARENT_PATHS.DEFAULT, redirectTo: PATHS.AUTH.LOGIN, pathMatch:'full' },
  { path: PATHS.AUTH.LOGIN, canActivate:[IsLoginGuard], component: LoginComponent },
  { path: PATHS.AUTH.REGISTER, canActivate:[IsLoginGuard],component: RegisterComponent },
  { path: PATHS.AUTH.FORGOT_PASSWORD,canActivate:[IsLoginGuard], component: ForgotPasswordComponent },
  {path:PATHS.AUTH.RESET_PASSWORD,canActivate:[IsLoginGuard] ,component:ResetPasswordComponent}
]

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  providers:[{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '249476113068-tef56b773urjb4g2urjem8r9a18v9s77.apps.googleusercontent.com'
          )
        }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  },
  {provide:HTTP_INTERCEPTORS ,useClass:HttpRequestInterceptor,multi:true}
],
  imports: [
    CommonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDividerModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatSelectModule,
    MatToolbarModule,
    MatInputModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule
  ],
  exports:[LoginComponent,RegisterComponent,ForgotPasswordComponent,ResetPasswordComponent]
})
export class AuthModule { }
