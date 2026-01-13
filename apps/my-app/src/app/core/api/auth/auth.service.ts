import { APP_CONFIG_SERVICE } from '@my-app/core/app-config.service';
import { APP_AUTH_CONFIG } from '@my-app/core/config/auth.config';
import ROLES from '@my-app/core/constants/role.constant';
import { AccessToken } from '@my-app/core/models/access-token.interface';
import { IdToken } from '@my-app/core/models/id-token.interface';
import { APP_STORAGE_SERVICE } from '@my-app/core/storage.service';

import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OAuthService } from 'angular-oauth2-oidc';
import { jwtDecode } from 'jwt-decode';
import { filter, from, map, Observable, of, tap } from 'rxjs';

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

  private readonly _isAuthenticated = signal(this._authService.hasValidAccessToken());
  public readonly isAuthenticated = this._isAuthenticated.asReadonly();

  public readonly isAdmin = computed(
    () => this._isAuthenticated() === false || this.hasRoles(ROLES.ADMIN)
  );

  constructor() {
    this._authService.configure(inject(APP_AUTH_CONFIG));
    this._authService.setupAutomaticSilentRefresh();

    this._authService.events
      .pipe(
        takeUntilDestroyed(),
        filter((event) => event.type == 'token_received'),
        tap(() => this._isAuthenticated.set(true))
      )
      .subscribe();

    this._authService.events
      .pipe(
        takeUntilDestroyed(),
        filter((event) => event.type == 'logout' || event.type == 'token_expires'),
        tap(() => this._isAuthenticated.set(false))
      )
      .subscribe();

    effect(() => {
      const isAuthenticated = this._isAuthenticated();

      if (isAuthenticated) {
        this.syncUser().subscribe();
      } else {
        this._storageService.removeItem(this._storageKeys.sync);
      }
    });
  }

  init(): Observable<void> {
    return from(this._authService.loadDiscoveryDocumentAndTryLogin()).pipe(map(() => void 0));
  }

  getIdToken(): IdToken {
    return this._authService.getIdentityClaims() as IdToken;
  }

  getAccessToken(): string {
    return this._authService.getAccessToken();
  }

  getDecodedAccessToken(): AccessToken | undefined {
    const accessToken = this.getAccessToken();

    try {
      return jwtDecode<AccessToken>(accessToken);
    } catch (error) {
      console.warn(error);
      return undefined;
    }
  }

  hasRoles(roles: string): boolean;
  hasRoles(roles: string[], mode: 'any' | 'all'): boolean;
  hasRoles(roles: string | string[], mode: 'any' | 'all' = 'any'): boolean {
    if (this._isAuthenticated() === false) return false;

    const accessToken = this.getDecodedAccessToken();

    if (accessToken?.roles == undefined) return false;

    if (Array.isArray(roles)) {
      if (mode === 'any') {
        return accessToken.roles.some((role) => roles.includes(role));
      } else {
        return accessToken.roles.filter((role) => roles.includes(role)).length === roles.length;
      }
    } else {
      return accessToken.roles.includes(roles);
    }
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
