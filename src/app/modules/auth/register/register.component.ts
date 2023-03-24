import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { REGEX } from 'src/app/common/constants';
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
  constructor(private fb:FormBuilder, private authService:AuthenticateService){
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
    this.authService.signUp(this.RegisterForm.value).subscribe((res)=>{
      console.log(res)
    })
    }
    else{
      this.submitted =false;
    }
}
}
