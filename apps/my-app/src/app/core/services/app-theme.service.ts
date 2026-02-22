import { AppTheme, IAppThemeService } from '@libs/core/theme.service';

export class AppThemeService implements IAppThemeService {
  getTheme(): AppTheme {
    return 'light';
  }

  setTheme(key: AppTheme): void {
    return void 0;
  }
}
