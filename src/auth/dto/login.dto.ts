import { ApiProperty } from '@nestjs/swagger';
import {
  IsEthereumAddress,
  IsHexadecimal,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class LoginDto {
  @IsEthereumAddress()
  @IsNotEmpty()
  @ApiProperty()
  wallet: string;

  @IsHexadecimal()
  @IsNotEmpty()
  @ApiProperty()
  signature: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  referralUserId: string;
}

export class LoginResDto {
  @ApiProperty()
  accessToken: string;
}
