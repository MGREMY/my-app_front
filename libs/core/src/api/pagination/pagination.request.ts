import z from 'zod';

export enum FilterRequestOperator {
  Equal = 0,
  NotEqual = 1,
  LessThan = 2,
  LessThanOrEqual = 3,
  GreaterThan = 4,
  GreaterThanOrEqual = 5,
  Contains = 6,
  NotContains = 7,
  StartWith = 8,
  EndWith = 9,
}

export enum FilterRequestLogic {
  And = 0,
  Or = 1,
}

export interface FilterRequest<T> {
  propertyName: keyof T;
  filterOperator: FilterRequestOperator;
  value: string;
  filterLogic: FilterRequestLogic;
  filters?: FilterRequest<T>[] | undefined;
}

export interface SortRequest<T> {
  propertyName: keyof T;
  isDescending: boolean;
}

export interface PaginationRequest<T> {
  pageNumber: number;
  pageSize: number;
  sortRequests?: SortRequest<T>[] | undefined;
  filterRequest?: FilterRequest<T>[] | undefined;
}

export interface PaginationResponse<T> {
  pageNumber: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
  data: T[];
}

export function toURLSearchParams<T>(request: PaginationRequest<T>) {
  const urlSearchParams = new URLSearchParams({
    pageNumber: request.pageNumber.toString(),
    pageSize: request.pageSize.toString(),
  });

  if (request.sortRequests?.length) {
    urlSearchParams.append('sortRequests', JSON.stringify(request.sortRequests));
  }

  if (request.filterRequest?.length) {
    urlSearchParams.append('filterRequests', JSON.stringify(request.filterRequest));
  }

  return urlSearchParams;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ZPaginationResponse = <T extends z.ZodType<any, any>>(itemSchema: T) =>
  z.object({
    pageNumber: z.number(),
    pageSize: z.number(),
    hasNextPage: z.boolean(),
    hasPreviousPage: z.boolean(),
    totalPages: z.number(),
    data: z.array(itemSchema),
  });
