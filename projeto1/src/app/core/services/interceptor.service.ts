import { AuthService } from './../../modules/access-control/auth.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private service: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.service.getToken()) {
      req = req.clone({
        setHeaders: {
          Authorization: this.service.getToken()
        }
      });
    }
    return next.handle(req);
  }
}
