import { UserListStoreService } from '../../services/user-list.store.service';

import { AuthService } from '@libs/core/api/auth/auth.service';
import { BaseComponent } from '@libs/shared/base.component';
import { TableComponent } from '@libs/shared/components/table/table.component';
import { LocalizedDatePipe } from '@libs/shared/pipes/date.pipe';
import { UiButton } from '@libs/ui/button';
import { UiMenu, UiMenuItem } from '@libs/ui/menu';
import { UiTableBody, UiTableHeader } from '@libs/ui/table';
import { UiTooltip, UiTooltipArrow } from '@libs/ui/tooltip';

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
import { NgpMenu, NgpMenuItem, NgpMenuTrigger } from 'ng-primitives/menu';
import { NgpTooltip, NgpTooltipArrow, NgpTooltipTrigger } from 'ng-primitives/tooltip';

@Component({
  imports: [
    TableComponent,
    UiButton,
    UiMenu,
    UiMenuItem,
    UiTableHeader,
    UiTableBody,
    UiTooltip,
    UiTooltipArrow,
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
