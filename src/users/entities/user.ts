import { Field, ObjectType, OmitType, PartialType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ClassesSchema } from 'src/classes/entities/classes.entity';
import { BaseType } from 'src/common/common.entity';
import { ROLE, USER_STATUS } from 'src/common/enums';

export type UserDocument = User & Document;

@ObjectType({ description: '' })
@Schema()
export class User extends PartialType(BaseType) {
  @Field(() => String)
  id: string;

  @Field(() => String)
  @Prop()
  email: string;

  @Field(() => String)
  @Prop()
  username: string;

  @Field(() => String)
  @Prop()
  password: string;

  @Field(() => ROLE)
  @Prop({ enum: ROLE, default: ROLE.CLIENT })
  role: ROLE;

  @Field(() => USER_STATUS)
  @Prop({ enum: USER_STATUS, default: USER_STATUS.NOT_ACTIVE })
  status: USER_STATUS;
}

export class UserPreview extends OmitType(User, ['password']) {}

export const UserSchema = SchemaFactory.createForClass(User);
ClassesSchema.set('timestamps', true);
