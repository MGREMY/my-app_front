import { AuthService } from '@/core/api/auth/auth.service';
import { UserResponse } from '@/core/api/user/user.response';
import { LocalizedDatePipe } from '@/shared/pipes/date.pipe';

import {
  MgnpAccordion,
  MgnpAccordionContent,
  MgnpAccordionItem,
} from '@mgremy/ng-primitives/accordion';
import { MgnpButton } from '@mgremy/ng-primitives/button';
import { MgnpCheckbox } from '@mgremy/ng-primitives/checkbox';
import {
  NgpAccordion,
  NgpAccordionContent,
  NgpAccordionItem,
  NgpAccordionTrigger,
} from 'ng-primitives/accordion';
import { NgpButton } from 'ng-primitives/button';
import { NgpCheckbox } from 'ng-primitives/checkbox';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCheckMini } from '@ng-icons/heroicons/mini';
import { TranslatePipe } from '@ngx-translate/core';

import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-user-detail',
  imports: [
    MgnpButton,
    MgnpCheckbox,
    MgnpAccordion,
    MgnpAccordionItem,
    MgnpAccordionContent,
    NgpButton,
    NgpCheckbox,
    NgpAccordion,
    NgpAccordionItem,
    NgpAccordionContent,
    NgpAccordionTrigger,
    NgIcon,
    LocalizedDatePipe,
    TranslatePipe,
    TitleCasePipe,
  ],
  templateUrl: './user-detail.component.html',
  providers: [
    provideIcons({
      heroCheckMini,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UserDetailComponent {
  protected readonly _authService = inject(AuthService);

  public readonly user = model.required<UserResponse>();
  public readonly current = model<boolean>(false);
}
