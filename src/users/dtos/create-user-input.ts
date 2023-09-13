import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ROLE } from 'src/common/enums';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsNotEmpty()
  @Length(8, 255)
  username: string;

  @Field(() => String)
  @IsNotEmpty()
  @Length(8, 12)
  password: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  role: ROLE;
}
