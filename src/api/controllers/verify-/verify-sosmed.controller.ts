// 3rd Party Library
import { google } from 'googleapis';

// NodeJS Library
import { URL, URLSearchParams } from 'node:url';

import { Controller, Get, HttpCode, HttpException, HttpStatus, Post, Redirect, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Equal, Not } from 'typeorm';
import { Request, Response } from 'express';

import { CONSTANTS } from '../../../constants';

import { environment } from '../../../environments/api/environment';

import { RoleModel, SosMedModel, UserModel } from '../../../models/req-res.model';

import { FilterApiKeyAccess } from '../../decorators/filter-api-key-access.decorator';
import { Roles } from '../../decorators/roles.decorator';

import { SocialMediaService } from '../../repository/social-media.service';

import { ApiService } from '../../services/api.service';
import { CryptoService } from '../../services/crypto.service';
import { GlobalService } from '../../services/global.service';
import { MailService } from '../../services/mail.service';
import { AuthService } from '../../services/auth.service';
import { DiscordService } from '../../services/discord.service';

@ApiExcludeController()
@Controller('/verify-sosmed')
export class VerifySosmedController {

  constructor(
    private api: ApiService,
    private as: AuthService,
    private cs: CryptoService,
    private gs: GlobalService,
    private sosmedRepo: SocialMediaService,
    private ms: MailService,
    private ds: DiscordService
  ) {
    //
  }

