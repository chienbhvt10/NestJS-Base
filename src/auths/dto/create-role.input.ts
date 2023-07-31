import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType({ description: '' })
export class CreateRoleInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string;
}
