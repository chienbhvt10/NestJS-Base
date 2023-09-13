import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user';
import { UsersResolver } from './resolvers/user.resolver';
import { UserService } from './services/user.service';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: config().jwt.secret,
        signOptions: {
          expiresIn: config().jwt.accessTokenExpireTime,
        },
      }),
    }),
  ],
  providers: [UserService, UsersResolver],
  exports: [UserService],
})
export class UserModule {}
