import { APP_CONFIG_SERVICE } from '@my-app/core/app-config.service';
import { AppConfigService } from '@my-app/core/services/app-config.service';

import { Provider } from '@angular/core';

export function provideApplicationConfig(): Provider {
  return { provide: APP_CONFIG_SERVICE, useClass: AppConfigService };
}
