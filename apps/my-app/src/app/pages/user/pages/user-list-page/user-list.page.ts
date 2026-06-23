import { UserListStoreService } from '../../services/user-list.store.service';
import { UserDetailPage } from '../user-detail-page/user-detail.page';
import { AppTable } from '@my-app/shared/components/table/table.component';

import { BaseComponent } from '@/shared/base.component';
import { LocalizedDatePipe } from '@/shared/pipes/date.pipe';

import { MgnpTableBody, MgnpTableHeader } from '@mgremy/ng-primitives-extended/table';
import { MgnpButton } from '@mgremy/ng-primitives/button';
import { MgnpDialog, MgnpDialogOverlay } from '@mgremy/ng-primitives/dialog';
import { MgnpMenu, MgnpMenuItem, MgnpMenuTrigger } from '@mgremy/ng-primitives/menu';
import { MgnpSwitch, MgnpSwitchThumb } from '@mgremy/ng-primitives/switch';
import { MgnpTooltip, MgnpTooltipArrow, MgnpTooltipTrigger } from '@mgremy/ng-primitives/tooltip';
import { NgpDialogContext, NgpDialogManager } from 'ng-primitives/dialog';

import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroArrowSmallDown,
  heroArrowSmallUp,
  heroEllipsisVertical,
  heroEye,
  heroTrash,
} from '@ng-icons/heroicons/outline';
import { TranslatePipe } from '@ngx-translate/core';

import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  model,
  OnInit,
  TemplateRef,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  imports: [
    AppTable,
    UserDetailPage,
    MgnpButton,
    MgnpMenu,
    MgnpMenuTrigger,
    MgnpMenuItem,
    MgnpTableHeader,
    MgnpTableBody,
    MgnpTooltip,
    MgnpTooltipTrigger,
    MgnpTooltipArrow,
    MgnpDialog,
    MgnpDialogOverlay,
    MgnpSwitch,
    MgnpSwitchThumb,
    NgIcon,
    NgClass,
    TranslatePipe,
    LocalizedDatePipe,
  ],
  templateUrl: './user-list.page.html',
  providers: [
    UserListStoreService,
    provideIcons({
      heroEllipsisVertical,
      heroTrash,
      heroEye,
      heroArrowSmallDown,
      heroArrowSmallUp,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UserListPage extends BaseComponent implements OnInit {
  protected readonly _service = inject(UserListStoreService);
  protected readonly _ngpDialogManager = inject(NgpDialogManager);

  protected readonly _userDetailDialog =
    viewChild<TemplateRef<NgpDialogContext<unknown, unknown>>>('userDetailDialog');

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

  openUserDetail(id: string): void {
    const userDetailDialog = this._userDetailDialog();

    if (userDetailDialog) {
      this._ngpDialogManager.open(userDetailDialog, { data: { id } });
    }
  }
}
