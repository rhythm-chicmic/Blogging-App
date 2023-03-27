import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PATHS, REGEX, STORAGE_KEYS } from 'src/app/common/constants';
import { AuthenticateService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  hide = true;
  startDate = new Date(1990, 0, 1);
  submitted = false;
  RegisterForm!:FormGroup
  @ViewChild(FormGroupDirective)
  formDirective!:FormGroupDirective;
  constructor(private fb:FormBuilder, private authService:AuthenticateService,private router:Router){
    this.initRegisterForm();
  }
  initRegisterForm(){
    this.RegisterForm=this.fb.group({
      firstName:['',[Validators.required,Validators.pattern(REGEX.NAME)]],
      lastName:['',[Validators.required,Validators.pattern(REGEX.NAME)]],
      email:['',[Validators.required,Validators.email,Validators.pattern(REGEX.EMAIL)]],
      password:['',[Validators.required,Validators.minLength(6),Validators.pattern(REGEX.PASSWORD)]],
      phoneNo:['',[Validators.required,Validators.pattern(REGEX.PHONE_NUMBER)]],
      dateOfBirth:['',[Validators.required,Validators.pattern(REGEX.DOB)]],
    })
}
get controls(){
  return this.RegisterForm.controls;
}
Register(){
  if((this.RegisterForm as FormGroup).valid){
    console.log(this.RegisterForm.value.dateOfBirth);
    this.authService.signUp(this.RegisterForm.value).subscribe((res:any)=>{
      console.log(res.data.token, "hello wporld")
      localStorage.setItem(STORAGE_KEYS.TOKEN,res.data.token);
    })
    this.formDirective.resetForm();
    this.router.navigate([PATHS.MAIN.DASHBOARD]);
    }
    else{
      this.submitted =false;
    }
}
}
