import { Injectable } from '@angular/core';
import * as signalr from '@microsoft/signalr'
import { HttpTransportType } from '@microsoft/signalr';
import { environment } from 'src/environments/environment.development';

import { STORAGE_KEYS } from 'src/app/common/constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private env=environment.BLOG_HUB
  token=localStorage.getItem(STORAGE_KEYS.TOKEN)||''
  notificationArray$=new BehaviorSubject(['']);
  connection=new signalr.HubConnectionBuilder().withUrl(this.env,{
    skipNegotiation: true,
    transport: HttpTransportType.WebSockets,
    accessTokenFactory:()=>this.token
  })
    .withAutomaticReconnect()
   .build()
// Socket initialization Ends
constructor() {
  
}
  startConnection(){
    return this.connection.start()
  }

  likeAndDislike(blogId:string,userId:string,value:number){
    return this.connection.invoke("likeAndDislike",blogId,userId,value);
  }

  sendNotice(data:string){
    return this.connection.invoke("sendNotice",data);
  }
  reciveNoticeListner(){
    this.connection.on('refreshNotice',()=>{
      return this.connection.invoke('GetNotice').then((res:any)=>{
        this.notificationArray$?.next(res?.data);

      })
    })
  }
  


}
