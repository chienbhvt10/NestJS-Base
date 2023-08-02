import { Field, ObjectType, PartialType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseType } from 'src/common/common.entity';

export type ClassesDocument = Classes & Document;

@ObjectType({ description: '' })
@Schema({ id: true })
export class Classes extends PartialType(BaseType) {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  @Prop({ required: false, trim: true })
  name?: string;

  @Field(() => String, { nullable: true })
  @Prop({ required: false, trim: true })
  shortName?: string;
}

export const ClassesSchema = SchemaFactory.createForClass(Classes);
ClassesSchema.set('timestamps', true);
