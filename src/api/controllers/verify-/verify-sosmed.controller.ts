// NodeJS Library
import { URL, URLSearchParams } from 'node:url';

import { Controller, HttpCode, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Equal } from 'typeorm';
import { Request, Response } from 'express';

import { CONSTANTS } from '../../../constants';

import { environment } from '../../../environments/api/environment';

import { RoleModel, SosMedModel, UserModel } from '../../../models/req-res.model';

import { FilterApiKeyAccess } from '../../decorators/filter-api-key-access.decorator';
import { Roles } from '../../decorators/roles.decorator';

import { User } from '../../entities/User';

import { UserService } from '../../repository/user.service';
import { SocialMediaService } from '../../repository/social-media.service';

import { ApiService } from '../../services/api.service';
import { CryptoService } from '../../services/crypto.service';
import { GlobalService } from '../../services/global.service';

@ApiExcludeController()
@Controller('/verify-sosmed')
export class VerifySosmedController {

  constructor(
    private api: ApiService,
    private cs: CryptoService,
    private gs: GlobalService,
    private sosmedRepo: SocialMediaService,
    private userRepo: UserService
  ) {
    //
  }

  @Post('/')
  @HttpCode(201)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  @FilterApiKeyAccess()
  async verifySosmed(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const user: UserModel = res.locals['user'];
      if (user.verified) {
        return {
          info: `😅 201 - Verifikasi API :: User Telah Diverifikasi 🤣`,
          result: {
            title: 'Akun Telah Diverifikasi!',
            message: 'Whoops! Yeay~'
          }
        };
      } else if ('app' in req.body && 'code' in req.body) {
        if (req.body.app === SosMedModel.DISCORD) {
          const url = new URL(`${environment.discordApiUrl}/oauth2/token`);
          const form = new URLSearchParams();
          form.append('client_id', environment.discordClientId);
          form.append('client_secret', environment.discordClientSecret);
          form.append('grant_type', 'authorization_code');
          form.append('code', req.body.code);
          form.append('redirect_uri', `${environment.baseUrl}/verify?app=discord`);
          form.append('scope', 'identify email guilds.join');
          const res_raw1 = await this.api.postData(url, form, environment.nodeJsXhrHeader);
          if (res_raw1.ok) {
            const res_json1: any = await res_raw1.json();
            this.gs.log(`[oAuthDiscord] 🗝 ${res_raw1.status}`, res_json1);
            const url = new URL(`${environment.discordApiUrl}/users/@me`);
            const res_raw2 = await this.api.getData(url, {
              Authorization: `Bearer ${res_json1.access_token}`,
              ...environment.nodeJsXhrHeader
            });
            if (res_raw2.ok) {
              const res_json2: any = await res_raw2.json();
              this.gs.log(`[apiDiscord] 🗝 ${res_raw2.status}`, res_json2);
              try {
                const sosmeds = await this.sosmedRepo.find({
                  where: [
                    {
                      type: SosMedModel.DISCORD,
                      user_: {
                        id: Equal(user.id)
                      }
                    }
                  ],
                  relations: ['user_']
                });
                if (sosmeds.length === 0) {
                  const sosmed = this.sosmedRepo.new();
                  sosmed.id = res_json2.id;
                  sosmed.refresh_token = res_json1.refresh_token;
                  sosmed.type = SosMedModel.DISCORD;
                  sosmed.user_ = user;
                  await this.sosmedRepo.insert(sosmed);
                } else if (sosmeds.length === 1) {
                  await this.sosmedRepo.update({
                    type: SosMedModel.DISCORD,
                    user_: {
                      id: Equal(user.id)
                    }
                  }, {
                    id: res_json2.id,
                    refresh_token: res_json1.refresh_token
                  });
                } else {
                  throw new Error('Data Duplikat');
                }
                user.discord = res_json2.id;
                const resUserSave = await this.userRepo.save(user as User);
                return {
                  info: `😅 201 - Discord API :: Masuk & Verify 🤣`,
                  result: {
                    title: `Kirim Token Ke ${environment.siteName} Discord BOT Dalam ${CONSTANTS.timeJwtEncryption / 60} Menit! #🚮-bot-spam`,
                    message: '~verify DISCORD ' + this.cs.jwtEncrypt({
                      discord: {
                        id: res_json2.id,
                        username: res_json2.username,
                        discriminator: res_json2.discriminator,
                        verified: res_json2.verified
                      },
                      user: {
                        id: resUserSave.id,
                        username: resUserSave.username,
                        verified: resUserSave.verified
                      }
                    }) + ' DELETE_CHAT'
                  }
                };
              } catch (err) {
                throw new HttpException({
                  info: `🙄 400 - Discord API :: Gagal Masuk 😪`,
                  result: {
                    title: 'Akun Telah Digunakan!',
                    message: 'Silahkan Ulangi Langkah Sebelumnya Atau Coba Dengan Akun Yang Lain!'
                  }
                }, HttpStatus.BAD_REQUEST);
              }
            } else {
              throw new HttpException({
                info: `🙄 ${res_raw2.status || 400} - Discord API :: Gagal Verify 😪`,
                result: {
                  message: 'Kode oAuth Salah / Expired!'
                }
              }, res_raw2.status || HttpStatus.BAD_REQUEST);
            }
          } else {
            throw new HttpException({
              info: `🙄 ${res_raw1.status || 400} - Discord API :: Gagal Masuk 😪`,
              result: {
                message: 'Kode Token Salah / Tidak Valid!'
              }
            }, res_raw1.status || HttpStatus.BAD_REQUEST);
          }
        }
        // TODO :: Other Social Media Platform
      }
      throw new Error('Data Tidak Lengkap!');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: '🙄 400 - Social Media :: Verifikasi Gagal! 😪',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
