// NodeJS Library
import { URL, URLSearchParams } from 'node:url';

import { Controller, HttpCode, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { environment } from '../../../environments/api/environment';

import { RoleModel } from '../../../models/req-res.model';

import { Roles } from '../../decorators/roles.decorator';

import { ApiKeyService } from '../../repository/api-key.service';
import { ApiService } from '../../services/api.service';
import { GlobalService } from '../../services/global.service';

@Controller('/verify-nik')
export class VerifyNikController {

  constructor(
    private aks: ApiKeyService,
    private api: ApiService,
    private gs: GlobalService
  ) {
    //
  }

  @Post('/')
  @HttpCode(201)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  async verifyNik(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if ('nik' in req.body && 'nama' in req.body && 'g-recaptcha-response' in req.body) {
        const url = new URL(environment.recaptchaApiUrl);
        url.searchParams.append('secret', environment.reCaptchaSecretKey);
        url.searchParams.append('response', req.body['g-recaptcha-response']);
        url.searchParams.append('remoteip', this.aks.getOriginIpCc(req, true).origin_ip);
        const res_raw1 = await this.api.getData(url, environment.nodeJsXhrHeader);
        if (res_raw1.ok) {
          const res_json1: any = await res_raw1.json();
          this.gs.log(`[gCaptcha] 🎲 ${res_raw1.status}`, res_json1);
          const url = new URL(environment.apiPemerintahKTPUrl);
          const form = new URLSearchParams();
          form.append('nik', req.body.nik);
          form.append('nama', req.body.nama);
          form.append('ck_kpu', environment.apiPemerintahKTPSecretKey);
          const res_raw2 = await this.api.postData(url, form, environment.nodeJsXhrHeader);
          if (res_raw2.ok) {
            const res_json2: any = await res_raw2.json();
            this.gs.log(`[apiKTP] 🆔 ${res_raw2.status}`, res_json2);
            if ('data' in res_json2 && res_json2.data) {
              delete res_json2.data.tps;
            }
            return {
              info: `😍 201 - KTP API :: Data Kartu Tanda Penduduk 🥰`,
              result: res_json2
            };
          }
          throw new HttpException({
            info: `🙄 ${res_raw2.status || 400} - KTP API :: API Pemerintah Error 😪`,
            result: {
              message: 'Kayaknya Sudah Di Fix Deh Kebocoran Datanya?'
            }
          }, res_raw2.status || HttpStatus.BAD_REQUEST);
        }
        throw new HttpException({
          info: `🙄 ${res_raw1.status || 400} - Google API :: Captcha Bermasalah 😪`,
          result: {
            message: 'Captcha Salah / Expired / Google API Down!'
          }
        }, res_raw1.status || HttpStatus.BAD_REQUEST);
      }
      throw new Error('Data Tidak Lengkap!');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: '🙄 400 - KTP API :: Cek NIK Gagal 😪',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
