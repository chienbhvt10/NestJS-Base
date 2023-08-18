import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from '../services/user.service';
import { User } from '../entities/user';
import { ROLE } from 'src/common/enums';
import { ErrorData } from 'src/common/error.models';

// LocalStrategy run without authentication
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      usernameField: 'username',
      passReqToCallback: true,
    });
  }

  async validate(req, username: string, password: string): Promise<User> {
    const role = req.body.role as ROLE;

    const user = await this.userService.getAuthenticatedUser(
      username,
      password,
      role as ROLE,
    );
    if (!user) {
      throw ErrorData.Auth.user_login_failure;
    }
    return user;
  }
}
