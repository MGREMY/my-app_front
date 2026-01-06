import { AuthService } from '@my-app/core/api/auth/auth.service';

import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  if (authService.isLoggedIn()) {
    return true;
  }

  authService.login();
  return false;
};
