// This interceptor handles HTTP errors

import { ZErrorResponse } from '@app-core/api/error/error.response';

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

  return (
    error.status === 0 ||
    error.error instanceof ProgressEvent ||
    (error.status === 0 && error.statusText === 'Unknown Error')
  );
}

// Handles the case where the user does not have access to the resource
function noAccessToResource(error: unknown): Observable<never> {
  //TODO: Handle with notification
  console.warn("You don't have access to this resource");
  return throwError(() => error);
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

      // If the error is 401 Unauthorized
      if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)) {
        return noAccessToResource(error);
      }

      try {
        const parsedError = ZErrorResponse.parse(error.error);

        console.error(parsedError);

        return EMPTY;
      } catch (error) {
        // For all other errors, just throw the error
        return throwError(() => error);
      }
    })
  );
}
