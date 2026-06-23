import { FilterRequestOperator } from '@/core/api/models/pagination';
import { MinimalUserResponse } from '@/core/api/models/user';
import { TableFilterOption } from '@/core/models/table-filter-option';

export default {
  defaultFilterProperty: 'id',
  defaultFilterValue: '',
  objectTranslationKey: 'minimal_user_response',
  possibleFilters: [
    {
      property: 'id',
      operators: [FilterRequestOperator.Equal, FilterRequestOperator.NotEqual],
      type: 'guid',
    },
    {
      property: 'userName',
      operators: [
        FilterRequestOperator.Equal,
        FilterRequestOperator.NotEqual,
        FilterRequestOperator.Contains,
        FilterRequestOperator.NotContains,
        FilterRequestOperator.StartWith,
        FilterRequestOperator.EndWith,
      ],
      type: 'text',
    },
    {
      property: 'email',
      operators: [
        FilterRequestOperator.Equal,
        FilterRequestOperator.NotEqual,
        FilterRequestOperator.Contains,
        FilterRequestOperator.NotContains,
        FilterRequestOperator.StartWith,
        FilterRequestOperator.EndWith,
      ],
      type: 'text',
    },
    {
      property: 'createdAtUtc',
      operators: [
        FilterRequestOperator.Equal,
        FilterRequestOperator.NotEqual,
        FilterRequestOperator.GreaterThan,
        FilterRequestOperator.GreaterThanOrEqual,
        FilterRequestOperator.LessThan,
        FilterRequestOperator.LessThanOrEqual,
      ],
      type: 'date',
    },
  ],
} satisfies TableFilterOption<MinimalUserResponse>;
