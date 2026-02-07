import {
  FilterRequest,
  FilterRequestLogic,
  FilterRequestOperator,
} from '@my-app/core/api/pagination/pagination.request';
import { PaginationResponse } from '@my-app/core/api/pagination/pagination.response';
import { EnumKeyValuePairPipe } from '@my-app/shared/pipes/enum-key-value-pair.pipe';
import { UiButton } from '@my-app/ui/button';
import { UiCombobox, UiComboboxDropdown, UiComboboxOption } from '@my-app/ui/combobox';
import { UiInput } from '@my-app/ui/input';
import { UiLoader } from '@my-app/ui/loader';
import { UiMenu, UiMenuItem } from '@my-app/ui/menu';
import { UiPagination } from '@my-app/ui/pagination';
import { UiTable, UiTableBody, UiTableFooter, UiTableHeader } from '@my-app/ui/table';
import { UiTooltip, UiTooltipArrow } from '@my-app/ui/tooltip';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowPath, heroChevronDown } from '@ng-icons/heroicons/outline';
import { TranslatePipe } from '@ngx-translate/core';

import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  linkedSignal,
  model,
  ResourceRef,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgpButton } from 'ng-primitives/button';
import {
  NgpCombobox,
  NgpComboboxButton,
  NgpComboboxDropdown,
  NgpComboboxOption,
  NgpComboboxPortal,
} from 'ng-primitives/combobox';
import { NgpInput } from 'ng-primitives/input';
import { NgpMenu, NgpMenuItem, NgpMenuTrigger } from 'ng-primitives/menu';
import { NgpTooltip, NgpTooltipArrow, NgpTooltipTrigger } from 'ng-primitives/tooltip';

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
    UiTooltipArrow,
    UiCombobox,
    UiComboboxDropdown,
    UiComboboxOption,
    UiInput,
    NgpCombobox,
    NgpComboboxButton,
    NgpComboboxDropdown,
    NgpComboboxPortal,
    NgpComboboxOption,
    NgpButton,
    NgpMenu,
    NgpMenuItem,
    NgpMenuTrigger,
    NgpTooltip,
    NgpTooltipArrow,
    NgpTooltipTrigger,
    NgpInput,
    NgIcon,
    TranslatePipe,
    NgTemplateOutlet,
    EnumKeyValuePairPipe,
    FormsModule,
  ],
  standalone: true,
  templateUrl: './table.component.html',
  providers: [provideIcons({ heroArrowPath, heroChevronDown })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent<T> {
  protected readonly pageSizes = [5, 15, 25, 50, 100];
  protected readonly filterRequestLogic = FilterRequestLogic;
  protected readonly filterRequestOperator = FilterRequestOperator;

  protected readonly _filters = linkedSignal<FilterRequest<T>[]>(() => this.filters());

  readonly resourceRef = input.required<ResourceRef<PaginationResponse<T> | undefined>>();
  readonly header = input.required<TemplateRef<UiTableHeader>>();
  readonly body = input.required<TemplateRef<UiTableBody>>();

  readonly pageNumber = model.required<number>();
  readonly pageSize = model.required<number>();

  readonly filters = model<FilterRequest<T>[]>([]);

  readonly defaultFilterProperty = input<keyof T>();
  readonly filterProperties = input<(keyof T)[]>();
  readonly footer = input<TemplateRef<UiTableFooter>>();

  protected addFilter(filter?: FilterRequest<T>[] | undefined): void;
  protected addFilter(filter?: FilterRequest<T> | undefined): void;
  protected addFilter(filter?: FilterRequest<T> | FilterRequest<T>[] | undefined) {
    const newFilter: FilterRequest<T> = {
      propertyName: this.defaultFilterProperty() || ('' as keyof T),
      value: '',
      filterLogic: FilterRequestLogic.And,
      filterOperator: FilterRequestOperator.Equal,
      filters: [],
    };

    if (filter !== undefined) {
      if (Array.isArray(filter)) {
        filter.push(newFilter);
      } else {
        const currentFilters = filter.filters ?? [];

        filter.filters = [...currentFilters, newFilter];
      }
    } else {
      const currentFilters = this._filters();

      this._filters.set([...currentFilters, newFilter]);
    }
  }

  protected applyFilters(): void {
    const filters = this._filters();

    this.filters.set([...filters.filter((x) => this.filterProperties()?.includes(x.propertyName))]);
  }
}
