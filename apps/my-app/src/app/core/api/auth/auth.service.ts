import { APP_CONFIG_SERVICE } from '@app-core/app-config.service';
import { APP_AUTH_CONFIG } from '@app-core/config/auth.config';
import { IdToken } from '@app-core/models/id-token.interface';
import { APP_STORAGE_SERVICE } from '@app-core/storage.service';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, filter, from, map, Observable, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _http = inject(HttpClient);
  private readonly _authService = inject(OAuthService);
  private readonly _storageService = inject(APP_STORAGE_SERVICE);

  private readonly _storageKeys = {
    sync: 'auth.sync',
  };
  private readonly _prefix = `${inject(APP_CONFIG_SERVICE).apiUrl}/v1/auth`;

  private readonly _isAuthenticated$ = new BehaviorSubject<boolean>(this._authService.hasValidAccessToken());

  constructor() {
    this._authService.configure(inject(APP_AUTH_CONFIG));
    this._authService.setupAutomaticSilentRefresh();

    this._authService.events
      .pipe(
        takeUntilDestroyed(),
        filter((event) => event.type == 'token_received'),
        switchMap(() => this.syncUser()),
        tap(() => this._isAuthenticated$.next(true))
      )
      .subscribe();

    this._authService.events
      .pipe(
        takeUntilDestroyed(),
        filter((event) => event.type == 'logout' || event.type == 'token_expires'),
        tap(() => this._storageService.removeItem(this._storageKeys.sync)),
        tap(() => this._isAuthenticated$.next(false))
      )
      .subscribe();
  }

  init(): Observable<void> {
    return from(this._authService.loadDiscoveryDocumentAndTryLogin()).pipe(map(() => void 0));
  }

  isLoggedIn(): Observable<boolean> {
    return this._isAuthenticated$;
  }

  getIdToken(): IdToken {
    return this._authService.getIdentityClaims() as IdToken;
  }

  getAccessToken(): string {
    return this._authService.getAccessToken();
  }

  login(): void {
    return this._authService.initLoginFlow();
  }

  logout(): void {
    return this._authService.logOut();
  }

  syncUser(): Observable<void> {
    const isSync = this._storageService.getItem(this._storageKeys.sync);

    if (isSync === undefined || isSync !== 'true') {
      return this._http
        .post<void>(`${this._prefix}/sync-user`, {})
        .pipe(tap(() => this._storageService.setItem(this._storageKeys.sync, 'true')));
    }

    return of(void 0);
  }
}
