import { createParamDecorator } from '@nestjs/common';
import { GqlRequest, JwtPayload } from '../auth.types';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator((data, ctx): JwtPayload => {
  const context = GqlExecutionContext.create(ctx);
  return context.getContext<{ req: GqlRequest }>().req.user as JwtPayload;
});
