import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../entities/user';
import { UserService } from '../services/user.service';
import { ChangePasswordInput } from '../dto/change-password.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => Boolean)
  async login() {
    return await this.userService.login();
  }

  @Query(() => Boolean)
  async register() {
    return await this.userService.register();
  }

  @Query(() => Boolean)
  async changePassword(user: User, input: ChangePasswordInput) {
    return await this.userService.changePassword(user, input);
  }

  @Query(() => Boolean)
  async forgotPassword() {
    return await this.userService.forgotPassword();
  }

  @Query(() => Boolean)
  async me() {
    return await this.userService.me();
  }
}
