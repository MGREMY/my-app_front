import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { AuthService } from './core/api/auth/auth.service';
import { provideApplicationThemeConfig } from './core/config/app-theme.config';
import { APP_ENVIRONMENT_SERVICE } from './core/environment.service';
import { provideApplicationConfig } from '@my-app/core/config/app.config';
import { provideAuthConfig } from '@my-app/core/config/auth.config';
import { provideDefaultDatePipeConfig } from '@my-app/core/config/pipe.config';
import { provideStorageConfig } from '@my-app/core/config/storage.config';
import { provideTranslationConfig } from '@my-app/core/config/translation.config';
import { authInterceptor } from '@my-app/core/interceptors/auth.interceptor';
import { badResponseInterceptor } from '@my-app/core/interceptors/bad-request.interceptor';
import { langInterceptor } from '@my-app/core/interceptors/lang.interceptor';

import { provideNgIconsConfig } from '@ng-icons/core';

import { provideHttpClient, withInterceptors, withXsrfConfiguration } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(
      withXsrfConfiguration({
        headerName: 'X-XSRF-TOKEN',
        cookieName: 'XSRF-TOKEN',
      }),
      withInterceptors([authInterceptor, langInterceptor, badResponseInterceptor])
    ),
    provideRouter(routes, withComponentInputBinding()),
    provideNgIconsConfig({
      size: '16px',
    }),
    {
      provide: APP_ENVIRONMENT_SERVICE,
      useValue: environment,
    },
    provideApplicationThemeConfig(),
    provideDefaultDatePipeConfig(),
    provideApplicationConfig(),
    provideStorageConfig(),
    provideTranslationConfig(), // Internationalization
    provideAuthConfig(),
    provideAppInitializer(() => inject(AuthService).init()),
  ],
};
