import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User, UserPreview } from '../entities/user';
import { UserService } from '../services/user.service';
import { Roles } from '../../auths/decorators/roles.decorator';
import { ROLE } from 'src/common/enums';
import { Public } from '../../auths/decorators/public.decorator';
import { CurrentUser } from '../../auths/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auths/guards/jwt.guard';
import { UseGuards } from '@nestjs/common';
import {
  CreateUserInput,
  UpdateUserInput,
  UpdateUserProfileInput,
} from '../dtos';
import { ChangePasswordInput } from '../dtos/change-password.input';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => Boolean)
  async changePassword(
    @CurrentUser() user: User,
    @Args('input', { type: () => ChangePasswordInput })
    input: ChangePasswordInput,
  ) {
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
  @Roles(ROLE.ADMIN)
  @Query(() => [User])
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @Roles(ROLE.ADMIN)
  @Query(() => User)
  async getAUser(@Args('id', { type: () => String }) id: string) {
    return await this.userService.findOne(id);
  }

  @Public()
  @Mutation(() => User)
  async createAdminUser(
    @Args('input', { type: () => CreateUserInput }) input: CreateUserInput,
  ) {
    return await this.userService.createAdminUser({
      ...input,
      role: ROLE.ADMIN,
    });
  }

  @Public()
  @Mutation(() => User)
  async createClientUser(
    @Args('input', { type: () => CreateUserInput }) input: CreateUserInput,
  ) {
    return await this.userService.createClientUser({
      ...input,
      role: ROLE.CLIENT,
    });
  }

  @Roles(ROLE.ADMIN)
  @Mutation(() => User)
  async updateUser(
    @Args('input', { type: () => UpdateUserInput }) input: UpdateUserInput,
  ) {
    return await this.userService.updateUser(input.id, input);
  }

  @Mutation(() => User)
  async updateUserProfile(
    @CurrentUser() user: UserPreview,
    @Args('input', { type: () => UpdateUserInput })
    input: UpdateUserProfileInput,
  ) {
    return await this.userService.updateUserProfile(user.id, input);
  }
  @Roles(ROLE.ADMIN)
  @Mutation(() => User)
  async removeUser(@Args('id', { type: () => String }) id: string) {
    return await this.userService.removeUser(id);
  }
}
