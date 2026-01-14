import { UserListStoreService } from '../../services/user-list.store.service';
import { AuthService } from '@my-app/core/api/auth/auth.service';
import { BaseComponent } from '@my-app/shared/base.component';
import { TableComponent } from '@my-app/shared/components/table/table.component';
import { LocalizedDatePipe } from '@my-app/shared/pipes/date.pipe';
import { UiButton } from '@my-app/ui/button';
import { UiMenu, UiMenuItem } from '@my-app/ui/menu';
import { UiTableBody, UiTableHeader } from '@my-app/ui/table';
import { UiTooltip } from '@my-app/ui/tooltip';

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
import { NgpMenuTrigger } from 'ng-primitives/menu';
import { NgpTooltipTrigger } from 'ng-primitives/tooltip';

@Component({
  imports: [
    LocalizedDatePipe,
    UiButton,
    NgpMenuTrigger,
    NgIcon,
    UiMenu,
    UiMenuItem,
    TranslatePipe,
    TableComponent,
    UiTableHeader,
    UiTableBody,
    NgpTooltipTrigger,
    UiTooltip,
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
