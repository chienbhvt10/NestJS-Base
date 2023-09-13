import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../decorators/current-user.decorator';
import { Auth } from '../entities/auth.entity';
import { User } from '../../users/entities/user';
import {
  AdminLocalAuthGuard,
  CustomerLocalAuthGuard,
} from '../guards/local.guard';
import { AuthService } from '../services/auth.service';
import { LoginInput } from '../dto';
import { Public } from '../decorators/public.decorator';

@Resolver(() => Auth)
@Public()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => Auth)
  @UseGuards(CustomerLocalAuthGuard)
  async loginClient(@Args('input') _: LoginInput, @CurrentUser() user: User) {
    return await this.authService.login(user);
  }

  @Mutation(() => Auth)
  @UseGuards(AdminLocalAuthGuard)
  async loginAdmin(@Args('input') _: LoginInput, @CurrentUser() user: User) {
    return await this.authService.login(user);
  }
}
