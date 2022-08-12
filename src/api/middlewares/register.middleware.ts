// NodeJS Library
import { URL } from 'node:url';

import { HttpException, HttpStatus, Injectable, NestMiddleware, Next, Req, Res } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Request, Response, NextFunction } from 'express';
import { Equal, ILike } from 'typeorm';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { ApiService } from '../services/api.service';
import { ConfigService } from '../services/config.service';
import { CryptoService } from '../services/crypto.service';
import { GlobalService } from '../services/global.service';

import { RegistrationService } from '../repository/registration.service';
import { UserService } from '../repository/user.service';

@Injectable()
export class RegisterMiddleware implements NestMiddleware {

  constructor(
    private sr: SchedulerRegistry,
    private api: ApiService,
    private cfg: ConfigService,
    private cs: CryptoService,
    private gs: GlobalService,
    private registrationRepo: RegistrationService,
    private userRepo: UserService
  ) {
    //
  }

  async use(@Req() req: Request, @Res({ passthrough: true }) res: Response, @Next() next: NextFunction): Promise<void | Response<any, Record<string, any>>> {
    try {
      if (!this.cfg.serverGetOpenForRegister()) {
        throw new HttpException({
          info: '😫 403 - Register API :: Tidak Ada Layanan 💩',
          result: {
            message: 'Pendaftaran Sedang Ditutup!'
          }
        }, HttpStatus.FORBIDDEN);
      } else if (
        'username' in req.body &&
        'name' in req.body &&
        'email' in req.body &&
        'password' in req.body &&
        'agree' in req.body && (req.body.agree === true) &&
        'g-recaptcha-response' in req.body
      ) {
        const url = new URL(environment.recaptchaApiUrl);
        url.searchParams.append('secret', environment.reCaptchaSecretKey);
        url.searchParams.append('response', req.body['g-recaptcha-response']);
        url.searchParams.append('remoteip', (req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').toString());
        const res_raw = await this.api.getData(url, environment.nodeJsXhrHeader, res.locals['abort-controller'].signal);
        if (res_raw.ok) {
          const res_json: any = await res_raw.json();
          this.gs.log(`[gCaptcha] 🎲 ${res_raw.status}`, res_json);
          const selectedRegistration = await this.registrationRepo.find({
            where: [
              { username: ILike(req.body.username) },
              { email: ILike(req.body.email) }
            ]
          });
          const selectedUser = await this.userRepo.find({
            where: [
              { username: ILike(req.body.username) },
              { email: ILike(req.body.email) }
            ]
          });
          const userNotAvailable = [...selectedRegistration, ...selectedUser];
          if (userNotAvailable.length === 0) {
            const result: any = {};
            req.body.username = req.body.username.replace(/\s/g, '').replace(/[^a-z0-9]/g, '');
            if (req.body.username.length < 8) {
              result.username = 'Nama Pengguna Minimal 8 Huruf';
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
            pengguna.username = req.body.username;
            pengguna.email = req.body.email;
            pengguna.password = this.cs.hashPassword(req.body.password);
            pengguna.nama = req.body.name;
            let penggunaSave = await this.registrationRepo.save(pengguna);
            const { password, activation_token, ...noPwdAcToken } = penggunaSave;
            pengguna.activation_token = this.cs.jwtEncrypt({ user: noPwdAcToken }, CONSTANTS.timeRegisterActivation);
            penggunaSave = await this.registrationRepo.save(pengguna);
            res.locals['registration'] = penggunaSave;
            this.sr.addTimeout(
              CONSTANTS.timeoutCancelRegisterKey,
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
            return next();
          } else {
            const result: any = {};
            for (const user of userNotAvailable) {
              if (user.username === req.body.username) {
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