  async insertOrUpdate(sosMedModel: SosMedModel, user: UserModel, sosmedId: string, refreshToken: string): Promise<any> {
    try {
      const count = await this.sosmedRepo.count({
        where: [
          {
            id: Equal(sosmedId),
            type: sosMedModel,
            user_: {
              id: Not(Equal(user.id))
            }
          }
        ],
        relations: ['user_']
      });
      if (count > 0) {
        throw 'Akun Telah Digunakan!';
      }
      const sosmeds = await this.sosmedRepo.find({
        where: [
          {
            type: sosMedModel,
            user_: {
              id: Equal(user.id)
            }
          }
        ],
        relations: ['user_']
      });
      if (sosmeds.length === 0) {
        const sosmed = this.sosmedRepo.new();
        sosmed.id = sosmedId;
        sosmed.refresh_token = refreshToken;
        sosmed.type = sosMedModel;
        sosmed.user_ = user;
        await this.sosmedRepo.insert(sosmed);
      } else if (sosmeds.length === 1) {
        await this.sosmedRepo.update({
          type: sosMedModel,
          user_: {
            id: Equal(user.id)
          }
        }, {
          id: sosmedId,
          refresh_token: refreshToken
        });
      } else {
        throw 'Akun Telah Digunakan!';
      }
    } catch (error) {
      throw new HttpException({
        info: '🙄 400 - Social Media :: Verifikasi Gagal! 😪',
        result: {
          title: 'Akun Telah Digunakan!',
          message: 'Silahkan Ulangi Langkah Sebelumnya Atau Coba Dengan Akun Yang Lain!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async discordApp(req: Request, user: UserModel): Promise<any> {
    const url1 = new URL(`${environment.discord.api_uri}/oauth2/token`);
    const form = new URLSearchParams();
    form.append('client_id', environment.discord.client_id);
    form.append('client_secret', environment.discord.client_secret);
    form.append('grant_type', 'authorization_code');
    form.append('code', req.body.code);
    form.append('redirect_uri', `${environment.baseUrl}/verify?app=discord`);
    const res_raw1 = await this.api.postData(url1, form, environment.nodeJsXhrHeader);
    if (res_raw1.ok) {
      const res_json1: any = await res_raw1.json();
      this.gs.log(`[oAuthDiscord] 🗝 ${res_raw1.status}`, res_json1);
      const url2 = new URL(`${environment.discord.api_uri}/users/@me`);
      const res_raw2 = await this.api.getData(url2, {
        Authorization: `Bearer ${res_json1.access_token}`,
        ...environment.nodeJsXhrHeader
      });
      if (res_raw2.ok) {
        const res_json2: any = await res_raw2.json();
        this.gs.log(`[apiDiscord] 🗝 ${res_raw2.status}`, res_json2);
        if (!res_json2.verified) {
          throw new HttpException({
            info: `🙄 400 - Discord API :: Gagal Verify 😪`,
            result: {
              title: 'Akun Discord Belum Terverifikasi!',
              message: 'Silahkan Verifikasi Akun Discord Terlebih Dahulu!'
            }
          }, HttpStatus.BAD_REQUEST);
        }
        const url3 = new URL(`${environment.discord.api_uri}/guilds/${environment.discord.guild_id}/members/${res_json2.id}`);
        const res_raw3 = await this.api.putData(
          url3,
          JSON.stringify({
            access_token: `${res_json1.token_type} ${res_json1.access_token}`
          }),
          {
            Authorization: `Bot ${environment.discord.loginToken}`,
            ...environment.nodeJsXhrHeader
          }
        );
        if (res_raw3.ok) {
          const res_json3: any = await res_raw3.json();
          this.gs.log(`[apiDiscord] 🗝 ${res_raw3.status}`, res_json3);
        } else {
          const res_text3: any = await res_raw3.text();
          this.gs.log(`[apiDiscord] 🗝 ${res_raw3.status}`, res_text3, 'error');
        }
        await this.insertOrUpdate(SosMedModel.DISCORD, user, res_json2.id, res_json1.refresh_token);
        return {
          info: `😅 201 - Discord API :: Masuk & Verify 🤣`,
          result: {
            title: `Kirim Token Ke ${environment.siteName} Discord BOT Dalam ${CONSTANTS.timeJwtEncryption / 60} Menit! #🚮-bot-spam`,
            message: '~verify DISCORD ' + this.cs.credentialEncode(
              {
                discord: {
                  id: res_json2.id,
                  email: res_json2.email,
                  verified: res_json2.verified
                },
                user: {
                  id: user.id,
                  username: user.username,
                  verified: user.verified
                }
              },
              false,
              CONSTANTS.timeJwtEncryption
            ) + ' DELETE_CHAT'
          }
        };
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

  async googleApp(req: Request, user: UserModel): Promise<any> {
    const oauth2Client = new google.auth.OAuth2({
      clientId: environment.gCloudPlatform.app.client_id,
      clientSecret: environment.gCloudPlatform.app.client_secret,
      redirectUri: `${environment.baseUrl}/verify?app=google`
    });
    const { tokens } = await oauth2Client.getToken(req.body.code);
    const url = new URL(environment.gCloudPlatform.app.profile_uri);
    url.searchParams.append('alt', 'json');
    url.searchParams.append('access_token', tokens.access_token);
    const res_raw = await this.api.getData(url, environment.nodeJsXhrHeader);
    if (res_raw.ok) {
      const res_json: any = await res_raw.json();
      this.gs.log(`[oAuthGoogle] 🗝 ${res_raw.status}`, res_json);
      if (!res_json.verified_email) {
        throw new HttpException({
          info: `🙄 400 - Google API :: Gagal Verify 😪`,
          result: {
            title: 'Akun Google Belum Terverifikasi!',
            message: 'Silahkan Verifikasi Akun Google Terlebih Dahulu!'
          }
        }, HttpStatus.BAD_REQUEST);
      }
      await this.insertOrUpdate(SosMedModel.GOOGLE, user, res_json.id, tokens.refresh_token);
      this.ms.sendVerifikasiMail(
        {
          nama: user.kartu_tanda_penduduk_.nama,
          email: res_json.email,
          username: user.username,
        },
        this.cs.credentialEncode(
          {
            google: {
              id: res_json.id,
              email: res_json.email,
              verified: res_json.verified_email
            },
            user: {
              id: user.id,
              username: user.username,
              verified: user.verified
            }
          },
          false,
          CONSTANTS.timeJwtEncryption
        )
      );
      return {
        info: `😅 201 - Google API :: Masuk & Verify 🤣`,
        result: {
          title: 'Verifikasi Akun',
          message: `
            Silahkan Periksa Email Untuk Menyelesaikan Verifikasi. <br />
            Petunjuk Sudah Dikirimkan Ke '<span class="text-danger">${res_json.email}</span>'. <br />
            Hanya berlaku selama ${CONSTANTS.timeJwtEncryption / 60} menit.
          `
        }
      };
    } else {
      throw new HttpException({
        info: `🙄 ${res_raw.status || 400} - Google API :: Gagal Masuk 😪`,
        result: {
          message: 'Kode Token Salah / Tidak Valid!'
        }
      }, res_raw.status || HttpStatus.BAD_REQUEST);
    }
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
          return this.discordApp(req, user);
        } else if (req.body.app === SosMedModel.GOOGLE) {
          return this.googleApp(req, user);
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

  @Get('/')
  @HttpCode(301)
  @Redirect()
  @FilterApiKeyAccess()
  async verifyAccount(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const token = req.query['token'] || '';
    if (token) {
      const userVerified = await this.as.verifySosmedAccount(token as string, SosMedModel.GOOGLE);
      if (userVerified) {
        res.cookie(environment.tokenName, userVerified.session_token, {
          httpOnly: true,
          secure: environment.production,
          sameSite: 'strict',
          expires: new Date(this.cs.jwtView(userVerified.session_token).exp * 1000),
          domain: environment.domain
        });
        this.ds.sendNews(
          this.ds.createEmbedMessage(
            '#69f0ae',
            userVerified.kartu_tanda_penduduk_.nama,
            `${environment.baseUrl}/user/${userVerified.username}`,
            {
              name: `${environment.siteName} - Verifikasi Pengguna`,
              iconURL: `${environment.baseUrl}/assets/img/favicon.png`,
              url: environment.baseUrl
            },
            userVerified.profile_.description,
            userVerified.image_url,
            userVerified.updated_at,
            {
              text: userVerified.username,
              iconURL: userVerified.image_url
            }
          )
        );
      }
    }
    return {
      url: '/verify',
      statusCode: 301
    };
  }

}
