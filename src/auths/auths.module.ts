import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user';
import { UsersResolver } from './resolvers/user.resolver';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Connection } from 'mongoose';
import config from 'src/config';
import { Auth, AuthSchema } from './entities/auth.entity';
import { AuthResolver } from './resolvers/auth.resolver';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: config().jwt.secret,
        signOptions: {
          expiresIn: config().jwt.accessTokenExpireTime,
        },
      }),
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Auth.name, schema: AuthSchema },
    ]),
  ],
  providers: [
    UserService,
    UsersResolver,
    AuthService,
    AuthResolver,
    LocalStrategy,
    JwtStrategy,
    Connection,
  ],
  exports: [UserService, AuthService],
})
export class AuthsModule {}
