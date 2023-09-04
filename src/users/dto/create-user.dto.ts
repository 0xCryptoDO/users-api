import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress } from 'class-validator';

export class CreateUserDto {
  @IsEthereumAddress()
  @ApiProperty()
  wallet: string;
}
