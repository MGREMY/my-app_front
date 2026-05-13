import * as z from 'zod';

export interface UserResponse {
  id: string;
  createdAtUtc: Date;
  userName: string;
  email: string;
  isDeleted: boolean;
}

export interface MinimalUserResponse {
  id: string;
  createdAtUtc: Date;
  userName: string;
  email: string;
  isDeleted: boolean;
}

export const ZUserResponse: z.ZodType<UserResponse> = z.object({
  id: z.guid(),
  createdAtUtc: z.coerce.date(),
  userName: z.string(),
  email: z.string(),
  isDeleted: z.boolean(),
});

export const ZMinimalUserResponse: z.ZodType<MinimalUserResponse> = z.object({
  id: z.guid(),
  createdAtUtc: z.coerce.date(),
  userName: z.string(),
  email: z.string(),
  isDeleted: z.boolean(),
});
