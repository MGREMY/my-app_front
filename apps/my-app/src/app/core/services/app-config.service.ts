import { environment } from '../../../environments/environment';
import { IAppConfigService } from '@app-core/app-config.service';

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppConfigService implements IAppConfigService {
  private readonly _windowKey = 'runtime_config';

  private isValidValue(value: string | undefined): boolean {
    // If starts with ${, it's the placeholder used by the build system
    return value !== undefined && value !== '' && !value.startsWith('${');
  }

  get apiUrl(): string {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (window as any)[this._windowKey]?.API_URL;

    return this.isValidValue(value) ? value : environment.apiUrl;
  }

  get defaultLanguage(): string {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (window as any)[this._windowKey]?.DEFAULT_LANGUAGE;

    return this.isValidValue(value) ? value : environment.defaultLanguage;
  }

  get authUrl(): string {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (window as any)[this._windowKey]?.AUTH_URL;

    return this.isValidValue(value) ? value : environment.authUrl;
  }

  get authRealm(): string {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (window as any)[this._windowKey]?.AUTH_REALM;

    return this.isValidValue(value) ? value : environment.authRealm;
  }

  get authClientId(): string {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (window as any)[this._windowKey]?.AUTH_CLIENT_ID;

    return this.isValidValue(value) ? value : environment.authClientId;
  }
}
