import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Connection } from 'mongoose';
import config from 'src/config';
import { UserModule } from 'src/users/users.module';
import { Auth, AuthSchema } from './entities/auth.entity';
import { AuthResolver } from './resolvers/auth.resolver';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: config().jwt.secret,
        signOptions: {
          expiresIn: config().jwt.accessTokenExpireTime,
        },
      }),
    }),
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
  ],
  providers: [
    AuthService,
    AuthResolver,
    LocalStrategy,
    JwtStrategy,
    Connection,
  ],
  exports: [AuthService],
})
export class AuthsModule {}
