import { LocalStorageService } from '@my-app/core/services/local-storage.service';

import { APP_STORAGE_SERVICE } from '@mgremy/core';

import { Provider } from '@angular/core';

export function provideStorageConfig(): Provider {
  return { provide: APP_STORAGE_SERVICE, useClass: LocalStorageService };
}
