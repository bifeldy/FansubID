import { Controller, HttpCode, HttpException, HttpStatus, Patch, Req, Res } from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { CONSTANTS } from '../../constants';

import { JsonResponse, UserModel } from '../../models/req-res.model';

import { environment } from '../../environments/api/environment';

import { CryptoService } from '../services/crypto.service';

@Controller('/verify')
export class VerifyController {

  constructor(
    private cs: CryptoService
  ) {
    //
  }

  @Patch('/')
  @HttpCode(202)
  @ApiTags(CONSTANTS.apiTagAuthSes)
  @ApiQuery({ name: 'token', required: false, type: 'string' })
  @ApiBody({
    schema: {
      properties: {
        token: { type: 'string' }
      },
      required: ['token']
    }
  })
  verify(@Req() req: Request, @Res({ passthrough: true }) res: Response): JsonResponse {
    const user: UserModel = res.locals['user'];
    const token: string = res.locals['token'];
    if (user) {
      res.cookie(environment.tokenName, token, {
        httpOnly: true,
        secure: environment.production,
        sameSite: 'strict',
        expires: new Date(this.cs.jwtView(token).exp * 1000),
        domain: environment.domain
      });
      (user as any).__email = (user as any)._email;
      delete user.email;
      delete user.password;
      delete user.session_token;
      delete user.kartu_tanda_penduduk_.id;
      delete user.kartu_tanda_penduduk_.created_at;
      delete user.kartu_tanda_penduduk_.updated_at;
      delete user.profile_.id;
      delete user.profile_.created_at;
      delete user.profile_.updated_at;
      return {
        info: '😍 202 - Verifikasi API :: Token Selesai Di Verifikasi UwUu 🥰',
        result: user,
        token
      };
    }
    if (token) {
      throw new HttpException({
        info: '🙄 401 - Verifikasi API :: Authorisasi Sesi Gagal 😪',
        result: {
          message: 'Akses Token Ditolak!'
        }
      }, HttpStatus.UNAUTHORIZED);
    }
    throw new HttpException({
      info: '🤧 400 - Verifikasi API :: JWT Token Tidak Ada 😷',
      result: {
        message: 'Data Tidak Lengkap!'
      }
    }, HttpStatus.BAD_REQUEST);
  }

}
