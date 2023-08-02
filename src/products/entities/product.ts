import { Field, ObjectType, PartialType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseType } from 'src/common/common.entity';

export type ProductsDocument = Product & Document;

@ObjectType({ description: '' })
@Schema({ id: true })
export class Product extends PartialType(BaseType) {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  @Prop({ required: false, trim: true })
  name?: string;

  @Field(() => String, { nullable: true })
  @Prop({ required: false, trim: true })
  shortName?: string;

  @Field(() => Number, { nullable: true })
  @Prop({ required: false, trim: true })
  price?: number;

  @Field(() => Number, { nullable: true })
  @Prop({ required: false, trim: true })
  categoryId?: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.set('timestamps', true);
