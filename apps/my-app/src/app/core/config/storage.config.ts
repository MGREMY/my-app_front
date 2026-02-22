import { LocalStorageService } from '@my-app/core/services/local-storage.service';

import { APP_STORAGE_SERVICE } from '@libs/core/storage.service';

import { Provider } from '@angular/core';

export function provideStorageConfig(): Provider {
  return { provide: APP_STORAGE_SERVICE, useClass: LocalStorageService };
}
