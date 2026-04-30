// This interceptor handles HTTP errors

import { ZErrorResponse } from '@/core/api/error/error.response';

import { MgnpToast } from '@mgremy/ng-primitives/toast';
import { injectToastContext, NgpToast, NgpToastManager } from 'ng-primitives/toast';

import { TranslateService } from '@ngx-translate/core';

import { KeyValuePipe } from '@angular/common';
import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';

// Custom error for no network connection
class HttpNoNetworkConnectionError extends Error {
  constructor() {
    super('No network connection');
  }
}

// Helper function to check if the error is due to no network connection
function checkNoNetworkConnection(error: unknown): boolean {
  if (!(error instanceof HttpErrorResponse)) return false;

  return error.status === 0 || error.error instanceof ProgressEvent;
}

// Handles the case where the user does not have access to the resource
function noAccessToResource(error: HttpErrorResponse): Observable<never> {
  console.warn("You don't have access to this resource");

  return throwError(() => error.error);
}

// Main interceptor function
export function badResponseInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  // Pass the request to the next handler and catch errors
  const ngpToastManager = inject(NgpToastManager);
  const translateService = inject(TranslateService);

  return next(req).pipe(
    catchError((error) => {
      // If there is no network connection, throw a custom error
      if (checkNoNetworkConnection(error)) {
        ngpToastManager.show(ErrorToastComponent, {
          context: {
            title: translateService.instant('misc.error.no_connection'),
          } satisfies ErrorToastContext,
        });

        throw new HttpNoNetworkConnectionError();
      }

      if (error instanceof HttpErrorResponse) {
        if (error.status === 401 || error.status === 403) {
          ngpToastManager.show(ErrorToastComponent, {
            context: {
              title: translateService.instant('misc.error.unhautorized'),
            } satisfies ErrorToastContext,
          });

          return noAccessToResource(error);
        }

        const parsedError = ZErrorResponse.safeParse(error.error);

        if (parsedError.success) {
          // TODO: Handle with notification
          ngpToastManager.show(ErrorToastComponent, {
            context: {
              title: parsedError.data.message,
              errors: parsedError.data.errors,
            } satisfies ErrorToastContext,
          });

          return EMPTY;
        }
      }

      return throwError(() => error);
    })
  );
}

type ErrorToastContext = {
  title: string;
  description?: string | undefined;
  errors?: Record<string, string[]> | undefined;
};

@Component({
  imports: [KeyValuePipe],
  template: `
    <div class="flex flex-col gap-1">
      <p class="text-danger text-lg font-semibold transition-colors">{{ context.title }}</p>
      @if (context.description) {
        <p class="text-danger transition-colors">{{ context.description }}</p>
      }
      @if (context.errors) {
        <ul>
          @for (errors of context.errors | keyvalue; track $index) {
            <li class="text-danger ml-2">{{ errors.key }}</li>
            @for (error of errors.value; track $index) {
              <p class="text-danger-disabled ml-4">- {{ error }}</p>
            }
          }
        </ul>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    mgnpToast: '',
    'data-mgnp-component': 'mgnp-toast',
  },
  hostDirectives: [MgnpToast, NgpToast],
})
class ErrorToastComponent {
  protected readonly context = injectToastContext<ErrorToastContext>();
}
