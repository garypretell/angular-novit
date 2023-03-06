import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PATH_URL_DATA } from '../constants/routes';

export const requireUnauthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const user = localStorage.getItem('user');
    if (user) {
      router.navigate([PATH_URL_DATA.urlHome]);
      return false;
    }
    return true;
};
