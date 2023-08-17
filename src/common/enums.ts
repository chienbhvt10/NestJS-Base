import { registerEnumType } from '@nestjs/graphql';

export enum SORT_VALUE {
  ASC = 'asc',
  DESC = 'desc',
}

export enum ROLE {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
}

export enum USER_STATUS {
  NOT_ACTIVE = 'NOT_ACTIVE',
  ACTIVE = 'ACTIVE',
  IN_ACTIVE = 'IN_ACTIVE',
}

registerEnumType(ROLE, { name: 'Role' });
registerEnumType(SORT_VALUE, { name: 'SortValue' });
registerEnumType(USER_STATUS, { name: 'UserStatus' });
