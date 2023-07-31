import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ClassesSchema } from 'src/classes/entities/classes.entity';

export type CategoryDocument = Category & Document;

@ObjectType({ description: '' })
@Schema()
export class Category {
  @Field(() => String)
  id: string;

  @Field(() => String)
  @Prop()
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
ClassesSchema.set('timestamps', true);
