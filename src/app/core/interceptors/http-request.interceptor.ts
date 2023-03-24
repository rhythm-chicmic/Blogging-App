import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { STORAGE_KEYS } from 'src/app/common/constants';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const localToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
    request=request.clone({headers:request.headers.set(STORAGE_KEYS.TOKEN,localToken || '')})

    return next.handle(request);
  }
}
