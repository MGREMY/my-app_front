import { UserListStoreService } from '../../services/user-list.store.service';
import { BaseComponent } from '@app-shared/base.component';
import { TableComponent } from '@app-shared/components/table/table.component';
import { AppDatePipe } from '@app-shared/pipes/date.pipe';

import { Button } from 'flowbite-angular/button';
import { Dropdown, DropdownContent, DropdownItem } from 'flowbite-angular/dropdown';
import { Icon } from 'flowbite-angular/icon';
import { refresh } from 'flowbite-angular/icon/outline/arrows';
import { dotsVertical, pen, trashBin } from 'flowbite-angular/icon/outline/general';
import { TableBody, TableHead } from 'flowbite-angular/table';
import { provideIcons } from '@ng-icons/core';
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

@Component({
  imports: [
    AppDatePipe,
    Button,
    NgpMenuTrigger,
    Icon,
    Dropdown,
    DropdownContent,
    DropdownItem,
    TranslatePipe,
    TableComponent,
    TableHead,
    TableBody,
  ],
  templateUrl: './user-list-page.component.html',
  providers: [UserListStoreService, provideIcons({ dotsVertical, pen, trashBin, refresh })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UserListPageComponent extends BaseComponent implements OnInit {
  protected readonly _service = inject(UserListStoreService);

  readonly pageNumber = model.required<number>();
  readonly pageSize = model.required<number>();

  ngOnInit(): void {
    effect(
      () => {
        this._service.paginationRequest.set({
          pageNumber: this.pageNumber(),
          pageSize: this.pageSize(),
        });
      },
      { injector: this._injector }
    );
  }
}
