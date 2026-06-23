import { TranslatePipe } from '@ngx-translate/core';

import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { FirstLetterUpperPipe } from '@/shared/pipes/first-letter-upper.pipe';

@Component({
  selector: 'app-error',
  imports: [TranslatePipe, FirstLetterUpperPipe],
  standalone: true,
  templateUrl: './error.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppError {
  public readonly error = input.required<Error>();
}
