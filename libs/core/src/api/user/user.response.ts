import * as z from 'zod';

export interface UserResponse {
  id: string;
  createdAtUtc: Date;
  userName: string;
  email: string;
}

export const ZUserResponse: z.ZodType<UserResponse> = z.object({
  id: z.guid(),
  createdAtUtc: z.coerce.date(),
  userName: z.string(),
  email: z.string(),
});
