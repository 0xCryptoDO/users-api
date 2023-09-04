import { PassportStrategy } from '@nestjs/passport';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Strategy } from 'passport-custom';
import { Request } from 'express';
import { AuthStrategies, CachePrefixes } from './auth.constants';
import { MetamaskLogin } from 'metamask-node-auth';

@Injectable()
export class Web3SigStrategy extends PassportStrategy(
  Strategy,
  AuthStrategies.byWeb3Signature,
) {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    super();
  }
  async validate(req: Request): Promise<boolean> {
    const wallet = req.body.wallet;
    const signature = req.body.signature;
    if (!wallet || !signature) return false;
    const cacheKey = CachePrefixes.msgToWeb3Sign + wallet;
    const message: string = await this.cacheManager.get(cacheKey);
    if (!message) return false;
    await this.cacheManager.del(cacheKey);
    return MetamaskLogin.verifySignature(message, wallet, signature);
  }
}
