import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress } from 'class-validator';

export class GetMessageToSignDto {
  @IsEthereumAddress()
  @ApiProperty()
  wallet: string;
}

export class GetMessageToSignResDto {
  @ApiProperty()
  message: string;
}
