import createError from 'http-errors';

import { Router, Response, NextFunction } from 'express';
import { getRepository, Like, Equal } from 'typeorm';

import { UserRequest } from '../models/UserRequest';

import { Role } from '../../app/_shared/models/Role';

import { User } from '../entities/User';
import { Banned } from '../entities/Banned';

// Middleware
import auth from '../middlewares/auth';

const router = Router();

// GET `/api/banned`
router.get('/', auth.isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user.role === Role.ADMIN || req.user.role === Role.MODERATOR) {
      const bannedRepo = getRepository(Banned);
      const [banneds, count] = await bannedRepo.findAndCount({
        where: [
          { reason: Like(`%${req.query.q ? req.query.q : ''}%`) }
        ],
        order: {
          ...((req.query.sort && req.query.order) ? {
            [req.query.sort]: req.query.order.toUpperCase()
          } : {
            created_at: 'DESC',
            reason: 'ASC'
          })
        },
        relations: ['user_'],
        skip: req.query.page > 0 ? (req.query.page * req.query.row - req.query.row) : 0,
        take: (req.query.row > 0 && req.query.row <= 100) ? req.query.row : 10
      });
      for (const b of banneds) {
        if ('user_' in b && b.user_) {
          delete b.user_.role;
          delete b.user_.password;
          delete b.user_.session_token;
          delete b.user_.created_at;
          delete b.user_.updated_at;
        }
      }
      return res.status(200).json({
        info: `😅 200 - Banned API :: List All 🤣`,
        count,
        pages: Math.ceil(count / (req.query.row ? req.query.row : 10)),
        results: banneds
      });
    } else {
      throw new Error('Khusus Admin / Moderator!');
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      info: '🙄 401 - Banned API :: Authorisasi Pengguna Gagal 😪',
      result: {
        message: 'Khusus Admin / Moderator!'
      }
    });
  }
});

// POST `/api/banned`
router.post('/', auth.isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if ('reason' in req.body && ('id' in req.body || 'username' in req.body || 'email' in req.body)) {
      if (req.user.role === Role.ADMIN || req.user.role === Role.MODERATOR) {
        const userRepo = getRepository(User);
        const user =  await userRepo.findOneOrFail({
          where: [
            { id: Equal(req.body.id) },
            { username: Equal(req.body.username) },
            { email: Equal(req.body.email) }
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
        // TODO :: req.bot Reporting
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
          message: 'Data Tidak Lengkap!'
        }
      });
    }
  } catch (error) {
    console.error(error);
    return next(createError(404));
  }
});

// DELETE `/api/banned/:id`
router.delete('/:id', auth.isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user.role === Role.ADMIN || req.user.role === Role.MODERATOR) {
      const bannedRepo = getRepository(Banned);
      const banned = await bannedRepo.findOneOrFail({
        where: [
          { id: req.params.id }
        ],
        relations: ['user_']
      });
      const unBannedUser = await bannedRepo.remove(banned);
      if ('user_' in unBannedUser && unBannedUser.user_) {
        delete unBannedUser.user_.role;
        delete unBannedUser.user_.password;
        delete unBannedUser.user_.session_token;
        delete unBannedUser.user_.created_at;
        delete unBannedUser.user_.updated_at;
      }
      // TODO :: req.bot Reporting
      return res.status(200).json({
        info: `😅 200 - Banned API :: Berhasil UnBAN User 🤣`,
        results: unBannedUser
      });
    } else {
      return res.status(401).json({
        info: '🙄 401 - Banned API :: Authorisasi Pengguna Gagal 😪',
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
