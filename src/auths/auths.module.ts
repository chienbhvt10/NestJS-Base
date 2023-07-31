import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user';
import { Role, RoleSchema } from './entities/role';
import { RoleService } from './services/role.service';
import { RoleResolver } from './resolvers/role.resolver';
import { UserService } from './services/user.service';
import { UsersResolver } from './resolvers/user.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  providers: [RoleService, RoleResolver, UserService, UsersResolver],
  exports: [RoleService, UserService],
})
export class AuthsModule {}
