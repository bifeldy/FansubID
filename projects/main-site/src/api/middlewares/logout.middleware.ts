import { HttpException, HttpStatus, Injectable, NestMiddleware, Next, Req, Res } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { environment } from '../../environments/api/environment';

import { UserModel } from '../../models/req-res.model';

import { User } from '../entities/User';

import { GlobalService } from '../services/global.service';
import { SocketIoService } from '../services/socket-io.service';

import { UserService } from '../repository/user.service';

@Injectable()
export class LogoutMiddleware implements NestMiddleware {

  constructor(
    private gs: GlobalService,
    private sis: SocketIoService,
    private userRepo: UserService
  ) {
    //
  }

  async use(@Req() req: Request, @Res({ passthrough: true }) res: Response, @Next() next: NextFunction): Promise<void | Response<any, Record<string, any>>> {
    try {
      const user: UserModel = res.locals['user'];
      user.session_token = null;
      await this.userRepo.save(user as User);
      const socketId = (req.headers['x-socket-id'] || '').toString();
      if (socketId) {
        const socket = await this.sis.getClientSocket(socketId);
        if (socket) {
          await this.sis.disconnectRoom(socket);
        }
      }
      res.cookie(environment.tokenName, 'TOKEN_EXPIRED', {
        httpOnly: true,
        secure: environment.production,
        sameSite: 'strict',
        maxAge: 0,
        domain: environment.domain
      });
      next();
    } catch (error) {
      this.gs.log('[LOGOUT_MIDDLEWARE-ERROR] 🔪', error, 'error');
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: '🙄 401 - Authentication API :: Logout Gagal 😪',
        result: {
          message: 'Sesi Tidak Ditemukan!'
        }
      }, HttpStatus.UNAUTHORIZED);
    }
  }

}
