import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private path:any;
  constructor(private httpClient:HttpClient) {
  

    // console.log(this.path,environment.BASE_URL,environment);
    
   }

  LoginWithGoogle(credentials:string):Observable<any>{
    const header = new HttpHeaders().set('Content-type','application/json');
    return this.httpClient.post(this.path+"LoginWithGoogle",JSON.stringify(credentials),{headers:header});
  }
}
