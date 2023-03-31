import { Injectable } from '@angular/core';
import * as signalr from '@microsoft/signalr'
import { HttpTransportType } from '@microsoft/signalr';
import { environment } from 'src/environments/environment.development';

import { STORAGE_KEYS } from 'src/app/common/constants';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private env=environment.BLOG_HUB
  token=localStorage.getItem(STORAGE_KEYS.TOKEN)||''
  connection=new signalr.HubConnectionBuilder().withUrl(this.env,{
    skipNegotiation: true,
    transport: HttpTransportType.WebSockets,
    accessTokenFactory:()=>this.token
  })
    .withAutomaticReconnect()
   .build()
// Socket initialization Ends
constructor() {
  this.startConnection().then((response:any)=>{
    console.log('Connected');
    this.reciveNoticeListner();
  }).catch((err)=>console.log(err))
}
  startConnection(){
    return this.connection.start()
  }

  likeAndDislike(id:string,value:number){
    return this.connection.invoke("likeAndDislike",id,value);
  }

  sendNotice(data:string){
    return this.connection.invoke("sendNotice",data);
  }
  reciveNoticeListner(){
    this.connection.on('refreshNotice',(data)=>{
      return this.connection.invoke('GetNotice').then((res:any)=>{
        console.log(res.data)
      })
    })
  }
  


}
