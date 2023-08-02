import { Field, ObjectType, PartialType } from '@nestjs/graphql';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseType } from 'src/common/common.entity';

export type RoleDocument = Role & Document;

@ObjectType({ description: '' })
@Schema()
export class Role extends PartialType(BaseType) {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
RoleSchema.set('timestamps', true);
