import { PossibleFilter } from '@/core/models/possible-filter';

export type TableFilterOption<T> = {
  defaultFilterProperty: keyof T;
  defaultFilterValue: string;
  objectTranslationKey: string;
  possibleFilters: PossibleFilter<T>[];
};
