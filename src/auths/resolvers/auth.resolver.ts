import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ARGS_LOGIN } from 'src/common/args.key';
import { CurrentUser } from '../decorators/current-user.decorator';
import { LoginInput } from '../dto/login.input';
import { Auth } from '../entities/auth.entity';
import { User } from '../entities/user';
import {
  AdminLocalAuthGuard,
  CustomerLocalAuthGuard,
} from '../guards/local.guard';
import { AuthService } from '../services/auth.service';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => Auth)
  @UseGuards(CustomerLocalAuthGuard)
  async loginClient(
    @Args(ARGS_LOGIN) _: LoginInput,
    @CurrentUser() user: User,
  ) {
    return await this.authService.login(user);
  }

  @Mutation(() => Auth)
  @UseGuards(AdminLocalAuthGuard)
  async loginAdmin(@Args(ARGS_LOGIN) _: LoginInput, @CurrentUser() user: User) {
    return await this.authService.login(user);
  }
}
