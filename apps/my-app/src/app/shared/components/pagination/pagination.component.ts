import {
  MgnpPagination,
  MgnpPaginationButton,
  MgnpPaginationFirst,
  MgnpPaginationLast,
  MgnpPaginationNext,
  MgnpPaginationPrevious,
} from '@mgremy/ng-primitives/pagination';
import { injectPaginationState } from 'ng-primitives/pagination';

import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroChevronDoubleLeft,
  heroChevronDoubleRight,
  heroChevronLeft,
  heroChevronRight,
} from '@ng-icons/heroicons/outline';

import { ChangeDetectionStrategy, Component, computed } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [
    MgnpPaginationFirst,
    MgnpPaginationPrevious,
    MgnpPaginationButton,
    MgnpPaginationNext,
    MgnpPaginationLast,
    NgIcon,
  ],
  standalone: true,
  templateUrl: './pagination.component.html',
  providers: [
    provideIcons({
      heroChevronDoubleLeft,
      heroChevronDoubleRight,
      heroChevronLeft,
      heroChevronRight,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: MgnpPagination,
      inputs: [],
      outputs: [],
    },
  ],
})
export class AppPagination {
  /** Access the pagination state */
  protected readonly state = injectPaginationState();

  /** Get the pages as an array we can iterate over */
  protected readonly pages = computed(() =>
    Array.from({ length: this.state().pageCount() }).map((_, i) => i + 1)
  );
}
