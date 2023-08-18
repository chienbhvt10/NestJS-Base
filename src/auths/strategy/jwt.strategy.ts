import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../services/user.service';
import config from 'src/config';
import { User } from '../entities/user';
import { ErrorData } from 'src/common/error.models';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config().jwt.secret,
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: any): Promise<User> {
    const user = await this.userService.findOne(payload.sub);
    this.checkRole(user.role, req.requiredRoles);
    return user;
  }

  checkRole(currentRole: string, requiredRoles: string[] = []) {
    const isValidRole =
      requiredRoles?.includes(currentRole) || requiredRoles?.length === 0;
    if (!isValidRole) {
      throw ErrorData.Forbidden.permission_denined({
        inputRole: currentRole,
        requireRole: requiredRoles,
      });
    }
  }
}
