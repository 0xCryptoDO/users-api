import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type TelegramUserDocument = TelegramUser & Document;

@Schema()
export class TelegramUser {
  @Prop({ type: SchemaTypes.Date })
  regDate: Date;

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

export const TelegramUserSchema = SchemaFactory.createForClass(TelegramUser);
