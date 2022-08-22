import { Controller, HttpCode, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Equal, Not, In, ILike } from 'typeorm';

import { environment } from '../../environments/api/environment';

import { Roles } from '../decorators/roles.decorator';

import { RoleModel, UserModel } from '../../models/req-res.model';

import { DiscordService } from '../services/discord.service';

import { UserService } from '../repository/user.service';

@Controller('/promote')
export class PromoteController {

  constructor(
    private ds: DiscordService,
    private userRepo: UserService
  ) {
    //
  }

  @Post('/')
  @HttpCode(201)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  async promote(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if ('role' in req.body && ('id' in req.body || 'username' in req.body || 'email' in req.body)) {
        const adminMod: UserModel = res.locals['user'];
        const excludedRole = adminMod.role === RoleModel.ADMIN ? [RoleModel.ADMIN] : [RoleModel.ADMIN, RoleModel.MODERATOR];
        if (adminMod.role !== RoleModel.ADMIN && excludedRole.includes(req.body.role)) {
          throw new HttpException({
            info: '🙄 403 - Promote API :: Authorisasi Pengguna Gagal 😪',
            result: {
              message: 'Membutuhkan Role Yang Lebih Tinggi'
            }
          }, HttpStatus.FORBIDDEN);
        }
        const user = await this.userRepo.findOneOrFail({
          where: [
            {
              id: Equal(req.body.id),
              role: Not(In(excludedRole))
            },
            {
              username: ILike(req.body.username),
              role: Not(In(excludedRole))
            },
            {
              email: ILike(req.body.email),
              role: Not(In(excludedRole))
            }
          ],
          relations: ['kartu_tanda_penduduk_', 'profile_']
        });
        if (user.verified) {
          user.role = req.body.role;
          const resUserSave = await this.userRepo.save(user);
          this.ds.sendNews(
            this.ds.createEmbedMessage(
              '#69f0ae',
              resUserSave.kartu_tanda_penduduk_.nama,
              `${environment.baseUrl}/user/${resUserSave.username}`,
              {
                name: `${environment.siteName} - Promosi Menjadi ${resUserSave.role}`,
                iconURL: `${environment.baseUrl}/assets/img/favicon.png`,
                url: environment.baseUrl
              },
              resUserSave.profile_.description,
              resUserSave.image_url,
              resUserSave.updated_at,
              {
                text: `Diangkat promosi oleh :: ${adminMod.username}`,
                iconURL: adminMod.image_url
              }
            )
          );
          delete resUserSave.email;
          delete resUserSave.password;
          delete resUserSave.session_token;
          delete resUserSave.kartu_tanda_penduduk_;
          delete resUserSave.profile_;
          return {
            info: `😅 201 - Promote API :: Berhasil Mempromosikan User 🤣`,
            result: resUserSave
          };
        } else {
          throw new HttpException({
            info: `🙄 400 - Promote API :: Gagal Mempromosikan User 😪`,
            result: {
              message: 'Akun Pengguna Belum Diverifikasi!'
            }
          }, HttpStatus.BAD_REQUEST);
        }
      } else {
        throw new Error('Data Tidak Lengkap');
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Promote API :: Gagal Mempromosikan User 😪`,
        result: {
          message: 'Data Tidak Lengkap'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
