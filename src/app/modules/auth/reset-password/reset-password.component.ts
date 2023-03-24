import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { REGEX } from 'src/app/common/constants';
import { AuthenticateService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  hide=true;
  submitted=false;
  resetPasswordForm!:FormGroup
  constructor(private fb:FormBuilder,private authService:AuthenticateService){
    this.initResetPasswordForm();
  }
  initResetPasswordForm(){
    this.resetPasswordForm=this.fb.group({
      newPassword:['',[Validators.required,Validators.pattern(REGEX.PASSWORD)]]
    })
  }
  resetPassword(){
    console.log("gelo")
    if((this.resetPasswordForm as FormGroup).valid){
      console.log(this.resetPasswordForm.value)
        this.authService.resetPassword(this.resetPasswordForm.value).subscribe(res=>console.log(res));
    }
    else{
      this.submitted=true;
    }
  }
get controls(){
  return this.resetPasswordForm.controls;
}


}
