import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';

import { CONSTANTS } from '../../constants';

import { RoleModel, UserModel } from '../../models/req-res.model';

import { GlobalService } from '../services/global.service';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private reflector: Reflector,
    private gs: GlobalService
  ) {
    //
  }

  canActivate(context: ExecutionContext): boolean  {
    const requiredRoles = this.reflector.getAllAndOverride<RoleModel[]>(CONSTANTS.decoratorRoles, [context.getHandler(), context.getClass()]);
    if (!requiredRoles) {
      return true;
    }
    const http = context.switchToHttp();
    const res = http.getResponse<Response>();
    const user: UserModel = res.locals['user'];
    if (user) {
      this.gs.log('[ROLES_GUARD-USER] 🧨', user);
      const isAllowed = requiredRoles.includes(user.role);
      if (isAllowed) {
        return true;
      }
      throw new HttpException({
        info: '😡 403 - Authorization :: Whoops, Akses Ditolak 😤',
        result: {
          message: `Membutuhkan Hak ${requiredRoles.join(', ')}`
        }
      }, HttpStatus.FORBIDDEN);
    }
    throw new HttpException({
      info: '😡 401 - Authorization :: Whoops, Akses Ditolak 😤',
      result: {
        message: 'Silahkan Login Terlebih Dahulu!'
      }
    }, HttpStatus.UNAUTHORIZED);
  }

}
