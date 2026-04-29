import { FilterRequestOperator } from '@/core/api/pagination/pagination.request';

export interface PossibleFilter<T> {
  property: keyof T;
  operators: FilterRequestOperator[];
  type: 'text' | 'guid' | 'number' | 'date' | 'boolean';
}
