import { ApiProperty } from '@nestjs/swagger';

export class SocialRequestDto {
  @ApiProperty({ required: false })
  tgId: number;

  @ApiProperty({ required: false })
  username: string;

  @ApiProperty({ required: false })
  firstName: string;

  @ApiProperty({ required: false })
  discordUsername?: string;

  @ApiProperty({ required: false })
  twitterUsername?: string;
}
