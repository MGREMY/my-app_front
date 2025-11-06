import { routes } from './app.routes';
import { provideApplicationConfig } from '@app-core/config/app.config';
import { provideAuthConfig } from '@app-core/config/auth.config';
import { provideDefaultDatePipeConfig } from '@app-core/config/pipe.config';
import { provideStorageConfig } from '@app-core/config/storage.config';
import { provideTranslationConfig } from '@app-core/config/translation.config';
import { authInterceptor } from '@app-core/interceptors/auth.interceptor';
import { badResponseInterceptor } from '@app-core/interceptors/bad-request.interceptor';
import { langInterceptor } from '@app-core/interceptors/lang.interceptor';

import { provideFlowbiteThemeConfig } from 'flowbite-angular/theme-toggle';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptors([authInterceptor, langInterceptor, badResponseInterceptor])),
    provideRouter(routes, withComponentInputBinding()),
    provideFlowbiteThemeConfig({
      type: { type: 'attr', name: 'data-theme' },
    }),
    provideDefaultDatePipeConfig(),
    provideApplicationConfig(),
    provideStorageConfig(),
    provideTranslationConfig(), // Internationalization
    provideAuthConfig(),
  ],
};
