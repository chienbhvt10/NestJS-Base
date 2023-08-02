import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@ObjectType({ description: '' })
@Schema({ id: true })
export class Message {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  @Prop({ required: false, trim: true })
  receiver?: string;

  @Field(() => String, { nullable: true })
  @Prop({ required: false, trim: true })
  sender?: string;

  @Field(() => String, { nullable: true })
  @Prop({ required: false, trim: true })
  message?: string;

  @Field(() => String, { nullable: true })
  @Prop({ required: false, trim: true })
  room?: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
MessageSchema.set('timestamps', true);
