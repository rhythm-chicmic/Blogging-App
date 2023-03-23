import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  hide = true;
  startDate = new Date(1990, 0, 1);
  RegisterForm!:FormGroup
  constructor(private fb:FormBuilder){}
}
