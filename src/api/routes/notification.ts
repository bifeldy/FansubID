import createError from 'http-errors';

import { Router, Response, NextFunction } from 'express';
import { getRepository, Like, Equal } from 'typeorm';

import { UserRequest } from '../models/UserRequest';

import { Role } from '../../app/_shared/models/Role';

import { User } from '../entities/User';
import { Notification } from '../entities/Notification';

// Middleware
import auth from '../middlewares/auth';

const router = Router();

// GET `/api/notification`
router.get('/', auth.isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user.role === Role.ADMIN || req.user.role === Role.MODERATOR) {
      const notificationRepo = getRepository(Notification);
      const [notifications, count] = await notificationRepo.findAndCount({
        where: [
          { title: Like(`%${req.query.q ? req.query.q : ''}%`) },
          { content: Like(`%${req.query.q ? req.query.q : ''}%`) }
        ],
        order: {
          ...((req.query.sort && req.query.order) ? {
            [req.query.sort]: req.query.order.toUpperCase()
          } : {
            created_at: 'DESC',
            title: 'ASC'
          })
        },
        relations: ['user_'],
        skip: req.query.page > 0 ? (req.query.page * req.query.row - req.query.row) : 0,
        take: (req.query.row > 0 && req.query.row <= 100) ? req.query.row : 10
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
      return res.status(200).json({
        info: `😅 200 - Notification API :: List All 🤣`,
        count,
        pages: Math.ceil(count / (req.query.row ? req.query.row : 10)),
        results: notifications
      });
    } else {
      throw new Error('Khusus Admin / Moderator!');
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      info: '🙄 401 - Notification API :: Authorisasi Pengguna Gagal 😪',
      result: {
        message: 'Khusus Admin / Moderator!'
      }
    });
  }
});

// POST `/api/notification`
router.post('/', auth.isAuthorized, async (req: UserRequest, res: Response, next) => {
  if ('type' in req.body && 'title' in req.body && 'content' in req.body && 'dismissible' in req.body) {
    if (req.user.role === Role.ADMIN || req.user.role === Role.MODERATOR) {
      let notifTemplate = {
        id: new Date().getTime(),
        type: req.body.type.replace(/<[^>]*>/g, ' ').trim(),
        title: req.body.title.replace(/<[^>]*>/g, ' ').trim(),
        content: req.body.content.replace(/<[^>]*>/g, ' ').trim(),
        dismissible: (req.body.dismissible === false && req.user.role === Role.ADMIN ? false : true),
        user_: {
          username: req.user.username
        }
      };
      if (req.body.deadline) {
        try {
          const userRepo = getRepository(User);
          const user = await userRepo.findOneOrFail({
            where: [
              { id: Equal(req.user.id) }
            ]
          });
          const notifRepo = getRepository(Notification);
          const notif = new Notification();
          notif.type = notifTemplate.type;
          notif.title = notifTemplate.title;
          notif.content = notifTemplate.content;
          notif.dismissible = notifTemplate.dismissible;
          notif.deadline = req.body.deadline;
          notif.user_ = user;
          notifTemplate = await notifRepo.save(notif);
        } catch (error) {
          console.error(error);
        }
      }
      req.io.volatile.emit('notification', {
        notifCreator: notifTemplate.user_.username,
        notifData: {
          id: notifTemplate.id,
          type: notifTemplate.type,
          title: notifTemplate.title,
          content: notifTemplate.content,
          dismissible: notifTemplate.dismissible
        }
      });
      return res.status(200).json({
        info: '😚 200 - Notification API :: Berhasil Membuat Notifikasi 🤩',
        result: {
          message: 'Notifikasi Telah Dikirim!'
        }
      });
    } else {
      return res.status(401).json({
        info: '🙄 401 - Notification API :: Authorisasi Pengguna Gagal 😪',
        result: {
          message: 'Khusus Admin / Moderator!'
        }
      });
    }
  } else {
    return res.status(400).json({
      info: '🙄 400 - Notification API :: Gagal Membuat Notifikasi 😪',
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// DELETE `/api/notification/:id`
router.delete('/:id', auth.isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user.role === Role.ADMIN || req.user.role === Role.MODERATOR) {
      const notificationRepo = getRepository(Notification);
      const notification = await notificationRepo.findOneOrFail({
        where: [
          { id: req.params.id }
        ],
        relations: ['user_']
      });
      const deletedNotification = await notificationRepo.remove(notification);
      if ('user_' in deletedNotification && deletedNotification.user_) {
        delete deletedNotification.user_.role;
        delete deletedNotification.user_.password;
        delete deletedNotification.user_.session_token;
        delete deletedNotification.user_.created_at;
        delete deletedNotification.user_.updated_at;
      }
      return res.status(200).json({
        info: `😅 200 - Notification API :: Berhasil Hapus Notifikasi 🤣`,
        results: deletedNotification
      });
    } else {
      return res.status(401).json({
        info: '🙄 401 - Notification API :: Authorisasi Pengguna Gagal 😪',
        result: {
          message: 'Khusus Admin / Moderator!'
        }
      });
    }
  } catch (error) {
    console.error(error);
    return next(createError(404));
  }
});

export default router;
