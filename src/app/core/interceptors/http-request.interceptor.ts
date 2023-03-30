import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { STORAGE_KEYS } from 'src/app/common/constants';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const localToken = localStorage.getItem(STORAGE_KEYS?.TOKEN);

    request=request.clone({headers:request.headers.set('Authorization' ,`bearer ${localToken}` || '')})

    return next.handle(request).pipe(catchError((error:HttpErrorResponse)=>{
      if(error.message){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error?.error?.message,
        })
      }
      return throwError(error);
    }));
  }
}
