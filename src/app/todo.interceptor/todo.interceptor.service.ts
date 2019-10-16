import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TodoInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>,
            next: HttpHandler):
    Observable<HttpEvent<any>> {

    const authReq = req.clone({
      headers: req.headers.set('Access-Control-Allow-Origin', '*')
                  .append('content-type', 'application/json')
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }

  constructor() { }
}
