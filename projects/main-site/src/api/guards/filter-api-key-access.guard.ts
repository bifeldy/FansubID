import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';
import { Equal, In, IsNull } from 'typeorm';

import { CONSTANTS } from '../../constants';
import { RoleModel } from '../../models/req-res.model';

import { ApiKeyService } from '../repository/api-key.service';

import { GlobalService } from '../services/global.service';

@Injectable()
export class FilterApiKeyAccessGuard implements CanActivate {

  constructor(
    private reflector: Reflector,
    private gs: GlobalService,
    private aks: ApiKeyService
  ) {
    //
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.reflector.get<boolean>(CONSTANTS.decoratorFilterApiKeyAccess, context.getHandler())) {
      const http = context.switchToHttp();
      const res = http.getResponse<Response>();
      const apiKey = res.locals['key'];
      if (apiKey) {
        this.gs.log('[FILTER_API_KEY_ACCESS_GUARD-API_KEY] ✅', apiKey);
        try {
          const apiKeySystemCount = await this.aks.count({
            where: [
              {
                api_key: Equal(apiKey),
                user_: IsNull()
              },
              {
                api_key: Equal(apiKey),
                user_: {
                  role: In([RoleModel.ADMIN, RoleModel.MODERATOR])
                }
              }
            ],
            relations: ['user_']
          });
          if (apiKeySystemCount <= 0) {
            throw new Error('API-Key Tidak Memiliki Hak Akses!');
          }
        } catch (error) {
          throw new HttpException({
            info: '😡 418 - Cek Kunci :: Whoops, Akses Ditolak 😤',
            result: {
              message: 'API-Key Tidak Memiliki Hak Akses!'
            }
          }, HttpStatus.I_AM_A_TEAPOT);
        }
      }
    }
    return true;
  }
}
