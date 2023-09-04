import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { UsersService } from 'src/users/users.service';
import { v4 } from 'uuid';
import { CachePrefixes, msgToWeb3Sign } from './auth.constants';
import { AuthService as ReusableAuthService, Roles } from '@cryptodo/common';
import { GetMessageToSignResDto, LoginDto, LoginResDto } from './dto';
import { Base64 } from 'js-base64';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private authService: ReusableAuthService,
    private usersService: UsersService,
  ) {}

  async getMsgToWeb3Sign(wallet: string): Promise<GetMessageToSignResDto> {
    const message = msgToWeb3Sign + v4();
    await this.cacheManager.set(CachePrefixes.msgToWeb3Sign + wallet, message, {
      ttl: 180,
    });
    return { message };
  }

  async login(params: LoginDto): Promise<LoginResDto> {
    if (params.referralUserId) {
      params.referralUserId = Base64.decode(params.referralUserId);
      const user = await this.usersService.findById(params.referralUserId);
      if (!user) {
        throw new NotFoundException(
          null,
          `user ${params.referralUserId} does no exists`,
        );
      }
    }

    const user = await this.usersService.findByWalletOrCreate(
      params.wallet,
      params.referralUserId,
    );

    return {
      accessToken: this.authService.sign({
        userId: user.id,
        role: Roles.regular,
      }),
    };
  }
}
