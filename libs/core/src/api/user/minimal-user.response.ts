import * as z from 'zod';

export interface MinimalUserResponse {
  id: string;
  createdAtUtc: Date;
  userName: string;
  email: string;
}

export const ZMinimalUserResponse: z.ZodType<MinimalUserResponse> = z.object({
  id: z.guid(),
  createdAtUtc: z.coerce.date(),
  userName: z.string(),
  email: z.string(),
});
