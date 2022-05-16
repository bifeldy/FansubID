import { Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Equal, ILike } from 'typeorm';

import { NotificationModel, RoleModel, UserModel } from '../../models/req-res.model';

import { Roles } from '../decorators/roles.decorator';

import { NotificationService } from '../repository/notification.service';

import { SocketIoService } from '../services/socket-io.service';

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
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  async getAll(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const [notifications, count] = await this.notificationRepo.findAndCount({
        where: [
          { title: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`) },
          { content: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`) }
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
      for (const n of notifications) {
        if ('user_' in n && n.user_) {
          delete n.user_.role;
          delete n.user_.password;
          delete n.user_.session_token;
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
        info: `🙄 400 - Notification API :: Gagal Mendapatkan All Notif 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/')
  @HttpCode(201)
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
          id: new Date().getTime(),
          type: req.body.type.replace(/<[^>]*>/g, ' ').trim(),
          title: req.body.title.replace(/<[^>]*>/g, ' ').trim(),
          content: req.body.content.replace(/<[^>]*>/g, ' ').trim(),
          dismissible: (req.body.dismissible === false && user.role === RoleModel.ADMIN ? false : true),
          user_: {
            username: user.username
          }
        };
        if (req.body.deadline) {
          const notif = this.notificationRepo.new();
          notif.type = notifTemplate.type;
          notif.title = notifTemplate.title;
          notif.content = notifTemplate.content;
          notif.dismissible = notifTemplate.dismissible;
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
            dismissible: notifTemplate.dismissible
          }
        });
        return {
          info: '😚 201 - Notification API :: Berhasil Membuat Notifikasi 🤩',
          result: {
            message: 'Notifikasi Telah Dikirim!'
          }
        };
      } else {
        throw new Error('Data Tidak Lengkap!');
      }
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
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  async deleteById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const notification = await this.notificationRepo.findOneOrFail({
        where: [
          { id: Equal(parseInt(req.params['id'])) }
        ],
        relations: ['user_']
      });
      const deletedNotification = await this.notificationRepo.remove(notification);
      if ('user_' in deletedNotification && deletedNotification.user_) {
        delete deletedNotification.user_.role;
        delete deletedNotification.user_.password;
        delete deletedNotification.user_.session_token;
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
