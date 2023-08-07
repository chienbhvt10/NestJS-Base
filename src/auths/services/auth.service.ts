import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { UserPreview } from '../entities/user';
import { ErrorData } from 'src/error.models';
import { Auth, AuthSchema } from '../entities/auth.entity';
import { nanoid } from 'nanoid';
import config from 'src/config';
import { ObjectId } from 'mongodb';

@Injectable()
export class AuthService {
  constructor(
    @InjectConnection() private connection: Connection,
    private jwtService: JwtService,
  ) {}

  async login(user: UserPreview): Promise<Auth> {
    try {
      const auth = new Auth();
      const tokens = await this.generateToken(user);
      auth.accessToken = tokens.accessToken;
      auth.refreshToken = tokens.refreshToken;
      auth.user = new ObjectId(user.id);

      return {
        ...(await this.getModel().create(auth)),
        ...tokens,
      };
    } catch (err) {}
  }

  async generateToken(user: UserPreview): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    if (!user) {
      throw ErrorData.Auth.can_not_gen_token_cause_no_user;
    }
    const refreshToken = await this.generateRefreshToken(user);
    const accessToken = await this.generateAccessToken(refreshToken, user);

    return { refreshToken, accessToken };
  }

  async generateRefreshToken(user: UserPreview): Promise<string> {
    try {
      const payload = {
        uuid: nanoid(),
      };
      return this.jwtService.sign(payload, {
        subject: user.id,
        expiresIn: config().jwt.refreshTokenExpireTime,
      });
    } catch (e) {
      throw ErrorData.Auth.generate_refresh_token_failure;
    }
  }

  async generateAccessToken(refreshToken: string, user: UserPreview) {
    const refreshTokenPayload = await this.decodeToken(refreshToken);
    const payload = {
      username: user.username,
      uuid: nanoid(),
      jti: refreshTokenPayload.jti,
    };
    return this.jwtService.sign(payload, {
      subject: user.id,
    });
  }

  async decodeToken(inputToken: string) {
    try {
      return this.jwtService.verifyAsync(this.getValidToken(inputToken));
    } catch (error) {
      throw ErrorData.Auth.decode_token_failure;
    }
  }

  private getValidToken(inputToken: string) {
    if (!inputToken) {
      throw ErrorData.Auth.wrong_token;
    }
    return inputToken.replace('Bearer ', '');
  }

  getModel() {
    return this.connection.model<Auth>('auths', AuthSchema);
  }
}
