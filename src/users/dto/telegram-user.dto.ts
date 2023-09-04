import { ApiProperty } from '@nestjs/swagger';

export class TelegramUserRequestDto {
  @ApiProperty({ required: true })
  username: string;

  @ApiProperty({ required: true })
  firstName: string;

  @ApiProperty({ required: false })
  discordUsername?: string;

  @ApiProperty({ required: false })
  twitterUsername?: string;
}
