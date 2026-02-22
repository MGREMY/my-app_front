import { FilterRequestOperator } from '@libs/core/api/pagination/pagination.request';
import { MinimalUserResponse } from '@libs/core/api/user/minimal-user.response';
import { TableFilterOption } from '@libs/core/models/table-filter-option.interface';

export default {
  defaultFilterProperty: 'id',
  defaultFilterValue: '',
  objectTranslationKey: 'minimal_user_response',
  possibleFilters: [
    {
      property: 'id',
      operators: [FilterRequestOperator.Equal, FilterRequestOperator.NotEqual],
      type: 'text',
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
