import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { APIS } from 'src/app/common/constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private path = environment.BASE_URL;
  constructor(private httpService:HttpClient) {}

  getUserProfile(){
    return this.httpService.get(this.path+APIS.USER.USER_GET);
  }
  getGeneralProfile(id:string){
    return this.httpService.get(this.path+APIS.USER.GUEST_GET+id+'&pageNo=1');
  }
  getAllProfiles(){
    return this.httpService.get(this.path+APIS.USER.ALL_USERS);
  }
}
