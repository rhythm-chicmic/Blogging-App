import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PATHS } from 'src/app/common/constants';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private route:Router){}
  signIn(){
    this.route.navigate([PATHS.AUTH.LOGIN]);
  }
  signUp(){
    this.route.navigate([PATHS.AUTH.REGISTER]);
  }

}
