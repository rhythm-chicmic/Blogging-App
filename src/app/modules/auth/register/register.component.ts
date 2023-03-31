import { Component, OnChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PATHS, REGEX, STORAGE_KEYS } from 'src/app/common/constants';
import { AuthenticateService } from 'src/app/core/services/auth.service';
import { SocketService } from 'src/app/core/services/socket.service';
import swal from 'sweetalert2'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnChanges{
  hide = true;
  startDate = new Date(1990, 0, 1);
  submitted = false;
  RegisterForm!:FormGroup
  @ViewChild(FormGroupDirective)
  formDirective!:FormGroupDirective;
  Toast =swal.mixin({
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
  constructor(private socketService:SocketService,private fb:FormBuilder, private authService:AuthenticateService,private router:Router){
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
    this.authService.signUp(this.RegisterForm.value).subscribe((res:any)=>{
      localStorage.setItem('userId',res?.data?.userID)
      localStorage.setItem(STORAGE_KEYS.TOKEN,res?.data?.token);
    })
    this.formDirective.resetForm();
    this.Toast.fire({
      icon: 'success',
      title: 'Account created successfully'
    })
    this.ngOnChanges();
    this.router.navigate([PATHS.MAIN.DASHBOARD]);
    }
    else{
      this.submitted =false;
    }
}
ngOnChanges(){
  this.socketService.startConnection();
}
}
