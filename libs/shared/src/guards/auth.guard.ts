import { AuthService } from '@/core/api/auth/auth.service';

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    return true;
  }

  authService.login();
  return false;
};

export const notAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return router.createUrlTree(['/', 'app']);
  }

  return true;
};
