import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user-input';

@InputType()
export class UpdateUserInput extends PartialType(
  OmitType(CreateUserInput, ['password', 'role']),
) {
  @Field(() => String)
  id: string;
}
