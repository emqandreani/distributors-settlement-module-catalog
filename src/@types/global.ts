export declare type TokenClaims = {
  /**
   * Audience
   */
  aud?: string;
  /**
   * Issuer
   */
  iss?: string;
  /**
   * Issued at
   */
  iat?: number;
  /**
   * Not valid before
   */
  nbf?: number;
  /**
   * Immutable object identifier, this ID uniquely identifies the user across applications
   */
  oid?: string;
  /**
   * Immutable subject identifier, this is a pairwise identifier - it is unique to a particular application ID
   */
  sub?: string;
  /**
   * Users' tenant or '9188040d-6c67-4c5b-b112-36a304b66dad' for personal accounts.
   */
  tid?: string;
  ver?: string;
  upn?: string;
  preferred_username?: string;
  login_hint?: string;
  emails?: string[];
  name?: string;
  nonce?: string;
  /**
   * Expiration
   */
  exp?: number;
  home_oid?: string;
  sid?: string;
  cloud_instance_host_name?: string;
  cnf?: {
    kid: string;
  };
  x5c_ca?: string[];
  ts?: number;
  at?: string;
  u?: string;
  p?: string;
  m?: string;
  roles?: string[];
  amr?: string[];
  idp?: string;
};

export declare type AccountInfo = {
  homeAccountId: string;
  environment: string;
  tenantId: string;
  username: string;
  localAccountId: string;
  name?: string;
  idTokenClaims?: TokenClaims & {
    [key: string]: string | number | string[] | object | undefined | unknown;
  };
  nativeAccountId?: string;
  [key: string]: unknown;
};
