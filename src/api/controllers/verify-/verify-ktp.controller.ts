import { Controller, HttpCode, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { In, Equal } from 'typeorm';
import { Request, Response } from 'express';

import { environment } from '../../../environments/api/environment';

import { RoleModel, UserModel } from '../../../models/req-res.model';

import { Roles } from '../../decorators/roles.decorator';

import { User } from '../../entities/User';

import { CryptoService } from '../../services/crypto.service';
import { KartuTandaPendudukService } from '../../repository/kartu-tanda-penduduk.service';
import { UserService } from '../../repository/user.service';

@Controller('/verify-ktp')
export class VerifyKtpController {

  constructor(
    private cs: CryptoService,
    private ktpRepo: KartuTandaPendudukService,
    private userRepo: UserService
  ) {
    //
  }

  @Post('/')
  @HttpCode(201)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  async verifyKtp(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      let user: UserModel = res.locals['user'];
      if (user.verified) {
        return {
          info: `😅 201 - Verifikasi API :: User Telah Diverifikasi 🤣`,
          result: {
            message: 'User Telah Diverifikasi!'
          }
        };
      } else if (
        'nik' in req.body && 'nama' in req.body && 'tempat_lahir' in req.body &&
        'jenis_kelamin' in req.body && 'kecamatan' in req.body && 'kelurahan_desa' in req.body
      ) {
        const ktps = await this.ktpRepo.find({
          where: [
            { nik: In([req.body.nik]) }
          ]
        });
        if (ktps.length > 0) {
          throw new HttpException({
            info: '🙄 400 - Verifikasi API :: Verifikasi Gagal 😪',
            result: {
              message: 'NIK Telah Digunakan!'
            }
          }, HttpStatus.BAD_REQUEST);
        } else {
          const ktp = await this.ktpRepo.findOneOrFail({
            where: [
              { id: Equal(user.kartu_tanda_penduduk_.id) }
            ]
          });
          ktp.nik = req.body.nik;
          ktp.nama = req.body.nama;
          ktp.tempat_lahir = req.body.tempat_lahir;
          ktp.jenis_kelamin = req.body.jenis_kelamin;
          ktp.kecamatan = req.body.kecamatan;
          ktp.kelurahan_desa = req.body.kelurahan_desa;
          const resKtpSave = await this.ktpRepo.save(ktp);
          user.kartu_tanda_penduduk_ = resKtpSave;
          user.verified = true;
          user.role = RoleModel.USER;
          let resUserSave = await this.userRepo.save(user as User);
          delete resUserSave.password;
          delete resUserSave.session_token;
          if ('kartu_tanda_penduduk_' in resUserSave) {
            delete resUserSave.kartu_tanda_penduduk_;
          }
          if ('profile_' in resUserSave) {
            delete resUserSave.profile_;
          }
          user.session_token = this.cs.credentialEncode({ user: resUserSave }, false);
          resUserSave = await this.userRepo.save(user as User);
          res.cookie(environment.tokenName, resUserSave.session_token, {
            httpOnly: true,
            secure: environment.production,
            sameSite: 'strict',
            expires: new Date(this.cs.jwtView(user.session_token).exp * 1000),
            domain: environment.domain
          });
          return {
            info: `😍 201 - Verifikasi API :: Verifikasi Berhasil 🥰`,
            result: {
              token: resUserSave.session_token
            }
          };
        }
      } else {
        throw new Error('Data Tidak Lengkap!');
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: '🙄 400 - Verifikasi API :: Verifikasi Gagal! 😪',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
