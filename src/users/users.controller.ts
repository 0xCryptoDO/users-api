import { FindUserByIdDto, FindUserByIdResDto, SocialRequestDto } from './dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard, Roles, RolesGuard, SetRoles } from '@cryptodo/common';
import { Reflector } from '@nestjs/core';
import { TelegramUserRequestDto } from './dto/telegram-user.dto';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, new RolesGuard(new Reflector()))
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @SetRoles(Roles.regular)
  @Get('/current')
  @ApiOkResponse({ type: FindUserByIdResDto })
  getCurrentUser(@Request() req) {
    return this.usersService.getCurrenUser(req.user.userId);
  }

  @SetRoles(Roles.internal)
  @Get('/telegram/:userTelegramId')
  @ApiOkResponse({ type: FindUserByIdResDto })
  getByTelegramId(@Param('userTelegramId') userTelegramId: string) {
    return this.usersService.findByUserTelegramId(userTelegramId);
  }

  @SetRoles(Roles.internal)
  @Get('/:id')
  @ApiOkResponse({ type: FindUserByIdResDto })
  getById(@Param() params: FindUserByIdDto) {
    return this.usersService.findById(params.id);
  }

  @SetRoles(Roles.internal)
  @Post('/:userId/social')
  @ApiCreatedResponse({
    status: 201,
    description: 'user was updated successfully',
  })
  update(@Param('userId') userId: string, @Body() body: SocialRequestDto) {
    return this.usersService.updateSocialInfo(userId, body);
  }

  @SetRoles(Roles.internal)
  @Put('/telegram/:tgId')
  @ApiOperation({ summary: 'Creates or updates telegram user' })
  updatwe(@Param('tgId') tgId: string, @Body() body: TelegramUserRequestDto) {
    return this.usersService.createOrUpdateTelegramUser(tgId, body);
  }
}
