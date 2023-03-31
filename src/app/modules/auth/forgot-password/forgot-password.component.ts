import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PATHS, REGEX } from 'src/app/common/constants';
import { AuthenticateService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  ForgetPasswordForm!:FormGroup
  submitted = false;
  constructor(private router:Router, private fb:FormBuilder,private authService:AuthenticateService){
    this.initForgetPasswordForm();
  }
  initForgetPasswordForm(){
    this.ForgetPasswordForm = this.fb.group({
      email:['',[Validators.required,Validators.email,Validators.pattern(REGEX.EMAIL)]],
    })
  }
get controls(){
  return this.ForgetPasswordForm.controls;
}
ForgetPassword(){
  if((this.ForgetPasswordForm as FormGroup).valid){
    this.authService.forgetPassword(this.ForgetPasswordForm.value).subscribe((res)=>console.log(res));
    this.Toast.fire({
      icon: 'success',
      title: 'Mail Sent successfully'
    }).then(()=>this.router.navigate([PATHS.SHARED.RE_DIRECT]))
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
