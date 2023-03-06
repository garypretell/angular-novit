import { inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ModalService } from '../services/modal.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  modalService = inject(ModalService)

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err && (err.status === 401 || err.status === 403)) {
          this.openModalError(err.error.error.description);
        }
        if (err.status === 412) {
          this.openModalError(err.error.mensaje);
        } else {
          this.openModalError(err.error.error_description);
        }
        const errorM = err.error || err.statusText;
        return throwError(() => errorM);
      }),
    );
  }

  // Mostrar modal de alerta
  openModalError(msg: string): any {
    // console.log(msg);
    // LOGIN_ALERT.title = 'Alerta';
    // LOGIN_ALERT.message = msg ? msg : 'Hubo un problema al ejecutar su operación.';
    // this.modalService.set(LOGIN_ALERT);
  }
}
