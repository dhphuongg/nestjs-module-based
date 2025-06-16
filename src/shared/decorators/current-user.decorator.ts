import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { RequestWithUser } from '../guards/jwt.guard';

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    return request.user;
  },
);
