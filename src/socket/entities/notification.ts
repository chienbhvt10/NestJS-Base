import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type NotificationDocument = Notification & Document;

@ObjectType({ description: '' })
@Schema({ id: true })
export class Notification {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  @Prop({ required: false, trim: true })
  receiver?: string;

  @Field(() => String, { nullable: true })
  @Prop({ required: false, trim: true })
  type?: string;

  @Field(() => String, { nullable: true })
  @Prop({ required: false, trim: true })
  message?: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

NotificationSchema.set('timestamps', true);
