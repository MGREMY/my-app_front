import * as z from 'zod';

export interface UserResponse {
  id: string;
  createdAtUtc: Date;
  clubIds: string[];
  roleIds: string[];
  teamIds: string[];
}

export const ZUserResponse: z.ZodType<UserResponse> = z.object({
  id: z.string(),
  createdAtUtc: z.coerce.date(),
  clubIds: z.array(z.guid()),
  roleIds: z.array(z.guid()),
  teamIds: z.array(z.guid()),
});
