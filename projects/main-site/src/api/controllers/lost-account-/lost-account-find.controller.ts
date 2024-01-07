import { Controller, HttpCode, HttpException, HttpStatus, Req, Res, Post } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { ILike } from 'typeorm';
import { Request, Response } from 'express';

import { CONSTANTS } from '../../../constants';

import { environment } from '../../../environments/api/environment';

import { FilterApiKeyAccess } from '../../decorators/filter-api-key-access.decorator';

import { ApiKeyService } from '../../repository/api-key.service';
import { UserService } from '../../repository/user.service';

import { MailService } from '../../services/mail.service';
import { GlobalService } from '../../services/global.service';
import { ApiService } from '../../services/api.service';
import { CryptoService } from '../../services/crypto.service';

@ApiExcludeController()
@Controller('/lost-account-find')
export class LostAccountFindController {

  constructor(
    private cs: CryptoService,
    private aks: ApiKeyService,
    private api: ApiService,
    private gs: GlobalService,
    private ms: MailService,
    private userRepo: UserService
  ) {
    //
  }

  @Post('/')
  @HttpCode(201)
  @FilterApiKeyAccess()
  async find(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if ('userNameOrEmail' in req.body && 'g-recaptcha-response' in req.body ) {
        const url = new URL(environment.reCaptcha.api_url);
        url.searchParams.append('secret', environment.reCaptcha.secret_key);
        url.searchParams.append('response', req.body['g-recaptcha-response']);
        url.searchParams.append('remoteip', this.aks.getOriginIpCc(req, true).origin_ip);
        const res_raw = await this.api.getData(url, environment.nodeJsXhrHeader);
        if (res_raw.ok) {
          const res_json: any = await res_raw.json();
          this.gs.log(`[gCaptcha] 🎲 ${res_raw.status}`, res_json);
          const selectedUser = await this.userRepo.findOneOrFail({
            where: [
              { username: ILike(req.body.userNameOrEmail) },
              { email: ILike(req.body.userNameOrEmail) }
            ],
            relations: ['kartu_tanda_penduduk_']
          });
          const { password, session_token, session_origin, ...noPwdSes } = selectedUser;
          if ('kartu_tanda_penduduk_' in noPwdSes && noPwdSes.kartu_tanda_penduduk_) {
            delete noPwdSes.kartu_tanda_penduduk_.created_at;
            delete noPwdSes.kartu_tanda_penduduk_.updated_at;
          }
          const resetToken = this.cs.credentialEncode({
            user: {
              username: noPwdSes.username,
              email: noPwdSes.email,
              nama: noPwdSes.kartu_tanda_penduduk_.nama,
              id: noPwdSes.id,
              created_at: noPwdSes.created_at,
              updated_at: noPwdSes.updated_at
            }
          }, null, CONSTANTS.timeResetAccount);
          this.ms.sendResetAccountMail(selectedUser, resetToken);
          return {
            info: `😅 201 - Lost Account API :: Akun Tersedia 🤣`,
            result: {
              title: `Reset Akun :: ${selectedUser.username}`,
              message: `
                Silahkan Periksa Email Untuk Mengatur Ulang Akun. <br />
                Informasi Sudah Dikirimkan Ke '<span class="text-danger">${selectedUser.email}</span>'. <br />
                Gunakan Data Tersebut Untuk Melengkapi Formulir Pengubahan Kata Sandi. <br />
                Informasi Tersebut Hanya berlaku selama ${CONSTANTS.timeResetAccount / 60} menit.
              `
            }
          };
        }
        throw new HttpException({
          info: `🙄 ${res_raw.status || 400} - Google API :: Captcha Bermasalah 😪`,
          result: {
            message: 'Captcha Salah / Expired / Google API Down!'
          }
        }, res_raw.status || HttpStatus.BAD_REQUEST);
      }
      throw new Error('Akun Tidak Ditemukan!');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: '🙄 400 - Lost Account API :: Pencarian Gagal 😪',
        result: {
          message: 'Akun Tidak Ditemukan!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
