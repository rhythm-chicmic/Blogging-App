import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PATHS,STORAGE_KEYS } from 'src/app/common/constants';

@Component({
  selector: 'app-re-routing',
  templateUrl: './re-routing.component.html',
  styleUrls: ['./re-routing.component.scss']
})
export class ReRoutingComponent implements OnInit{
  constructor(private activeRoute:ActivatedRoute,private router:Router){}
  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((res)=>{
      let id = res['token'];
      localStorage.setItem(STORAGE_KEYS.TOKEN,id);
        })
        setTimeout(() => {
          this.router.navigate([PATHS.AUTH.RESET_PASSWORD])
        }, 3000);
  }
}
