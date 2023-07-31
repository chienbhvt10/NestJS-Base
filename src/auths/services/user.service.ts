import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.DEFAULT })
export class UserService {
  async login(): Promise<Boolean> {
    return true;
  }

  async register(): Promise<Boolean> {
    return null;
  }

  async forgotPassword(): Promise<Boolean> {
    return null;
  }

  async changePassword(): Promise<Boolean> {
    return null;
  }

  async me(): Promise<Boolean> {
    return null;
  }
}
