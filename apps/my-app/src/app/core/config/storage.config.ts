import { LocalStorageService } from '@app-core/services/local-storage.service';
import { APP_STORAGE_SERVICE } from '@app-core/storage.service';

import { Provider } from '@angular/core';

export function provideStorageConfig(): Provider {
  return { provide: APP_STORAGE_SERVICE, useClass: LocalStorageService };
}
