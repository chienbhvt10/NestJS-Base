import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';

@InputType()
export class ChangePasswordInput {
  @Field(() => String)
  @IsNotEmpty()
  @Length(1, 255)
  oldPass: string;

  @Field(() => String)
  @IsNotEmpty()
  @Length(8, 12)
  newPass: string;
}
