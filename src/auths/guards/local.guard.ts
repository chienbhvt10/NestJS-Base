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
      ...ctx.getArgs().loginInput,
      ...{ role: ROLE.CLIENT },
    };

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
      ...ctx.getArgs().loginInput,
      ...{ role: ROLE.ADMIN },
    };
    return req;
  }
}
