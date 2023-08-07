import { SetMetadata } from '@nestjs/common';
import { ROLE } from 'src/common/enums';

export const ROLES_KEY = 'requiredRoles';
export const Roles = (...roles: ROLE[]) => SetMetadata(ROLES_KEY, roles);
