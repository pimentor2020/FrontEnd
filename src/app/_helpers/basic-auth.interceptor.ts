import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Interceptor working");
        request = request.clone({
            setHeaders: { 
                Authorization: this.createBasicAuthToken('admin', 'password'),
                ContentType: 'application/json'
            }
        });
        return next.handle(request);
    }

    createBasicAuthToken(username: string, password: string) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }
}