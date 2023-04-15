import { Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ILike } from 'typeorm';

import { InformationModel, RoleModel, UserModel } from '../../models/req-res.model';

import { FilterApiKeyAccess } from '../decorators/filter-api-key-access.decorator';
import { Roles } from '../decorators/roles.decorator';
import { VerifiedOnly } from '../decorators/verified.decorator';

import { InformationService } from '../repository/information.service';

import { SocketIoService } from '../services/socket-io.service';

@ApiExcludeController()
@Controller('/information')
export class InformationController {

  constructor(
    private informationRepo: InformationService,
    private sis: SocketIoService
  ) {
    //
  }

  @Get('/')
  @HttpCode(200)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  @VerifiedOnly()
  @FilterApiKeyAccess()
  async getAll(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const searchQuery = req.query['q'] || '';
    try {
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const [informations, count] = await this.informationRepo.findAndCount({
        where: [
          { title: ILike(`%${searchQuery}%`) },
          { content: ILike(`%${searchQuery}%`) }
        ],
        order: {
          ...((req.query['sort'] && req.query['order']) ? {
            [req.query['sort'] as string]: (req.query['order'] as string).toUpperCase()
          } : {
            created_at: 'DESC',
            title: 'ASC'
          })
        },
        relations: ['user_'],
        skip: queryPage > 0 ? (queryPage * queryRow - queryRow) : 0,
        take: (queryRow > 0 && queryRow <= 500) ? queryRow : 10
      });
      for (const i of informations) {
        if ('user_' in i && i.user_) {
          delete i.user_.created_at;
          delete i.user_.updated_at;
        }
      }
      return {
        info: `😅 200 - Information API :: List All 🤣`,
        count,
        pages: Math.ceil(count / (queryRow ? queryRow : 10)),
        results: informations
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Information API :: Gagal Mendapatkan All Informasi 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/')
  @HttpCode(201)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  @VerifiedOnly()
  @FilterApiKeyAccess()
  async addNew(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if (
        'id' in req.body &&
        'title' in req.body &&
        'content' in req.body &&
        'confirm' in req.body &&
        'close' in req.body
      ) {
        const user: UserModel = res.locals['user'];
        let infoTemplate: InformationModel = {
          id: req.body.id,
          title: req.body.title,
          content: req.body.content,
          confirm: req.body.confirm,
          cancel: req.body.cancel,
          close: req.body.close,
          user_: {
            username: user.username
          }
        };
        const informations = await this.informationRepo.find({
          where: [
            { id: ILike(`%${infoTemplate.id}%`) }
          ],
          relations: ['user_']
        });
        let infoCreateOrUpdate = null;
        if (informations.length === 0) {
          infoCreateOrUpdate = this.informationRepo.new();
          infoCreateOrUpdate.id = infoTemplate.id;
        } else if (informations.length === 1) {
          infoCreateOrUpdate = informations[0];
        } else {
          throw new Error('Data Duplikat');
        }
        if ('title' in req.body) {
          infoCreateOrUpdate.title = infoTemplate.title;
        }
        if ('content' in req.body) {
          infoCreateOrUpdate.content = infoTemplate.content;
        }
        if ('confirm' in req.body) {
          infoCreateOrUpdate.confirm = infoTemplate.confirm;
        }
        if ('cancel' in req.body) {
          infoCreateOrUpdate.cancel = infoTemplate.cancel;
        }
        if ('close' in req.body) {
          infoCreateOrUpdate.close = infoTemplate.close;
        }
        infoCreateOrUpdate.user_ = user;
        const broadcastOnly = (req.body.broadcast === true);
        if (broadcastOnly) {
          this.sis.emitToBroadcast('new-information', {
            infoCreator: infoCreateOrUpdate.user_.username,
            infoData: {
              id: infoCreateOrUpdate.id,
              title: infoCreateOrUpdate.title,
              content: infoCreateOrUpdate.content,
              confirm: infoCreateOrUpdate.confirm,
              cancel: infoCreateOrUpdate.cancel,
              close: infoCreateOrUpdate.close
            }
          });
          infoTemplate = infoCreateOrUpdate;
        } else {
          infoTemplate = await this.informationRepo.save(infoCreateOrUpdate);
        }
        return {
          info: '😚 201 - Information API :: Berhasil Membuat / Mengirim Informasi 🤩',
          result: infoTemplate
        };
      }
      throw new Error('Data Tidak Lengkap!');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: '🙄 400 - Information API :: Gagal Membuat Informasi 😪',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:id')
  @HttpCode(200)
  @FilterApiKeyAccess()
  async getById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const information = await this.informationRepo.findOneOrFail({
        where: [
          { id: ILike(`%${req.params['id']}%`) }
        ],
        relations: ['user_']
      });
      if ('user_' in information && information.user_) {
        delete information.user_.created_at;
        delete information.user_.updated_at;
      }
      return {
        info: `😅 200 - Informasi API :: Detail ${req.params['id']} 🤣`,
        result: information
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Information API :: Gagal Mencari Informasi ${req.params['id']} 😪`,
        result: {
          message: 'Informasi Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Delete('/:id')
  @HttpCode(202)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  @VerifiedOnly()
  @FilterApiKeyAccess()
  async deleteById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const information = await this.informationRepo.findOneOrFail({
        where: [
          { id: ILike(`%${req.params['id']}%`) }
        ],
        relations: ['user_']
      });
      const deletedInformasi = await this.informationRepo.remove(information);
      if ('user_' in deletedInformasi && deletedInformasi.user_) {
        delete deletedInformasi.user_.created_at;
        delete deletedInformasi.user_.updated_at;
      }
      return {
        info: `😅 202 - Information API :: Berhasil Hapus Informasi ${req.params['id']} 🤣`,
        result: deletedInformasi
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Information API :: Gagal Mencari Informasi ${req.params['id']} 😪`,
        result: {
          message: 'Informasi Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

}
