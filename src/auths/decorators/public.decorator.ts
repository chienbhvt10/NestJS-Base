import { SetMetadata } from '@nestjs/common';

export const KEY_PUBLIC = 'isPublic';
export const Public = () => SetMetadata(KEY_PUBLIC, true);
