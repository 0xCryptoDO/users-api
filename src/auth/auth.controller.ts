import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthStrategies } from './auth.constants';
import {
  GetMessageToSignDto,
  GetMessageToSignResDto,
  LoginDto,
  LoginResDto,
} from './dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/web3/msg-to-sign')
  @ApiOkResponse({
    description: 'Message to sign',
    type: GetMessageToSignResDto,
  })
  async getMsgToWeb3Sign(
    @Query() query: GetMessageToSignDto,
  ): Promise<GetMessageToSignResDto> {
    return this.authService.getMsgToWeb3Sign(query.wallet);
  }

  @Post('/web3/login')
  @ApiOkResponse({ description: 'JWT auth token', type: LoginResDto })
  @ApiUnauthorizedResponse({
    description:
      'Unauthorized. Missing bearer auth, invalid signature or signature expired (expire in 5min after receiving the message to sign)',
  })
  @UseGuards(AuthGuard(AuthStrategies.byWeb3Signature))
  web3Login(@Body() body: LoginDto): Promise<LoginResDto> {
    return this.authService.login(body);
  }
}
