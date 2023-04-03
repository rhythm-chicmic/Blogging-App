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
  getAllProfiles(page:number){
    return this.httpService.get(this.path+APIS.USER.ALL_USERS+page);
  }
  deleteBlockUser(id:string){
   return this.httpService.delete(this.path+APIS.USER.BLOCK_USER+id); 
  }
  putUnblockUser(id:string){
    return this.httpService.put(this.path+APIS.USER.UNBLOCK_USER,id)
  }
}
