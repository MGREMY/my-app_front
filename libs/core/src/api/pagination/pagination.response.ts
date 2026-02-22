import * as z from 'zod';

export interface PaginationResponse<T> {
  pageNumber: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
  data: T[];
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
