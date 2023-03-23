import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { REGEX } from 'src/app/common/constants';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  LoginForm!:FormGroup
  @ViewChild(FormGroupDirective)
  formDirective!:FormGroupDirective;
  submitted = false;
  constructor(private fb:FormBuilder){

    this.initLoginForm();
  }
  initLoginForm(){
  this.LoginForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(REGEX.EMAIL)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6) ,Validators.pattern(REGEX.PASSWORD)])
  })
}
get controls(){
  return this.LoginForm.controls;
}
login(){
   if((this.LoginForm as FormGroup).valid){
    console.log(this.LoginForm.value);
    this.formDirective.resetForm();
    }
    else{
      this.submitted =false;
      this.formDirective.resetForm();

    }
}
}
