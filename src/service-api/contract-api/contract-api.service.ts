import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { apiUrls } from 'src/constants';
@Injectable()
export class ContractApiService {
  public async setSocialPoints(userId: string): Promise<void> {
    return axios.post(`${apiUrls.contractApi}/quest/socialPoints/${userId}`);
  }
}
