import { FilterRequestOperator } from '@/core/api/models/pagination';

export type PossibleFilter<T> = {
  property: keyof T;
  operators: FilterRequestOperator[];
  type: 'text' | 'guid' | 'number' | 'date' | 'boolean';
};
