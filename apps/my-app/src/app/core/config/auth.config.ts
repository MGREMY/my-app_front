import { APP_CONFIG_SERVICE } from '@my-app/core/app-config.service';

import { EnvironmentProviders, inject, InjectionToken, provideAppInitializer, Provider } from '@angular/core';
import { AuthConfig, provideOAuthClient } from 'angular-oauth2-oidc';
import { AuthService } from '@my-app/core/api/auth/auth.service';

export const APP_AUTH_CONFIG = new InjectionToken<AuthConfig>('APP_AUTH_CONFIG');

export function provideAuthConfig(): (Provider | EnvironmentProviders)[] {
  return [
    provideOAuthClient(),
    {
      provide: APP_AUTH_CONFIG,
      useFactory: () => {
        const configService = inject(APP_CONFIG_SERVICE);

        return {
          issuer: `${configService.authUrl}/realms/${configService.authRealm}`,
          clientId: configService.authClientId,
          responseType: 'code',
          scope: 'openid offline_access',
          redirectUri: configService.appUrl,
          showDebugInformation: false,
        } as AuthConfig;
      },
      deps: [APP_CONFIG_SERVICE],
    },
    provideAppInitializer(() => inject(AuthService).init())
  ];
}
