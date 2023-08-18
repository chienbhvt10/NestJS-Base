import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE } from 'src/common/enums';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { KEY_PUBLIC } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  // override of authguard
  getRequest(context: GqlExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    let req;
    if (context.getContext().req) {
      req = context.getContext().req;
    } else if (context.getArgs().req) {
      req = context.getArgs().req;
    }
    if (req) {
      req.requiredRoles = requiredRoles;
    }
    return req;
  }

  //  override of authguard
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean[]>(KEY_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    return super.canActivate(ctx);
  }
}
