import createError from 'http-errors';

import { Router, Response, NextFunction } from 'express';
import { getRepository, ILike, Equal, In, Not } from 'typeorm';
import { MessageEmbed } from 'discord.js';

import { environment } from '../../environments/api/environment';

import { UserRequest } from '../models/UserRequest';
import { Role } from '../../app/_shared/models/Role';

import { User } from '../entities/User';
import { Banned } from '../entities/Banned';

import { isLogin, isAuthorized } from '../middlewares/auth';

const router = Router();

// GET `/api/banned?id=`
router.get('/', isLogin, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const bannedRepo = getRepository(Banned);
    const queryId = req.query.id;
    if (queryId) {
      const userId = queryId.split(',').map(Number);
      if (Array.isArray(userId) && userId.length > 0) {
        if (userId.length > 1) {
          if (req.user) {
            if (req.user.role !== Role.ADMIN && req.user.role !== Role.MODERATOR) {
              return res.status(401).json({
                info: '🙄 401 - Banned API :: Authorisasi Pengguna Gagal 😪',
                result: {
                  message: 'Membutuhkan Hak Admin / Moderator!'
                }
              });
            }
          } else {
            return res.status(401).json({
              info: '🙄 401 - Banned API :: Authorisasi Pengguna Gagal 😪',
              result: {
                message: 'Harap Login Terlebih Dahulu!'
              }
            });
          }
        }
        const [banneds, count] = await bannedRepo.findAndCount({
          where: [
            {
              user_: {
                id: In(userId)
              }
            }
          ],
          relations: ['user_']
        });
        const results: any = {};
        for (const i of userId) {
          results[i] = {};
        }
        for (const b of banneds) {
          if ('user_' in b && b.user_) {
            delete b.user_.role;
            delete b.user_.password;
            delete b.user_.session_token;
            delete b.user_.created_at;
            delete b.user_.updated_at;
            results[b.user_.id] = b;
          }
        }
        return res.status(200).json({
          info: `😅 200 - Banned API :: User 🤣`,
          count,
          pages: 1,
          results
        });
      } else {
        throw new Error('Data Tidak Lengkap!');
      }
    } else {
      if (!req.user) {
        return res.status(401).json({
          info: '🙄 401 - Banned API :: Authorisasi Pengguna Gagal 😪',
          result: {
            message: 'Harap Login Terlebih Dahulu!'
          }
        });
      } else if (req.user.role === Role.ADMIN || req.user.role === Role.MODERATOR) {
        const [banneds, count] = await bannedRepo.findAndCount({
          where: [
            { reason: ILike(`%${req.query.q ? req.query.q : ''}%`) }
          ],
          order: {
            ...((req.query.sort && req.query.order) ? {
              [req.query.sort]: req.query.order.toUpperCase()
            } : {
              created_at: 'DESC',
              reason: 'ASC'
            })
          },
          relations: ['user_', 'banned_by_'],
          skip: req.query.page > 0 ? (req.query.page * req.query.row - req.query.row) : 0,
          take: (req.query.row > 0 && req.query.row <= 500) ? req.query.row : 10
        });
        for (const b of banneds) {
          if ('user_' in b && b.user_) {
            delete b.user_.password;
            delete b.user_.session_token;
            delete b.user_.created_at;
            delete b.user_.updated_at;
          }
          if ('banned_by_' in b && b.banned_by_) {
            delete b.banned_by_.password;
            delete b.banned_by_.session_token;
            delete b.banned_by_.created_at;
            delete b.banned_by_.updated_at;
          }
        }
        return res.status(200).json({
          info: `😅 200 - Banned API :: List All 🤣`,
          count,
          pages: Math.ceil(count / (req.query.row ? req.query.row : 10)),
          results: banneds
        });
      } else {
        return res.status(401).json({
          info: '🙄 401 - Banned API :: Authorisasi Pengguna Gagal 😪',
          result: {
            message: 'Khusus Admin / Moderator!'
          }
        });
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      info: `🙄 400 - Banned API :: Gagal Mencari Banned ${req.query.id} 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// POST `/api/banned`
router.post('/', isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if ('reason' in req.body && ('id' in req.body || 'username' in req.body || 'email' in req.body)) {
      if (req.user.role === Role.ADMIN || req.user.role === Role.MODERATOR) {
        let excludedRole = [req.user.role];
        if (req.user.role === Role.ADMIN) {
          excludedRole = [Role.ADMIN];
        } else {
          excludedRole = [Role.ADMIN, Role.MODERATOR];
        }
        const userRepo = getRepository(User);
        const user =  await userRepo.findOneOrFail({
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
          ]
        });
        const bannedBy =  await userRepo.findOneOrFail({
          where: [
            { id: Equal(req.user.id) }
          ]
        });
        const bannedRepo = getRepository(Banned);
        const banned = new Banned();
        banned.reason = req.body.reason;
        banned.user_ = user;
        banned.banned_by_ = bannedBy;
        const bannedUser = await bannedRepo.save(banned);
        if ('user_' in bannedUser && bannedUser.user_) {
          delete bannedUser.user_.role;
          delete bannedUser.user_.password;
          delete bannedUser.user_.session_token;
          delete bannedUser.user_.created_at;
          delete bannedUser.user_.updated_at;
        }
        if ('banned_by_' in bannedUser && bannedUser.banned_by_) {
          delete bannedUser.banned_by_.role;
          delete bannedUser.banned_by_.password;
          delete bannedUser.banned_by_.session_token;
          delete bannedUser.banned_by_.created_at;
          delete bannedUser.banned_by_.updated_at;
        }
        req.botSendNews({
          embeds: [
            new MessageEmbed()
              .setColor('#c5e510')
              .setTitle(banned.user_.username)
              .setURL(`${environment.baseUrl}/user/${banned.user_.username}`)
              .setAuthor('Hikki - Akun BANNED', `${environment.baseUrl}/assets/img/favicon.png`, environment.baseUrl)
              .addField('Alasan', banned.reason, false)
              .setThumbnail(banned.user_.image_url === '/favicon.ico' ? `${environment.baseUrl}/assets/img/favicon.png` : banned.user_.image_url)
              .setTimestamp(banned.updated_at)
              .setFooter(
                (banned.banned_by_ ? banned.banned_by_.username : 'AUTO_BANNED'),
                (banned.banned_by_ ? (banned.banned_by_.image_url === '/favicon.ico' ? `${environment.baseUrl}/assets/img/favicon.png` : banned.banned_by_.image_url) : `${environment.baseUrl}/assets/img/favicon.png`)
              )
          ]
        });
        return res.status(200).json({
          info: `😅 200 - Banned API :: Berhasil BAN User 🤣`,
          results: bannedUser
        });
      } else {
        return res.status(401).json({
          info: '🙄 401 - Banned API :: Authorisasi Pengguna Gagal 😪',
          result: {
            message: 'Khusus Admin / Moderator!'
          }
        });
      }
    } else {
      return res.status(400).json({
        info: `🙄 400 - Banned API :: Gagal BAN User 😪`,
        result: {
          message: 'Data Tidak Lengkap'
        }
      });
    }
  } catch (error) {
    console.error(error);
    return next(createError(404));
  }
});

// DELETE `/api/banned/:id`
router.delete('/:id', isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user.role === Role.ADMIN || req.user.role === Role.MODERATOR) {
      let excludedRole = [req.user.role];
      if (req.user.role === Role.MODERATOR) {
        excludedRole = [Role.ADMIN, Role.MODERATOR];
      }
      const bannedRepo = getRepository(Banned);
      const banned = await bannedRepo.findOneOrFail({
        where: [
          {
            id: req.params.id,
            user_: {
              role: Not(In(excludedRole))
            }
          }
        ],
        relations: ['user_', 'banned_by_']
      });
      const unBannedUser = await bannedRepo.remove(banned);
      if ('user_' in unBannedUser && unBannedUser.user_) {
        delete unBannedUser.user_.role;
        delete unBannedUser.user_.password;
        delete unBannedUser.user_.session_token;
        delete unBannedUser.user_.created_at;
        delete unBannedUser.user_.updated_at;
      }
      if ('banned_by_' in unBannedUser && unBannedUser.banned_by_) {
        delete unBannedUser.banned_by_.role;
        delete unBannedUser.banned_by_.password;
        delete unBannedUser.banned_by_.session_token;
        delete unBannedUser.banned_by_.created_at;
        delete unBannedUser.banned_by_.updated_at;
      }
      return res.status(200).json({
        info: `😅 200 - Banned API :: Berhasil UnBAN User ${req.params.id} 🤣`,
        result: unBannedUser
      });
    } else {
      return res.status(401).json({
        info: '🙄 401 - Banned API :: Authorisasi Pengguna Gagal 😪',
        result: {
          message: 'Membutuhkan Role Yang Lebih Tinggi'
        }
      });
    }
  } catch (error) {
    console.error(error);
    return next(createError(404));
  }
});

export default router;
