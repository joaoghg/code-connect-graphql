import { Request } from 'express';

export interface JwtPayload {
  sub: string;
  email: string;
}

export interface GqlRequest extends Request {
  user?: JwtPayload;
}
