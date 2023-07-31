import { Injectable, Scope } from '@nestjs/common';
import { Role } from '../entities/role';
import { CreateRoleInput } from '../dto/create-role.input';
import { UpdateRoleInput } from '../dto/update-role.input';

@Injectable({ scope: Scope.DEFAULT })
export class RoleService {
  async getRoles(): Promise<Role[]> {
    return [];
  }

  async getRole(): Promise<Role> {
    return null;
  }

  async createRole(input: CreateRoleInput): Promise<Boolean> {
    return true;
  }

  async updateRole(input: UpdateRoleInput): Promise<Boolean> {
    return true;
  }
  async deleteRole(id: String): Promise<Boolean> {
    return true;
  }
}
