import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    unique: true,
  })
  wallet: string;

  @Prop({ type: SchemaTypes.Date })
  regDate: Date;

  @Prop({ type: String, required: false })
  referralUserId?: string;

  @Prop({ type: String, required: false })
  username?: string;

  @Prop({ type: String, required: false, unique: true })
  tgId?: string;

  @Prop({ type: String, required: false })
  firstName?: string;

  @Prop({ type: String, required: false })
  discordUsername?: string;

  @Prop({ type: String, required: false })
  twitterUsername?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
