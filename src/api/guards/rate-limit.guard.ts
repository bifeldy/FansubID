import { ExecutionContext, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Request } from 'express';

import { environment } from '../../environments/api/environment';

import { ApiKeyService } from '../repository/api-key.service';
import { GlobalService } from '../services/global.service';

@Injectable()
export class RateLimitGuard extends ThrottlerGuard {

  @Inject(ApiKeyService) private aks: ApiKeyService;
  @Inject(GlobalService) private gs: GlobalService;

  bypassRateLimitWhiteList = [
    environment.domain,
    environment.ip,
    '127.0.0.1',
    '::1',
    'localhost'
  ];

  override getTracker(req: Request): string {
    return this.aks.getOriginIp(req, true);
  }

  override async handleRequest(context: ExecutionContext, limit: number, ttl: number): Promise<boolean> {
    const http = context.switchToHttp();
    const ws = context.switchToWs();
    const req = http.getRequest<Request>();
    const client = ws.getClient();
    const origin = this.aks.getOriginIp(req) || client.conn.remoteAddress || '';
    if (this.bypassRateLimitWhiteList.includes(origin)) {
      return true;
    }
    const key = this.generateKey(context, origin);
    const ttls = await this.storageService.getRecord(key);
    this.gs.log('[RATE_LIMIT_GUARD-SESSION] ⌛', ttls);
    if (ttls.length >= limit) {
      throw new HttpException({
        info: '😡 429 - Rate Limit :: Kebanjiran Permintaan 😤',
        result: {
          message: '💩 Sabar Wheiy, Jangan Nge-SPAM 🤬',
        }
      }, HttpStatus.TOO_MANY_REQUESTS);
    }
    await this.storageService.addRecord(key, ttl);
    return true;
  }

}
