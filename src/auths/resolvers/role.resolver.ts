import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from '../entities/role';
import { CreateRoleInput } from '../dto/create-role.input';
import { UpdateRoleInput } from '../dto/update-role.input';
import { RoleService } from '../services/role.service';

@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Query(() => Role)
  async getRoles(): Promise<Role[]> {
    return await this.roleService.getRoles();
  }

  @Query(() => [Role])
  async getRole(): Promise<Role> {
    return await this.roleService.getRole();
  }

  @Mutation(() => Boolean)
  async createRole(input: CreateRoleInput): Promise<Boolean> {
    return await this.roleService.createRole(input);
  }

  @Mutation(() => Boolean)
  async updateRole(input: UpdateRoleInput): Promise<Boolean> {
    return await this.roleService.updateRole(input);
  }

  @Mutation(() => Boolean)
  async deleteRole(id: String): Promise<Boolean> {
    return await this.roleService.deleteRole(id);
  }
}
