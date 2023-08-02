import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseType {
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}
