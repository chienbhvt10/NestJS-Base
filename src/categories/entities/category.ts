import { Field, ObjectType, PartialType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ClassesSchema } from 'src/classes/entities/classes.entity';
import { BaseType } from 'src/common/common.entity';

export type CategoryDocument = Category & Document;

@ObjectType({ description: '' })
@Schema()
export class Category extends PartialType(BaseType) {
  @Field(() => String)
  id: string;

  @Field(() => String)
  @Prop()
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
ClassesSchema.set('timestamps', true);
