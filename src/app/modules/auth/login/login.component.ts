import { Component, ViewChild,NgZone, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { PATHS, REGEX } from 'src/app/common/constants';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/core/services/auth.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { STORAGE_KEYS } from 'src/app/common/constants';
import { SocialUser } from '@abacritt/angularx-social-login';
import swal from 'sweetalert2'
import { SocketService } from 'src/app/core/services/socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit,OnChanges{

  LoginForm!:FormGroup
  @ViewChild(FormGroupDirective)
  formDirective!:FormGroupDirective;
  user!:SocialUser;
  loggedIn:any;
  submitted = false;
    Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', swal.stopTimer)
      toast.addEventListener('mouseleave', swal.resumeTimer)
    }
  })
  constructor(private socketService:SocketService,private fb:FormBuilder, private router :Router,public authService:SocialAuthService ,private service:AuthenticateService){

    this.initLoginForm();
  }
  initLoginForm(){
  this.LoginForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(REGEX.EMAIL)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6) ,Validators.pattern(REGEX.PASSWORD)])
  })
}


  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      const token = this.user.idToken
      this.service.googleLogin({token}).subscribe((res:any)=>{
        localStorage.setItem('userId',res?.data?.userID)
      localStorage.setItem(STORAGE_KEYS.TOKEN,res?.data?.token);
      this.Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
      })
      this.ngOnChanges();
        this.router.navigate([PATHS.MAIN.DASHBOARD])
      });


    });
  }

get controls(){
  return this.LoginForm.controls;
}
ngOnChanges(){
  this.socketService.startConnection();
}
login(){
   if((this.LoginForm as FormGroup).valid){

    this.service.login(this.LoginForm.value).subscribe((res:any)=>{
          console.log(res)
        if(res?.statusCode===404){
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Wrong Credentials!',
       
          })
        }
    if(res?.data?.token){
      localStorage.setItem('userId',res?.data?.userID);
      localStorage.setItem('token', res?.data?.token);
      this.Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
      })
      this.ngOnChanges();
       this.router.navigate([PATHS.MAIN.DASHBOARD]);
      }
    })
    this.formDirective.resetForm();
    }
    else{
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Wrong Credentials!',
   
      })
      this.submitted =false;
    }
}
forgetPassword(){
  this.router.navigate([PATHS.AUTH.FORGOT_PASSWORD])
}
}
