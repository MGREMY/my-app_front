export interface IdToken {
  sub: string;
  iss: string;
  aud: string | string[];
  exp: number;
  iat: number;
  name?: string;
  given_name?: string;
  family_name?: string;
  email?: string;
  email_verified?: boolean;
  preferred_username?: string;
  [key: string]: unknown;
}
