import { PaginationResponse } from '@app-core/api/pagination/pagination.response';
import { LoaderComponent } from '@app-shared/components/loader/loader.component';

import { Button } from 'flowbite-angular/button';
import { Dropdown, DropdownContent, DropdownItem } from 'flowbite-angular/dropdown';
import { Icon } from 'flowbite-angular/icon';
import { chevronDown, refresh } from 'flowbite-angular/icon/outline/arrows';
import { dotsVertical, home, pen, trashBin } from 'flowbite-angular/icon/outline/general';
import { Pagination } from 'flowbite-angular/pagination';
import {
  provideFlowbiteTableState,
  Table,
  TableBody,
  TableFoot,
  TableHead,
} from 'flowbite-angular/table';
import { Tooltip } from 'flowbite-angular/tooltip';
import { provideIcons } from '@ng-icons/core';
import { TranslatePipe } from '@ngx-translate/core';

import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  ResourceRef,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { NgpMenuTrigger } from 'ng-primitives/menu';
import { NgpTooltipTrigger } from 'ng-primitives/tooltip';

@Component({
  selector: 'app-table',
  imports: [
    LoaderComponent,
    Button,
    Icon,
    Pagination,
    NgpMenuTrigger,
    Dropdown,
    DropdownContent,
    DropdownItem,
    Tooltip,
    NgpTooltipTrigger,
    TranslatePipe,
    Table,
  ],
  standalone: true,
  templateUrl: './table.component.html',
  providers: [
    provideIcons({ dotsVertical, pen, trashBin, refresh, home, chevronDown }),
    provideFlowbiteTableState(),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent<T> {
  readonly pageSizes = [5, 15, 25, 50, 100];

  readonly resourceRef = input.required<ResourceRef<PaginationResponse<T> | undefined>>();
  readonly header = input.required<TemplateRef<TableHead>>();
  readonly body = input.required<TemplateRef<TableBody>>();

  readonly pageNumber = model.required<number>();
  readonly pageSize = model.required<number>();

  readonly footer = input<TemplateRef<TableFoot>>();
}
