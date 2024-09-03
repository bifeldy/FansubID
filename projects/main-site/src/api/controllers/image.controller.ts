// 3rd Party Library
import multer from 'multer';
import { FormData } from 'node-fetch';

// NodeJS Library
import { URL } from 'node:url';

import { Controller, HttpCode, HttpException, HttpStatus, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { Equal, MoreThanOrEqual } from 'typeorm';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { RoleModel, UserModel } from '../../models/req-res.model';

import { FilterApiKeyAccess } from '../decorators/filter-api-key-access.decorator';
import { Roles } from '../decorators/roles.decorator';

import { ApiService } from '../services/api.service';
import { CryptoService } from '../services/crypto.service';
import { GlobalService } from '../services/global.service';
import { AmazonWebService } from '../services/amazon-web.service';
import { UserPremiumService } from '../repository/user-premium.service';

@ApiExcludeController()
@Controller('/image')
export class ImageController {

  constructor(
    private api: ApiService,
    private cs: CryptoService,
    private gs: GlobalService,
    private aws: AmazonWebService,
    private userPremiumRepo: UserPremiumService
  ) {
    //
  }

  @Post('/')
  @HttpCode(201)
  @FilterApiKeyAccess()
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  @UseInterceptors(
    FileInterceptor(
      'file',
      {
        fileFilter: (req, file, cb) => {
          if (file) {
            const typeArray = file.mimetype.split('/');
            const fileType = typeArray[0];
            if (fileType.toLowerCase() === 'image') {
              return cb(null, true);
            }
          }
          return cb(null, false);
        },
        storage: multer.memoryStorage(),
        limits: {
          fileSize: CONSTANTS.fileSizeImageLimit
        },
      }
    )
  )
  async imgBb(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const user: UserModel = res.locals['user'];
      const primeCount = await this.userPremiumRepo.count({
        where: [
          {
            expired_at: MoreThanOrEqual(new Date()),
            user_: {
              id: Equal(user.id)
            }
          }
        ],
        relations: ['user_']
      });
      const dateTime = Date.now().toString();
      const imgB64 = this.cs.convertToBase64(req.file.buffer);
      if (primeCount > 0 && user.id !== 2 /* TODO :: Hard-coded Bot 'Backup' Account */) {
        const upload = await this.aws.uploadImage(
          `u${user.id}/img/${dateTime}`,
          imgB64,
          req.file.mimetype
        );
        return {
          info: `😅 201 - Gambar API :: Upload Image 🤣`,
          result: {
            id: upload.Key,
            url: upload.Location,
            mime: req.file.mimetype,
            size: req.file.size
          },
          imageUrl: upload.Location
        };
      } else {
        const url = new URL(environment.externalApiImage);
        const form = new FormData();
        form.append('key', environment.imgbbKey);
        form.append('name', dateTime);
        form.append('image', imgB64);
        const res_raw = await this.api.postData(url, form, environment.nodeJsXhrHeader, res.locals['abort-controller'].signal);
        if (res_raw.ok) {
          const res_json: any = await res_raw.json();
          this.gs.log(`[imgBB] 🖼 ${res_raw.status}`, res_json);
          return {
            info: `😅 201 - Gambar API :: Upload Image 🤣`,
            result: {
              id: res_json.data.id,
              url: res_json.data.image.url,
              mime: res_json.data.image.mime,
              size: res_json.data.size,
              // title: res_json.data.title,
              // extension: res_json.data.image.extension,
              // time: res_json.data.time,
              // expiration: res_json.data.expiration
            },
            imageUrl: res_json.data.image.url
          };
        } else {
          throw new HttpException({
            info: `🙄 ${res_raw.status || 400} - Gambar API :: Upload Image Gagal 😪`,
            result: {
              message: 'Data Tidak Lengkap / Gambar API Down!'
            }
          }, res_raw.status || HttpStatus.BAD_REQUEST);
        }
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Gambar API :: Upload Image Gagal 😪`,
        result: {
          message: 'Data Tidak Lengkap'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
