import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ClassesSchema } from 'src/classes/entities/classes.entity';

export type UserDocument = User & Document;

@ObjectType({ description: '' })
@Schema()
export class User {
  @Field(() => String)
  id: string;

  @Field(() => String)
  @Prop()
  username: string;

  @Field(() => String)
  @Prop()
  password: string;

  @Field(() => String)
  @Prop()
  roleId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
ClassesSchema.set('timestamps', true);