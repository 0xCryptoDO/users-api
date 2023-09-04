import { Module } from '@nestjs/common';
import { ContractApiService } from './contract-api/contract-api.service';

@Module({
  providers: [ContractApiService],
})
export class ServiceApiModule {}
