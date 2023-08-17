import { Field, InputType, Int } from '@nestjs/graphql';
import { SORT_VALUE } from './enums';

@InputType()
export class RefInput {
  @Field(() => String)
  id: string;
}

@InputType()
export class PaginationInput {
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  skip: number;

  @Field(() => Int, { nullable: true, defaultValue: 10 })
  limit: number;
}

@InputType()
export class PaginationInfo {
  @Field(() => String, { nullable: true })
  total: number;

  @Field(() => String, { nullable: true })
  offset: number;

  @Field(() => String, { nullable: true })
  limit: number;
}

@InputType()
export class FilterInput {
  @Field(() => String)
  key: string;

  @Field(() => String)
  value: string;

  @Field(() => Boolean, {
    defaultValue: false,
    nullable: true,
    description: 'set it to true if this field is a reference to another type',
  })
  isRef: boolean;
}

@InputType()
export class SortInput {
  @Field(() => String)
  key: string;

  @Field(() => SORT_VALUE, {
    nullable: true,
  })
  value: SORT_VALUE;
}

@InputType()
export class WhereInput {
  @Field(() => [SortInput], { nullable: true })
  sort?: SortInput[];

  @Field(() => [FilterInput], { nullable: true })
  filter?: FilterInput[];
}
