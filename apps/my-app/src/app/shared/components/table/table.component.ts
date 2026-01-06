import { PaginationResponse } from '@my-app/core/api/pagination/pagination.response';
import { UiButton } from '@my-app/ui/button';
import { UiLoader } from '@my-app/ui/loader';
import { UiMenu, UiMenuItem } from '@my-app/ui/menu';
import { UiPagination } from '@my-app/ui/pagination';
import { UiTable, UiTableBody, UiTableFooter, UiTableHeader } from '@my-app/ui/table';
import { UiTooltip } from '@my-app/ui/tooltip';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowPath, heroChevronDown } from '@ng-icons/heroicons/outline';
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
    UiLoader,
    UiTable,
    UiButton,
    UiPagination,
    UiMenu,
    UiMenuItem,
    UiTooltip,
    NgpMenuTrigger,
    NgpTooltipTrigger,
    NgIcon,
    TranslatePipe,
  ],
  standalone: true,
  templateUrl: './table.component.html',
  providers: [provideIcons({ heroArrowPath, heroChevronDown })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent<T> {
  readonly pageSizes = [5, 15, 25, 50, 100];

  readonly resourceRef = input.required<ResourceRef<PaginationResponse<T> | undefined>>();
  readonly header = input.required<TemplateRef<UiTableHeader>>();
  readonly body = input.required<TemplateRef<UiTableBody>>();

  readonly pageNumber = model.required<number>();
  readonly pageSize = model.required<number>();

  readonly footer = input<TemplateRef<UiTableFooter>>();
}
