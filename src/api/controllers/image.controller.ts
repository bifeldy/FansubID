// 3rd Party Library
import multer from 'multer';
import { FormData } from 'node-fetch';

// NodeJS Library
import { URL } from 'node:url';

import { Controller, HttpCode, HttpException, HttpStatus, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { RoleModel } from '../../models/req-res.model';

import { Roles } from '../decorators/roles.decorator';

import { ApiService } from '../services/api.service';
import { CryptoService } from '../services/crypto.service';
import { GlobalService } from '../services/global.service';

@Controller('/image')
export class ImageController {

  constructor(
    private api: ApiService,
    private cs: CryptoService,
    private gs: GlobalService
  ) {
    //
  }

  @Post('/')
  @HttpCode(201)
  @UseInterceptors(
    FileInterceptor(
      'file',
      {
        fileFilter: (req, file, cb) => {
          if (file) {
            const typeArray = file.mimetype.split('/');
            const fileType = typeArray[0];
            const fileExt = typeArray[1];
            if (fileType === 'image') {
              if (fileExt === 'jpeg' || fileExt === 'jpg' || fileExt === 'gif' || fileExt === 'png') {
                return cb(null, true);
              }
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
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  async imgBb(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const dateTime = new Date().getTime().toString();
      const imgB64 = this.cs.convertToBase64(req.file.buffer);
      const url = new URL(environment.externalApiImage);
      const form = new FormData();
      form.append('key', environment.imgbbKey);
      form.append('name', dateTime);
      form.append('image', imgB64);
      const res_raw = await this.api.postData(url, form, environment.nodeJsXhrHeader);
      if (res_raw.ok) {
        const res_json: any = await res_raw.json();
        this.gs.log(`[imgBB] 🖼 ${res_raw.status}`, res_json);
        return {
          info: `😅 201 - ImgBB API :: Upload Image 🤣`,
          result: {
            id: res_json.data.id,
            title: res_json.data.title,
            url: res_json.data.image.url,
            mime: res_json.data.image.mime,
            extension: res_json.data.image.extension,
            size: res_json.data.size,
            time: res_json.data.time,
            expiration: res_json.data.expiration,
          },
          imageUrl: res_json.data.image.url
        };
      } else {
        throw new HttpException({
          info: `🙄 ${res_raw.status || 400} - ImgBB API :: Upload Image Gagal 😪`,
          result: {
            message: 'Data Tidak Lengkap / ImgBB API Down!'
          }
        }, res_raw.status || HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - ImgBB API :: Upload Image Gagal 😪`,
        result: {
          message: 'Data Tidak Lengkap'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
