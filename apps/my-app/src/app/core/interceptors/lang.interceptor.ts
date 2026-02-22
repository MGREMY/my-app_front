import { APP_TRANSLATION_SERVICE } from '@libs/core/translation.service';

import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export function langInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const translationService = inject(APP_TRANSLATION_SERVICE);

  const clone = req.clone({
    headers: req.headers.append('Accept-Language', translationService.currentLanguage()),
  });

  return next(clone);
}
