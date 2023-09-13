import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { User } from '../../users/entities/user';

@ObjectType()
@Schema({ id: true })
export class Auth {
  id: string;

  @Field(() => String, { nullable: true })
  @Prop()
  refreshToken: string;

  @Field(() => String, { nullable: true })
  accessToken: string;

  @Prop({ type: ObjectId, ref: 'User' })
  user: User | ObjectId;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
AuthSchema.index({ refreshToken: 1, user: 1 }, { unique: true });
AuthSchema.index({ refreshToken: 1 }, { unique: true });
AuthSchema.set('timestamps', true);
