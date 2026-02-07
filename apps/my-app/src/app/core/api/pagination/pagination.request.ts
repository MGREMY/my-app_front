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

export function toURLSearchParams<T>(request: PaginationRequest<T>) {
  const urlSearchParams = new URLSearchParams({
    pageNumber: request.pageNumber.toString(),
    pageSize: request.pageSize.toString(),
  });

  if (request.sortRequests !== undefined && request.sortRequests.length > 0) {
    urlSearchParams.append('sortRequests', JSON.stringify(request.sortRequests));
  }

  if (request.filterRequest !== undefined && request.filterRequest.length > 0) {
    urlSearchParams.append('filterRequests', JSON.stringify(request.filterRequest));
  }

  return urlSearchParams;
}
