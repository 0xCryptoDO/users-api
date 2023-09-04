import { AuthModule as ReusableAuthModule } from '@cryptodo/common';
import { Module, CacheModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Web3SigStrategy } from './web3-signature.strategy';
import { UsersModule } from 'src/users/users.module';
import { config } from 'dotenv';

config();

@Module({
  imports: [CacheModule.register(), UsersModule, ReusableAuthModule],
  providers: [AuthService, Web3SigStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
