import {
  FilterRequest,
  FilterRequestLogic,
  FilterRequestOperator,
} from '@libs/core/api/pagination/pagination.request';
import { PaginationResponse } from '@libs/core/api/pagination/pagination.response';
import { PossibleFilter } from '@libs/core/models/possible-filter.interface';
import { TableFilterOption } from '@libs/core/models/table-filter-option.interface';
import { ArrayFilterPipe } from '@libs/shared/pipes/array-filter.pipe';
import { EnumKeyValuePairPipe } from '@libs/shared/pipes/enum-key-value-pair.pipe';
import { uniqueId } from '@libs/shared/unique-id';
import { UiButton } from '@libs/ui/button';
import { UiCombobox, UiComboboxDropdown, UiComboboxOption } from '@libs/ui/combobox';
import { UiInput } from '@libs/ui/input';
import { UiLoader } from '@libs/ui/loader';
import { UiMenu, UiMenuItem } from '@libs/ui/menu';
import { UiPagination } from '@libs/ui/pagination';
import { UiTable, UiTableBody, UiTableFooter, UiTableHeader } from '@libs/ui/table';
import { UiTooltip, UiTooltipArrow } from '@libs/ui/tooltip';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowPath, heroChevronDown, heroFunnel, heroTrash } from '@ng-icons/heroicons/outline';
import { TranslatePipe } from '@ngx-translate/core';

import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  linkedSignal,
  model,
  ResourceRef,
  signal,
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

interface TableFilterRequest<T> extends FilterRequest<T> {
  tableFilterRequestId: string;
  filters: TableFilterRequest<T>[];
}

function mapFilterToTableFilter<T>(
  filters: FilterRequest<T>[] | undefined
): TableFilterRequest<T>[] {
  if (filters === undefined) return [];

  return filters.map((x) => ({
    ...x,
    filters: mapFilterToTableFilter(x.filters),
    tableFilterRequestId: uniqueId('tableFilterId'),
  }));
}

function mapTableFilterToFilter<T>(
  filters: TableFilterRequest<T>[] | undefined
): FilterRequest<T>[] {
  if (filters === undefined) return [];

  return filters.map((x) => ({
    propertyName: x.propertyName,
    value: x.value.toString(),
    filterLogic: x.filterLogic,
    filterOperator: x.filterOperator,
    filters: mapTableFilterToFilter(x.filters),
  }));
}

function removeFilterRecursive<T>(
  filterToRemove: TableFilterRequest<T>,
  filters: TableFilterRequest<T>[] | undefined
): TableFilterRequest<T>[] {
  if (filters === undefined) return [];

  return filters
    .filter((x) => x.tableFilterRequestId !== filterToRemove.tableFilterRequestId)
    .map((x) => ({
      ...x,
      filters: removeFilterRecursive(filterToRemove, x.filters),
    }));
}

@Component({
  selector: 'shared-table',
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
    ArrayFilterPipe,
    EnumKeyValuePairPipe,
    FormsModule,
  ],
  standalone: true,
  templateUrl: './table.component.html',
  providers: [provideIcons({ heroArrowPath, heroChevronDown, heroTrash, heroFunnel })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent<T> {
  protected readonly pageSizes = [5, 15, 25, 50, 100];
  protected readonly filterRequestLogic = FilterRequestLogic;
  protected readonly possibleFilterCallback: (
    propertyName: keyof T
  ) => (x: PossibleFilter<T>) => boolean = (propertyName) => (x) => x.property === propertyName;
  protected readonly filterRequestOperator = FilterRequestOperator;

  protected readonly _areFilterSync = signal<boolean>(true);
  protected readonly _filters = linkedSignal<TableFilterRequest<T>[]>(() =>
    mapFilterToTableFilter(this.filters())
  );

  readonly resourceRef = input.required<ResourceRef<PaginationResponse<T> | undefined>>();
  readonly header = input.required<TemplateRef<UiTableHeader>>();
  readonly body = input.required<TemplateRef<UiTableBody>>();

  readonly pageNumber = model.required<number>();
  readonly pageSize = model.required<number>();

  readonly filters = model<FilterRequest<T>[]>([]);

  readonly filterOption = input<TableFilterOption<T> | undefined>();
  readonly footer = input<TemplateRef<UiTableFooter>>();

  protected addFilter(filter?: TableFilterRequest<T>[] | undefined): void;
  protected addFilter(filter?: TableFilterRequest<T> | undefined): void;
  protected addFilter(filter?: TableFilterRequest<T> | TableFilterRequest<T>[] | undefined) {
    const newFilter: TableFilterRequest<T> = {
      tableFilterRequestId: uniqueId('tableFilterId'),
      propertyName: this.filterOption()?.defaultFilterProperty || ('' as keyof T),
      value: this.filterOption()?.defaultFilterValue || '',
      filterLogic: FilterRequestLogic.And,
      filterOperator:
        this.filterOption()?.possibleFilters.filter(
          (x) => x.property === this.filterOption()?.defaultFilterProperty
        )[0]?.operators[0] ?? FilterRequestOperator.Equal,
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
      this._filters.update((x) => [...x, newFilter]);
    }

    this._areFilterSync.set(false);
  }

  protected removeFilter(filterToRemove: TableFilterRequest<T>): void {
    const currentFilters = this._filters();

    this._filters.set([...removeFilterRecursive(filterToRemove, currentFilters)]);
    this._areFilterSync.set(this.filters().length === 0 && this._filters().length === 0);
  }

  protected applyFilters(): void {
    const filters = this._filters();

    this.filters.set(mapTableFilterToFilter([...filters]));
    this._areFilterSync.set(true);
  }
}
