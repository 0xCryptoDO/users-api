import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import { CreateUserDto, CurrentUserResDto, SocialRequestDto } from './dto';
import {
  TelegramUser,
  TelegramUserDocument,
  User,
  UserDocument,
} from './schemas';
import { ContractApiService } from 'src/service-api/contract-api/contract-api.service';
import { TelegramUserRequestDto } from './dto/telegram-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(TelegramUser.name)
    private telegramUserModel: Model<TelegramUserDocument>,
    private contractApiService: ContractApiService,
  ) {}

  public async create(createUserDto: CreateUserDto) {
    const newUser = new this.userModel({
      ...createUserDto,
      regDate: new Date(),
    });
    return newUser.save();
  }

  public async findByWalletOrCreate(wallet: string, referralUserId?: string) {
    const optionsToUpdate: UpdateQuery<UserDocument> = {};

    optionsToUpdate.$setOnInsert = { regDate: new Date() };
    if (referralUserId) {
      optionsToUpdate.$setOnInsert.referralUserId = referralUserId;
    }

    return this.userModel.findOneAndUpdate(
      { wallet: wallet.toLowerCase() },
      optionsToUpdate,
      { new: true, upsert: true },
    );
  }

  public async findById(id: string) {
    const user: CurrentUserResDto = await this.userModel.findById(id).lean();
    if (user.referralUserId) {
      const referral = await this.userModel.findById(user.referralUserId);
      user.referralWallet = referral.wallet;
    }
    return user;
  }

  public async getCurrenUser(id: string) {
    const user: CurrentUserResDto = await this.userModel.findById(id).lean();
    if (user.referralUserId) {
      const referral = await this.userModel.findById(user.referralUserId);
      user.referralWallet = referral.wallet;
    }
    return user;
  }

  public async updateSocialInfo(userId: string, params: SocialRequestDto) {
    try {
      const user = await this.userModel.findById(userId).lean();
      const discordUsername = user.discordUsername || params.discordUsername;
      const twitterUsername = user.twitterUsername || params.twitterUsername;
      const tgId = user.tgId || params.tgId;
      if (tgId && discordUsername && twitterUsername) {
        await this.contractApiService.setSocialPoints(userId);
      }
      await this.userModel.updateOne({ _id: userId }, { $set: params });
    } catch (err) {
      throw new BadRequestException(err as Error);
    }
  }

  public async findByUserTelegramId(userTelegramId: string) {
    const user = await this.userModel.findOne({ tgId: userTelegramId }).lean();
    if (!user) {
      throw new NotFoundException(
        `User with tg id ${userTelegramId} not found`,
      );
    }
    return user;
  }

  public async createOrUpdateTelegramUser(
    tgId: string,
    params: TelegramUserRequestDto,
  ) {
    await this.telegramUserModel.findOneAndUpdate(
      { tgId },
      {
        ...params,
        $setOnInsert: {
          regDate: new Date(),
        },
      },
      {
        new: true,
        upsert: true,
      },
    );
  }
}
