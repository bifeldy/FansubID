import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';

import { CONSTANTS } from '../../constants';

import { UserModel } from '../../models/req-res.model';

import { GlobalService } from '../services/global.service';

@Injectable()
export class VerifiedGuard implements CanActivate {

  constructor(
    private reflector: Reflector,
    private gs: GlobalService
  ) {
    //
  }

  canActivate(context: ExecutionContext): boolean {
    const verifiedOnly = this.reflector.get<boolean>(CONSTANTS.decoratorVerifiedOnly, context.getHandler());
    if (!verifiedOnly) {
      return true;
    }
    const http = context.switchToHttp();
    const res = http.getResponse<Response>();
    const user: UserModel = res.locals['user'];
    if (user) {
      this.gs.log('[VERIFIED_GUARD-USER] ✅', user);
      if (user.verified) {
        return true;
      }
      throw new HttpException({
        info: '😡 418 - Authorization :: Whoops, Akses Ditolak 😤',
        result: {
          message: `💩 Khusus Pengguna Terverifikasi! 🤬`
        }
      }, HttpStatus.I_AM_A_TEAPOT);
    }
    throw new HttpException({
      info: '😡 401 - Authorization :: Whoops, Akses Ditolak 😤',
      result: res.locals['error']
    }, HttpStatus.UNAUTHORIZED);
  }
}
