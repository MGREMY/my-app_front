import { APP_TRANSLATION_SERVICE } from '@my-app/core/translation.service';

import { DatePipe } from '@angular/common';
import { inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localizedDate',
  pure: false,
})
export class LocalizedDatePipe implements PipeTransform {
  private readonly _translationService = inject(APP_TRANSLATION_SERVICE);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: any, format?: string, timezone?: string): string | null {
    const datePipe = new DatePipe(this._translationService.currentLanguage());

    return datePipe.transform(value, format, timezone);
  }
}
