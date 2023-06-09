import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { forgotPasswordModel, googleLoginModel, loginModel, resetPasswordModel, signUpModel } from 'src/app/common/interfaces';
import { APIS, STORAGE_KEYS } from 'src/app/common/constants';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { SocketService } from './socket.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private path = environment.BASE_URL;
  constructor(private httpService:HttpClient,private socketService:SocketService) {
    this.socketService.startConnection().then(()=>{
      console.log('Connected');
      this.socketService.reciveNoticeListner();
    }).catch()
  }

  isLoggedin$ = new BehaviorSubject(localStorage.getItem('token')?true:false);


  login(data:loginModel){
      this.isLoggedin$.next(true);
      return this.httpService.post(this.path+APIS.AUTH.LOGIN,data);
  }
  signUp(data:signUpModel){
    
      this.isLoggedin$.next(true);
    
    return this.httpService.post(this.path+APIS.USER.REGISTER,data);
  }
  googleLogin(data:googleLoginModel){
    this.isLoggedin$.next(true);
    return this.httpService.post(this.path+APIS.AUTH.GOOGLE_LOGIN,data);
  }
  forgetPassword(data:forgotPasswordModel){
    return this.httpService.post(this.path+APIS.PASSWORD.FORGOT_PASSWORD,data);
  }
  resetPassword(data:resetPasswordModel){
    return this.httpService.put(this.path+APIS.PASSWORD.RESET_PASSWORD,data);
  }
  logOut(){
    this.isLoggedin$.next(false);
    return this.httpService.delete(this.path+APIS.AUTH.LOGOUT);

  }

}
