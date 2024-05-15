import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';

@Injectable()
export class CursorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    document.body.classList.add("!cursor-wait")
    return next.handle(request).pipe(finalize(() => document.body.classList.remove("!cursor-wait")));
  }
}
