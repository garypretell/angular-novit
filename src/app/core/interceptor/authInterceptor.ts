import { inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  route = inject(ActivatedRoute);
  authService = inject(AuthService);
  router = inject(Router);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (localStorage.getItem('token')) {
      this.authService.checkToken();
    }
    req = req.clone({
      headers: req.headers.set(
        'Authorization',
        'Bearer ' + environment.supabaseKey
      ),
    });
    req = req.clone({
      headers: req.headers.set('Content-Type', 'application/json'),
    });
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    req = req.clone({
      headers: req.headers.set('apikey', environment.supabaseKey),
    });

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401) {
          console.log('ERROR 401 UNAUTHORIZED');
          this.authService.signOut();
        }
        const err = error.error.message || error.statusText;
        return throwError(() => error);
      })
    );
  }
}
