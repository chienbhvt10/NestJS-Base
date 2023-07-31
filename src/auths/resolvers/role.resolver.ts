import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from '../entities/role';
import { CreateRoleInput } from '../dto/create-role.input';
import { UpdateRoleInput } from '../dto/update-role.input';

@Resolver()
export class RoleResolver {
  constructor(private readonly roleService: RoleResolver) {}

  @Query()
  async getRoles(): Promise<Role[]> {
    return [];
  }

  @Query()
  async getRole(): Promise<Role> {
    return null;
  }

  @Mutation()
  async createRole(input: CreateRoleInput): Promise<Boolean> {
    return true;
  }

  @Mutation()
  async updateRole(input: UpdateRoleInput): Promise<Boolean> {
    return true;
  }

  @Mutation()
  async deleteRole(id: String): Promise<Boolean> {
    return true;
  }
}
