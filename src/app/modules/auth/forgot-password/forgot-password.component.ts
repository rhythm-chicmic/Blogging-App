import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PATHS, REGEX } from 'src/app/common/constants';
import { AuthenticateService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  ForgetPasswordForm!:FormGroup
  submitted = false;
  constructor(private router:Router, private fb:FormBuilder,private authService:AuthenticateService){
    this.initForgetPasswordForm();
  }
  initForgetPasswordForm(){
    this.ForgetPasswordForm = this.fb.group({
      email:['',[Validators.required,Validators.email,Validators.pattern(REGEX.EMAIL)]],
      url:[`http://localhost:4200/`+PATHS.AUTH.RESET_PASSWORD,[]]
    })
  }
get controls(){
  return this.ForgetPasswordForm.controls;
}
ForgetPassword(){
  if((this.ForgetPasswordForm as FormGroup).valid){
    console.log(this.ForgetPasswordForm.value);
    this.authService.forgetPassword(this.ForgetPasswordForm.value).subscribe((res)=>console.log(res));

  }else {
    this.submitted=true;
  }

}









  signIn(){
    this.router.navigate([PATHS.AUTH.LOGIN])

  }
  signUp(){
    this.router.navigate([PATHS.AUTH.REGISTER])

  }
}
