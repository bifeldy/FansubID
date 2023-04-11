import { ExecutionContext, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Request, Response } from 'express';

import { ApiKeyService } from '../repository/api-key.service';

import { ConfigService } from '../services/config.service';
import { GlobalService } from '../services/global.service';

@Injectable()
export class RateLimitGuard extends ThrottlerGuard {

  @Inject(ApiKeyService) private aks: ApiKeyService;
  @Inject(ConfigService) private cfg: ConfigService;
  @Inject(GlobalService) private gs: GlobalService;

  override getTracker(req: Request): string {
    const clientOriginIpCc = this.aks.getOriginIpCc(req, true);
    return clientOriginIpCc.origin_ip;
  }

  override async handleRequest(context: ExecutionContext, limit: number, ttl: number): Promise<boolean> {
    const http = context.switchToHttp();
    const req = http.getRequest<Request>();
    const clientOriginIpCc = this.aks.getOriginIpCc(req);
    if (this.cfg.domainIpBypass.includes(clientOriginIpCc.origin_ip)) {
      return true;
    }
    const res = http.getResponse<Response>();
    const key = res.locals['key'] || this.generateKey(context, clientOriginIpCc.origin_ip);
    const ttls = await this.storageService.getRecord(key);
    this.gs.log('[RATE_LIMIT_GUARD-SESSION] ⌛', ttls);
    if (ttls.length >= limit) {
      throw new HttpException({
        info: '💩 429 - Rate Limit :: Kebanjiran Permintaan 🤬',
        result: {
          message: 'Sabar Wheiy, Jangan Nge-SPAM',
          limit,
          ttl
        }
      }, HttpStatus.TOO_MANY_REQUESTS);
    }
    await this.storageService.addRecord(key, ttl);
    return true;
  }

}
