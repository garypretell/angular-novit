import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MODAL_ALERT } from '@core/constants/modal-title';
import { ModalService } from '@core/services/modal.service';



export const dynamicGuard: CanActivateFn = (route, state) => {
  const modalService = inject(ModalService);
  // const apiService = inject(ApiService);
  const router = inject(Router);
  
  const roles: string[] = ['SUPER', 'ADMIN', 'EDITOR', 'SUBSCRIBE'];
  const codes = route.data['code'];
  const hasRole = codes.every((item: any) => roles.some((a: any) => a === item));
  if (hasRole) {
    return true;
  }

  MODAL_ALERT.title = 'Alerta';
  MODAL_ALERT.message = 'El usuario no cuenta con los permisos para ingresar a este modulo!';
  MODAL_ALERT.show = true;
  modalService.modalData = MODAL_ALERT;
  router.navigate(['/'], { replaceUrl: true });
  return false;
};
