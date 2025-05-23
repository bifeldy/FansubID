import { Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Equal, ILike } from 'typeorm';

import { NotificationModel, RoleModel, UserModel } from '../../models/req-res.model';

import { FilterApiKeyAccess } from '../decorators/filter-api-key-access.decorator';
import { Roles } from '../decorators/roles.decorator';
import { VerifiedOnly } from '../decorators/verified-only.decorator';

import { NotificationService } from '../repository/notification.service';

import { SocketIoService } from '../services/socket-io.service';

@ApiExcludeController()
@Controller('/notification')
export class NotificationController {

  constructor(
    private notificationRepo: NotificationService,
    private sis: SocketIoService
  ) {
    //
  }

  @Get('/')
  @HttpCode(200)
  @FilterApiKeyAccess()
  @VerifiedOnly()
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  async getAll(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const searchQuery = req.query['q'] || '';
    try {
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const [notifications, count] = await this.notificationRepo.findAndCount({
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
        withDeleted: true,
        relations: ['user_'],
        skip: queryPage > 0 ? (queryPage * queryRow - queryRow) : 0,
        take: (queryRow > 0 && queryRow <= 500) ? queryRow : 10
      });
      for (const n of notifications) {
        if ('user_' in n && n.user_) {
          delete n.user_.created_at;
          delete n.user_.updated_at;
        }
      }
      return {
        info: `😅 200 - Notification API :: List All 🤣`,
        count,
        pages: Math.ceil(count / (queryRow ? queryRow : 10)),
        results: notifications
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Notification API :: Gagal Mendapatkan All Notifikasi 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/')
  @HttpCode(201)
  @FilterApiKeyAccess()
  @VerifiedOnly()
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  async addNew(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if (
        'type' in req.body &&
        'title' in req.body &&
        'content' in req.body &&
        'dismissible' in req.body
      ) {
        const user: UserModel = res.locals['user'];
        let notifTemplate: NotificationModel = {
          id: Date.now(),
          type: req.body.type,
          title: req.body.title,
          content: req.body.content,
          dismissible: (req.body.dismissible === true),
          timeout: req.body.timeout || 10000,
          user_: {
            username: user.username
          }
        };
        if ('deadline' in req.body) {
          const notif = this.notificationRepo.new();
          notif.type = notifTemplate.type;
          notif.title = notifTemplate.title;
          notif.content = notifTemplate.content;
          notif.dismissible = notifTemplate.dismissible;
          notif.timeout = notifTemplate.timeout;
          notif.deadline = req.body.deadline;
          notif.user_ = user;
          notifTemplate = await this.notificationRepo.save(notif);
        }
        this.sis.emitToBroadcast('new-notification', {
          notifCreator: notifTemplate.user_.username,
          notifData: {
            id: notifTemplate.id,
            type: notifTemplate.type,
            title: notifTemplate.title,
            content: notifTemplate.content,
            dismissible: notifTemplate.dismissible,
            timeout: notifTemplate.timeout
          }
        });
        return {
          info: '😚 201 - Notification API :: Berhasil Membuat Notifikasi 🤩',
          result: {
            message: 'Notifikasi Telah Dikirim!'
          }
        };
      }
      throw new Error('Data Tidak Lengkap!');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: '🙄 400 - Notification API :: Gagal Membuat Notifikasi 😪',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/:id')
  @HttpCode(202)
  @FilterApiKeyAccess()
  @VerifiedOnly()
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  async deleteById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const notification = await this.notificationRepo.findOneOrFail({
        where: [
          { id: Equal(parseInt(req.params['id'])) }
        ],
        relations: ['user_']
      });
      notification.deadline = new Date(0);
      const resSaveNotification = await this.notificationRepo.save(notification);
      const deletedNotification = await this.notificationRepo.remove(resSaveNotification);
      if ('user_' in deletedNotification && deletedNotification.user_) {
        delete deletedNotification.user_.created_at;
        delete deletedNotification.user_.updated_at;
      }
      return {
        info: `😅 202 - Notification API :: Berhasil Hapus Notifikasi ${req.params['id']} 🤣`,
        result: deletedNotification
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Notification API :: Gagal Mencari Notifikasi ${req.params['id']} 😪`,
        result: {
          message: 'Notifikasi Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

}
