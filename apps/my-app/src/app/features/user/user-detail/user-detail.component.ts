import { UserResponse } from '@/core/api/user/user.response';
import { LocalizedDatePipe } from '@/shared/pipes/date.pipe';

import { NgpCheckbox } from 'ng-primitives/checkbox';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCheckMini } from '@ng-icons/heroicons/mini';
import { TranslatePipe } from '@ngx-translate/core';

import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, model, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  imports: [NgpCheckbox, NgIcon, LocalizedDatePipe, TranslatePipe, TitleCasePipe],
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
  public readonly user = model.required<UserResponse>();
}
