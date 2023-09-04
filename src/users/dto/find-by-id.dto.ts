import { User } from './../schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class FindUserByIdDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  id: string;
}

export class FindUserByIdResDto implements User {
  @ApiProperty()
  username: string;

  @ApiProperty()
  tgId?: string;

  @ApiProperty()
  firstName?: string;

  @ApiProperty()
  discordUsername?: string;

  @ApiProperty()
  twitterUsername?: string;

  @ApiProperty()
  regDate: Date;

  @ApiProperty()
  _id: string;

  @ApiProperty()
  referralUserId: string;

  @ApiProperty()
  wallet: string;
}

export class CurrentUserResDto extends FindUserByIdResDto implements User {
  @ApiProperty()
  referralWallet: string;
}
