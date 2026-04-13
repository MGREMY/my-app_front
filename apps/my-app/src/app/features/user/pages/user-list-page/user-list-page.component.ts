import { UserListStoreService } from '../../services/user-list.store.service';
import { AppTable } from '@my-app/shared/components/table/table.component';

import { AuthService } from '@/core/api/auth/auth.service';
import { BaseComponent } from '@/shared/base.component';
import { LocalizedDatePipe } from '@/shared/pipes/date.pipe';

import { MgnpTableBody, MgnpTableHeader } from '@mgremy/ng-primitives-extended/table';
import { MgnpButton } from '@mgremy/ng-primitives/button';
import { MgnpMenu, MgnpMenuItem } from '@mgremy/ng-primitives/menu';
import { MgnpTooltip, MgnpTooltipArrow } from '@mgremy/ng-primitives/tooltip';
import { NgpMenu, NgpMenuItem, NgpMenuTrigger } from 'ng-primitives/menu';
import { NgpTooltip, NgpTooltipArrow, NgpTooltipTrigger } from 'ng-primitives/tooltip';

import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroArrowSmallDown,
  heroArrowSmallUp,
  heroEllipsisVertical,
  heroTrash,
} from '@ng-icons/heroicons/outline';
import { TranslatePipe } from '@ngx-translate/core';

import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  model,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  imports: [
    AppTable,
    MgnpButton,
    MgnpMenu,
    MgnpMenuItem,
    MgnpTableHeader,
    MgnpTableBody,
    MgnpTooltip,
    MgnpTooltipArrow,
    NgpTooltip,
    NgpTooltipArrow,
    NgpTooltipTrigger,
    NgpMenu,
    NgpMenuItem,
    NgpMenuTrigger,
    NgIcon,
    TranslatePipe,
    LocalizedDatePipe,
  ],
  templateUrl: './user-list-page.component.html',
  providers: [
    UserListStoreService,
    provideIcons({
      heroEllipsisVertical,
      heroTrash,
      heroArrowSmallDown,
      heroArrowSmallUp,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UserListPageComponent extends BaseComponent implements OnInit {
  protected readonly _service = inject(UserListStoreService);
  protected readonly _authService = inject(AuthService);

  public readonly pageNumber = model.required<number>();
  public readonly pageSize = model.required<number>();

  ngOnInit(): void {
    effect(
      () => {
        this._service.usersResource.pageNumber.set(this.pageNumber());
        this._service.usersResource.pageSize.set(this.pageSize());
      },
      { injector: this._injector }
    );
  }
}
