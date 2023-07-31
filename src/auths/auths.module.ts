import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './entities/role';
import { User, UserSchema } from './entities/user';
import { RoleResolver } from './resolvers/role.resolver';
import { UsersResolver } from './resolvers/user.resolver';
import { RoleService } from './services/role.service';
import { UserService } from './services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  providers: [UserService, UsersResolver, RoleService, RoleResolver],
  exports: [UserService, RoleService],
})
export class AuthsModule {}
