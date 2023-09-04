import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TelegramUser, TelegramUserSchema, User, UserSchema } from './schemas';
import { ContractApiService } from 'src/service-api/contract-api/contract-api.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: TelegramUser.name, schema: TelegramUserSchema },
    ]),
  ],
  providers: [UsersService, ContractApiService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
