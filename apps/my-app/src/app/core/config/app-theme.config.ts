import { AppThemeService } from '@my-app/core/services/app-theme.service';

import { APP_THEME_SERVICE } from '@libs/core/theme.service';

import { Provider } from '@angular/core';

export function provideApplicationThemeConfig(): Provider {
  return { provide: APP_THEME_SERVICE, useClass: AppThemeService };
}
