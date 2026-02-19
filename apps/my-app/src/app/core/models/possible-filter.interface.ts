import { FilterRequestOperator } from '@my-app/core/api/pagination/pagination.request';

export interface PossibleFilter<T> {
  property: keyof T;
  operators: FilterRequestOperator[];
  type: 'text' | 'number' | 'date' | 'boolean';
}
