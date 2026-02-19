import { InjectionToken } from '@angular/core';

export const APP_ENVIRONMENT_SERVICE = new InjectionToken<Environment>('APP_STORAGE_SERVICE');

export interface Environment {
  production: boolean;
  appUrl: string;
  appBaseHref: string;
  apiUrl: string;
  defaultLanguage: string;
  authUrl: string;
  authRealm: string;
  authClientId: string;
}
