// NodeJS Library
import cluster from 'node:cluster';
import { URL } from 'node:url';

import { HttpException, HttpStatus, Injectable, NestMiddleware, Next, Req, Res } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Request, Response, NextFunction } from 'express';
import { Equal, ILike } from 'typeorm';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { ClusterMasterSlaveService } from '../services/cluster-master-slave.service';
import { ApiService } from '../services/api.service';
import { ConfigService } from '../services/config.service';
import { CryptoService } from '../services/crypto.service';
import { GlobalService } from '../services/global.service';

import { ApiKeyService } from '../repository/api-key.service';
import { RegistrationService } from '../repository/registration.service';
import { UserService } from '../repository/user.service';

@Injectable()
export class RegisterMiddleware implements NestMiddleware {

  constructor(
    private sr: SchedulerRegistry,
    private cms: ClusterMasterSlaveService,
    private aks: ApiKeyService,
    private api: ApiService,
    private cfg: ConfigService,
    private cs: CryptoService,
    private gs: GlobalService,
    private registrationRepo: RegistrationService,
    private userRepo: UserService
  ) {
    //
  }

  async cfgServerGetOpenForRegister(): Promise<boolean> {
    if (cluster.isMaster) {
      return this.cfg.serverGetOpenForRegister();
    } else {
      return await this.cms.sendMessageToMaster('CFG_SERVER_GET_OPEN_FOR_REGISTER', null);
    }
  }

  /** */

  async use(@Req() req: Request, @Res({ passthrough: true }) res: Response, @Next() next: NextFunction): Promise<void | Response<any, Record<string, any>>> {
    try {
      const st = '23:00:00';
      const et = '03:00:00';
      const freeTime = this.gs.isFreeTime(st, et);
      if (!(await this.cfgServerGetOpenForRegister()) || freeTime) {
        throw new HttpException({
          info: '😫 403 - Register API :: Tidak Ada Layanan 💩',
          result: {
            message: `Pendaftaran Sedang Ditutup!${freeTime ? ` (${st} ~ ${et} [JST/UTC+9])` : ''}`
          }
        }, HttpStatus.FORBIDDEN);
      } else if (
        'username' in req.body &&
        'name' in req.body &&
        'email' in req.body &&
        'password' in req.body &&
        'agree_tatib' in req.body && (req.body.agree_tatib === true) &&
        'agree_pp' in req.body && (req.body.agree_pp === true) &&
        'g-recaptcha-response' in req.body
      ) {
        const url = new URL(environment.reCaptcha.api_url);
        url.searchParams.append('secret', environment.reCaptcha.secret_key);
        url.searchParams.append('response', req.body['g-recaptcha-response']);
        url.searchParams.append('remoteip', this.aks.getOriginIpCc(req, true).origin_ip);
        const res_raw = await this.api.getData(url, environment.nodeJsXhrHeader);
        if (res_raw.ok) {
          const res_json: any = await res_raw.json();
          this.gs.log(`[gCaptcha] 🎲 ${res_raw.status}`, res_json);
          const usrName = req.body.username.replace(/\s/g, '').replace(/[^a-z0-9]/g, '').toLowerCase();
          const selectedRegistration = await this.registrationRepo.find({
            where: [
              { username: ILike(usrName) },
              { email: ILike(req.body.email) }
            ],
            withDeleted: true
          });
          const selectedUser = await this.userRepo.find({
            where: [
              { username: ILike(usrName) },
              { email: ILike(req.body.email) }
            ],
            withDeleted: true
          });
          const userNotAvailable = [...selectedRegistration, ...selectedUser];
          if (userNotAvailable.length === 0) {
            if (CONSTANTS.blacklistedWords.includes(usrName)) {
              throw new HttpException({
                info: '🙄 400 - Authentication API :: Pendaftaran Gagal 😪',
                result: {
                  message: `'${usrName}' Tidak Dapat Digunakan`
                }
              }, HttpStatus.BAD_REQUEST);
            }
            const result: any = {};
            if (usrName.length < 6) {
              result.username = 'Nama Pengguna Minimal 6 Huruf';
            }
            if (!req.body.email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) {
              result.email = 'Email Tidak Valid';
            }
            if (Object.keys(result).length > 0) {
              result.message = 'Akun Tidak Dapat Digunakan!';
              throw new HttpException({
                info: '🙄 400 - Authentication API :: Pendaftaran Gagal 😪',
                result
              }, HttpStatus.BAD_REQUEST);
            }
            const pengguna = this.registrationRepo.new();
            pengguna.username = usrName;
            pengguna.email = req.body.email;
            pengguna.password = this.cs.hashPassword(req.body.password);
            pengguna.nama = req.body.name;
            let penggunaSave = await this.registrationRepo.save(pengguna);
            const { password, activation_token, ...noPwdAcToken } = penggunaSave;
            penggunaSave.activation_token = this.cs.credentialEncode(
              {
                user: noPwdAcToken
              },
              false,
              CONSTANTS.timeoutCancelRegisterTime
            );
            penggunaSave = await this.registrationRepo.save(penggunaSave);
            res.locals['registration'] = penggunaSave;
            this.sr.addTimeout(
              `${CONSTANTS.timeoutCancelRegisterKey}-${Date.now()}`,
              setTimeout(async () => {
                try {
                  const registrationToBeDeleted = await this.registrationRepo.findOneOrFail({
                    where: [
                      { id: Equal(penggunaSave.id), activation_token: Equal(penggunaSave.activation_token) }
                    ]
                  });
                  await this.registrationRepo.remove(registrationToBeDeleted);
                } catch (err) {
                  this.gs.log('[REGISTER_MIDDLEWARE-ERROR] 🎃', err, 'error');
                }
              }, CONSTANTS.timeoutCancelRegisterTime)
            );
            next();
          } else {
            const result: any = {};
            for (const user of userNotAvailable) {
              if (user.username === usrName) {
                result.username = `${user.username} Sudah Terpakai`;
              }
              if (user.email === req.body.email) {
                result.email = `${user.email} Sudah Terpakai`;
              }
            }
            throw new HttpException({
              info: '🙄 400 - Authentication API :: Pendaftaran Gagal 😪',
              result
            }, HttpStatus.BAD_REQUEST);
          }
        } else {
          throw new HttpException({
            info: `🙄 ${res_raw.status || 400} - Google API :: Captcha Bermasalah 😪`,
            result: {
              message: 'Captcha Salah / Expired / Google API Down!'
            }
          }, res_raw.status || HttpStatus.BAD_REQUEST);
        }
      } else {
        throw new Error('Data Tidak Lengkap!');
      }
    } catch (error) {
      this.gs.log('[REGISTER_MIDDLEWARE-ERROR] 🎃', error, 'error');
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: '🙄 400 - Authentication API :: Pendaftaran Gagal 😪',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
