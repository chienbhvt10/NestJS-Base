import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { RefInput } from 'src/common/common.input';
import { CreateClassInput } from './create-class.input';

@InputType({ description: '' })
export class UpdateClassInput extends PartialType(CreateClassInput) {
  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  id: string;

  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  shortName?: string;
}
