import * as z from 'zod';

export interface MinimalUserResponse {
  id: string;
  createdAtUtc: Date;
}

export const ZMinimalUserResponse: z.ZodType<MinimalUserResponse> = z.object({
  id: z.string(),
  createdAtUtc: z.coerce.date(),
});
