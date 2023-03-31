import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SocketService } from 'src/app/core/services/socket.service';
@Component({
  selector: 'app-show-messages',
  templateUrl: './show-messages.component.html',
  styleUrls: ['./show-messages.component.scss']
})
export class ShowMessagesComponent implements OnInit{
  totalMessages:any;
constructor(private modal :NgbModal , private socket:SocketService){
}

ngOnInit(){
  this.socket.notificationArray$.subscribe(res=>{
    this.totalMessages=res;
  })
}
dismiss(){
  this.modal.dismissAll()
}
}
