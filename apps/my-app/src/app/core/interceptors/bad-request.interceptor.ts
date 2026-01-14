// This interceptor handles HTTP errors

import { ZErrorResponse } from '@my-app/core/api/error/error.response';

import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
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
  return next(req).pipe(
    catchError((error) => {
      // If there is no network connection, throw a custom error
      if (checkNoNetworkConnection(error)) {
        throw new HttpNoNetworkConnectionError();
      }

      if (error instanceof HttpErrorResponse) {
        if (error.status === 401 || error.status === 403) {
          return noAccessToResource(error);
        }

        const parsedError = ZErrorResponse.safeParse(error.error);

        if (parsedError.success) {
          // TODO: Handle with notification
          return EMPTY;
        }
      }

      return throwError(() => error);
    })
  );
}
