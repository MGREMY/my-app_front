export interface AccessToken {
  exp: number;
  iat: number;
  jti: string | undefined;
  iss: string;
  aud: string;
  sub: string;
  typ: string | undefined;
  azp: string | undefined;
  sid: string | undefined;
  acr: string | undefined;
  'allowed-origins': string[] | undefined;
  realm_access: Record<string, string[]> | undefined;
  scope: string | undefined;
  email_verified: boolean | undefined;
  roles: string[] | undefined;
  name: string | undefined;
  preferred_username: string | undefined;
  given_name: string | undefined;
  family_name: string | undefined;
  email: string | undefined;
  [ket: string]: unknown;
}
