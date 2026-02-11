import { APP_CONFIG_SERVICE } from '@my-app/core/app-config.service';
import { AppConfigService } from '@my-app/core/services/app-config.service';

import { APP_BASE_HREF, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { inject, Provider } from '@angular/core';

export function provideApplicationConfig(): Provider[] {
  return [
    { provide: APP_CONFIG_SERVICE, useClass: AppConfigService },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: APP_BASE_HREF, useFactory: () => inject(APP_CONFIG_SERVICE).appBaseHref },
  ];
}
