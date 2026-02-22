import { AuthService } from '@libs/core/api/auth/auth.service';

import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    const clone = req.clone({
      withCredentials: true,
      headers: req.headers.append('Authorization', `Bearer ${authService.getAccessToken()}`),
    });

    return next(clone);
  }

  return next(req);
}
