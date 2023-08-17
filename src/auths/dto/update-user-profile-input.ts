import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user-input';

@InputType()
export class UpdateUserProfileInput extends PartialType(
  OmitType(CreateUserInput, ['password', 'role']),
) {}
