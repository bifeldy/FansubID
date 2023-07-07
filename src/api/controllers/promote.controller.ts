import { Controller, HttpCode, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Equal, ILike } from 'typeorm';

import { environment } from '../../environments/api/environment';

import { FilterApiKeyAccess } from '../decorators/filter-api-key-access.decorator';
import { Roles } from '../decorators/roles.decorator';
import { VerifiedOnly } from '../decorators/verified-only.decorator';

import { RoleModel, UserModel } from '../../models/req-res.model';

import { DiscordService } from '../services/discord.service';

import { UserService } from '../repository/user.service';

@ApiExcludeController()
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
  @FilterApiKeyAccess()
  @VerifiedOnly()
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  async promote(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if ('role' in req.body && ('id' in req.body || 'username' in req.body || 'email' in req.body)) {
        const adminMod: UserModel = res.locals['user'];
        let excludedRole = [];
        if (adminMod.role === RoleModel.ADMIN) {
          excludedRole = [];
        } else if (adminMod.role === RoleModel.MODERATOR) {
          excludedRole = [RoleModel.ADMIN];
        } else {
          excludedRole = [RoleModel.ADMIN, RoleModel.MODERATOR];
        }
        if (excludedRole.includes(req.body.role)) {
          throw new HttpException({
            info: '🙄 403 - Promote API :: Authorisasi Pengguna Gagal 😪',
            result: {
              message: 'Membutuhkan Role Yang Lebih Tinggi'
            }
          }, HttpStatus.FORBIDDEN);
        }
        const user = await this.userRepo.findOneOrFail({
          where: [
            { id: Equal(req.body.id) },
            { username: ILike(req.body.username) },
            { email: ILike(req.body.email) }
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
          delete resUserSave.kartu_tanda_penduduk_;
          delete resUserSave.profile_;
          return {
            info: `😅 201 - Promote API :: Berhasil Mempromosikan User 🤣`,
            result: resUserSave
          };
        }
        throw new HttpException({
          info: `🙄 400 - Promote API :: Gagal Mempromosikan User 😪`,
          result: {
            message: 'Akun Pengguna Belum Diverifikasi!'
          }
        }, HttpStatus.BAD_REQUEST);
      }
      throw new Error('Data Tidak Lengkap!');
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
