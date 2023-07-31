import { Field, ObjectType } from '@nestjs/graphql';
import { Schema, SchemaFactory } from '@nestjs/mongoose';

export type RoleDocument = Role & Document;

@ObjectType({ description: '' })
@Schema()
export class Role {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
RoleSchema.set('timestamps', true);
