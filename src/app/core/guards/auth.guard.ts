import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const user = localStorage.getItem('user');
  if (user) {
    return true;
  }
  authService.signOut();
  return false;
};
