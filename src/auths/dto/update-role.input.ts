import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType({ description: '' })
export class UpdateRoleInput {
  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  id: string;

  @Field(() => String)
  @IsNotEmpty()
  name: string;
}
