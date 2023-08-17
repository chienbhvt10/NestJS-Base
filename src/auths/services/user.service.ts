import { Injectable, Scope } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { User, UserSchema } from '../entities/user';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hash } from 'bcrypt';
import { ChangePasswordInput } from '../dto/change-password.input';
import { ErrorData } from 'src/error.models';
import { CreateUserInput } from '../dto/create-user-input';
import { ROLE } from 'src/common/enums';
import { UpdateUserInput } from '../dto/update-user.input';
import { UpdateUserProfileInput } from '../dto/update-user-profile.input';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectConnection() private connection: Connection,
    private jwtService: JwtService,
  ) {}

  async getAuthenticatedUser(
    username: string,
    password: string,
    role?: ROLE,
  ): Promise<User> {
    const user = await this.getModel()
      .findOne({ username: username, role: role })
      .exec();

    console.log(compareSync(password, user?.password));
    if (user && !compareSync(password, user?.password)) {
      return null;
    }
    return user;
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

  async findAll(): Promise<User[]> {
    return this.getModel().aggregate().exec();
  }

  async createAdminUser(input: CreateUserInput): Promise<User> {
    return this.createClientUser({ ...input, role: input.role });
  }

  async createClientUser(input: CreateUserInput): Promise<User> {
    let user: User;
    user = await this.getModel().findOne({
      username: input.username,
      role: input.role,
    });
    if (user) {
      throw ErrorData.Auth.user_existed;
    }
    const session = await this.getModel().startSession();
    await session.withTransaction(async () => {
      const newUser = new User();
      newUser.username = input.username;
      newUser.email = input.email;
      newUser.password = await hash(input.password, 10);
      newUser.role = input.role;
      user = await this.getModel().create(newUser);

      // send email
    });

    return user;
  }

  async updateUser(id: string, input: UpdateUserInput): Promise<User> {
    return await this.getModel()
      .findOneAndUpdate(
        { _id: id },
        {
          $set: {
            email: input.email || undefined,
          },
        },
        { returnDocument: 'after' },
      )
      .exec();
  }

  async updateUserProfile(
    id: string,
    input: UpdateUserProfileInput,
  ): Promise<User> {
    const updateUserInput: UpdateUserInput = {
      id,
      email: input.email,
    };
    return await this.updateUser(id, updateUserInput);
  }

  async removeUser(id: string): Promise<User> {
    return await this.getModel().findByIdAndDelete(id).exec();
  }

  private getModel(): Model<User> {
    return this.connection.model<User>('user', UserSchema);
  }
}
