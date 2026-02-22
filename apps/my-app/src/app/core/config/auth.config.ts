import { APP_AUTH_CONFIG } from '@libs/core/app-auth-config.service';
import { APP_CONFIG_SERVICE } from '@libs/core/app-config.service';

import { EnvironmentProviders, inject, Provider } from '@angular/core';
import { AuthConfig, provideOAuthClient } from 'angular-oauth2-oidc';

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
  ];
}
