import { Controller, Get, HttpCode, HttpException, HttpStatus, Post, Redirect, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { environment } from '../../environments/api/environment';

import { FilterApiKeyAccess } from '../decorators/filter-api-key-access.decorator';

import { RegistrationModel } from '../../models/req-res.model';

import { AuthService } from '../services/auth.service';
import { CryptoService } from '../services/crypto.service';
import { DiscordService } from '../services/discord.service';
import { MailService } from '../services/mail.service';

@ApiExcludeController()
@Controller('/aktivasi')
export class AktivasiController {

  constructor(
    private as: AuthService,
    private cs: CryptoService,
    private ds: DiscordService,
    private ms: MailService
  ) {
    //
  }

  @Get('/')
  @HttpCode(301)
  @Redirect()
  @FilterApiKeyAccess()
  async activateAccount(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const userActivated = await this.as.activateAccount(res.locals['token'] as string);
    if (userActivated) {
      res.cookie(environment.tokenName, userActivated.session_token, {
        httpOnly: true,
        secure: environment.production,
        sameSite: 'strict',
        expires: new Date(this.cs.jwtView(userActivated.session_token).exp * 1000),
        domain: environment.domain
      });
      this.ds.sendNews(
        this.ds.createEmbedMessage(
          '#0099ff',
          userActivated.kartu_tanda_penduduk_.nama,
          `${environment.baseUrl}/user/${userActivated.username}`,
          {
            name: `${environment.siteName} - Pendaftaran Pengguna Baru`,
            iconURL: `${environment.baseUrl}/assets/img/favicon.png`,
            url: environment.baseUrl
          },
          userActivated.profile_.description,
          userActivated.image_url,
          userActivated.updated_at,
          {
            text: userActivated.username,
            iconURL: userActivated.image_url
          }
        )
      );
    }
    return {
      url: userActivated ? '/login' : '/register',
      statusCode: 301
    };
  }

  @Post('/')
  @HttpCode(201)
  @FilterApiKeyAccess()
  async reSendActivation(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const registration: RegistrationModel = await this.as.reSendActivation(req.body);
    if (registration) {
      this.ms.sendRegisterActivationMail(registration);
      return {
        info: '😚 201 - Register API :: Berhasil Kirim Ulang Aktivasi 🤩',
        result: {
          id: registration.id,
          title: 'Pengiriman Ulang Aktivasi',
          message: `
            Silahkan Periksa Kembali Email Anda. <br />
            '<span class="text-danger">${registration.email}</span>' <br />
            .: ${registration.id} :.
          `
        }
      };
    }
    throw new HttpException({
      info: '🤔 406 - Register API :: Data Pendaftaran Tidak Ada 😷',
      result: {
        message: 'Silahkan Coba Daftar Kembali!'
      }
    }, HttpStatus.NOT_ACCEPTABLE);
  }

}
