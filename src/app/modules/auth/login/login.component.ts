import { Component, ViewChild,NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { REGEX } from 'src/app/common/constants';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/core/services/auth.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SocialUser } from '@abacritt/angularx-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{
 
  LoginForm!:FormGroup
  @ViewChild(FormGroupDirective)
  formDirective!:FormGroupDirective;
  user!:SocialUser;
  loggedIn:any;
  submitted = false;
  constructor(private fb:FormBuilder, private router :Router,private authService:SocialAuthService ,private service:AuthenticateService){

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
      const token = JSON.stringify(this.user.idToken)
      this.service.googleLogin(token).subscribe((res)=>console.log(res));
      // console.log(this.user.idToken , this.loggedIn)
    });
  }

get controls(){
  return this.LoginForm.controls;
}
login(){
   if((this.LoginForm as FormGroup).valid){
    console.log(this.LoginForm.value);
    this.service.login(this.LoginForm.value).subscribe((res)=>{
      console.log(res)
    })
    this.formDirective.resetForm();
    }
    else{
      this.submitted =false;
      this.formDirective.resetForm();

    }
}
}
