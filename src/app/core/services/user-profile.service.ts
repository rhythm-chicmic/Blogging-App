import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

}
