import { PossibleFilter } from '@libs/core/models/possible-filter.interface';

export interface TableFilterOption<T> {
  defaultFilterProperty: keyof T;
  defaultFilterValue: string;
  objectTranslationKey: string;
  possibleFilters: PossibleFilter<T>[];
}
