import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { ROLE } from 'src/common/enums';

@Injectable()
export class CustomerLocalAuthGuard extends AuthGuard('local') {
  // override of authguard
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    req.body = {
      // must be match with args of graphql args api
      ...ctx.getArgs().input,
      ...{ role: ROLE.CLIENT },
    };

    console.log('CustomerLocalAuthGuard', ctx.getArgs());
    return req;
  }
}

@Injectable()
export class AdminLocalAuthGuard extends AuthGuard('local') {
  // override of authguard
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    req.body = {
      // must be match with args of graphql args api
      ...ctx.getArgs().input,
      ...{ role: ROLE.ADMIN },
    };
    console.log('AdminLocalAuthGuard', req.body);
    return req;
  }
}
