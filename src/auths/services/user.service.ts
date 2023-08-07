import { Injectable, Scope } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { User, UserSchema } from '../entities/user';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hash } from 'bcrypt';
import { ChangePasswordInput } from '../dto/change-password.input';
import { ErrorData } from 'src/error.models';

@Injectable()
export class UserService {
  constructor(private connection: Connection, private jwtService: JwtService) {}

  async login(): Promise<Boolean> {
    return true;
  }

  async register(): Promise<Boolean> {
    return null;
  }

  async forgotPassword(): Promise<Boolean> {
    return null;
  }

  async changePassword(
    user: User,
    input: ChangePasswordInput,
  ): Promise<boolean> {
    if (!compareSync(input.oldPass, user.password)) {
      throw ErrorData.Business.old_password_incorrect;
    }
    const newPassword = await hash(input.newPass, 10);

    return !!this.getModel()
      .findByIdAndUpdate(user.id, {
        $set: {
          password: newPassword,
        },
      })
      .exec();
  }

  async me(): Promise<Boolean> {
    return null;
  }

  async findOne(id: string): Promise<User> {
    return await this.getModel().findById(id);
  }

  private getModel(): Model<User> {
    return this.connection.model<User>('user', UserSchema);
  }
}
