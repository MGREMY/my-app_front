import { FilterRequestOperator } from '@my-app/core/api/pagination/pagination.request';
import { MinimalUserResponse } from '@my-app/core/api/user/minimal-user.response';
import { TableFilterOption } from '@my-app/shared/components/table/table.component';

export default {
  defaultFilterProperty: 'id',
  defaultFilterValue: '',
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
