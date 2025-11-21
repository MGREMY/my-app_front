import * as z from 'zod';

export interface UserResponse {
  id: string;
  createdAtUtc: Date;
}

export const ZUserResponse: z.ZodType<UserResponse> = z.object({
  id: z.guid(),
  createdAtUtc: z.coerce.date(),
});
