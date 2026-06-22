import { AuthService } from '@/core/api/auth/auth.service';
import { UserResponse } from '@/core/api/user/user.response';
import { LocalizedDatePipe } from '@/shared/pipes/date.pipe';

import {
  MgnpAccordion,
  MgnpAccordionContent,
  MgnpAccordionItem,
  MgnpAccordionTrigger,
} from '@mgremy/ng-primitives/accordion';
import { MgnpCheckbox } from '@mgremy/ng-primitives/checkbox';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCheckMini, heroMinusMini } from '@ng-icons/heroicons/mini';
import { TranslatePipe } from '@ngx-translate/core';

import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-user-detail',
  imports: [
    MgnpCheckbox,
    MgnpAccordion,
    MgnpAccordionTrigger,
    MgnpAccordionItem,
    MgnpAccordionContent,
    NgIcon,
    LocalizedDatePipe,
    TranslatePipe,
    TitleCasePipe,
  ],
  templateUrl: './user-detail.component.html',
  providers: [
    provideIcons({
      heroCheckMini,
      heroMinusMini,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UserDetailComponent {
  protected readonly _authService = inject(AuthService);

  public readonly user = model.required<UserResponse>();
  public readonly isCurrentUser = input<boolean>(false);
}
