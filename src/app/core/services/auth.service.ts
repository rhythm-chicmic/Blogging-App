import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { forgotPasswordModel, googleLoginModel, loginModel, resetPasswordModel, signUpModel } from 'src/app/common/interfaces';
import { APIS } from 'src/app/common/constants';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private path = environment.BASE_URL;
  constructor(private httpService:HttpClient) {}
  
  login(data:loginModel){
      return this.httpService.post(this.path+APIS.AUTH.LOGIN,data);
  }
  signUp(data:signUpModel){
    return this.httpService.post(this.path+APIS.USER.REGISTER,data);
  }
  googleLogin(data:googleLoginModel){
    return this.httpService.post(this.path+APIS.AUTH.GOOGLE_LOGIN,data);
  }
  forgetPassword(data:forgotPasswordModel){
    return this.httpService.post(this.path+APIS.PASSWORD.FORGOT_PASSWORD,data);
  }
  resetPassword(data:resetPasswordModel){
    console.log(this.path+APIS.PASSWORD.RESET_PASSWORD,data);
    
    return this.httpService.put(this.path+APIS.PASSWORD.RESET_PASSWORD,data);
  }
}
