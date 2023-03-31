import { Component } from '@angular/core';
import { SocketService } from 'src/app/core/services/socket.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
constructor(private socketService:SocketService){
  this.socketService.startConnection().then((response:any)=>{
    console.log('Connected');
    this.socketService.reciveNoticeListner();
  }).catch((err)=>console.log(err))
}
}
