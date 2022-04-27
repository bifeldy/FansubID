import createError from 'http-errors';

import { Router, Response, NextFunction } from 'express';
import { getRepository, ILike, Equal, IsNull } from 'typeorm';

import { RoleModel } from '../../models/req-res.model';
import { UserRequest } from '../models/UserRequest';

import { User } from '../entities/User';
import { Komentar } from '../entities/Komentar';

import { isAuthorized } from '../middlewares/auth';

const router = Router();

router.get('/', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const komenRepo = getRepository(Komentar);
    const [komens, count] = await komenRepo.findAndCount({
      where: [
        {
          ...((req.query.path) ? {
            path: Equal(req.query.path)
          } : {
            // All Path
          }),
          parent_komentar_: IsNull(),
          comment: ILike(`%${req.query.q ? req.query.q : ''}%`)
        }
      ],
      order: {
        ...((req.query.sort && req.query.order) ? {
          [req.query.sort]: req.query.order.toUpperCase()
        } : {
          created_at: 'DESC',
          id: 'DESC'
        })
      },
      relations: ['parent_komentar_', 'user_'],
      skip: req.query.page > 0 ? (req.query.page * req.query.row - req.query.row) : 0,
      take: (req.query.row > 0 && req.query.row <= 500) ? req.query.row : 10
    });
    for (const k of komens) {
      if ('user_' in k && k.user_) {
        delete k.user_.role;
        delete k.user_.password;
        delete k.user_.session_token;
        delete k.user_.created_at;
        delete k.user_.updated_at;
      }
      (k as any).reply_count = await komenRepo.count({
        where: [
          { parent_komentar_: Equal(k.id) }
        ]
      });
    }
    return res.status(200).json({
      info: `😅 200 - Komentar API :: List All 🤣`,
      count,
      pages: Math.ceil(count / (req.query.row ? req.query.row : 10)),
      results: komens
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: `🙄 400 - Komentar API :: Gagal Mendapatkan All Komentar 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// POST `/api/comment`
router.post('/', isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if ('path' in req.body && 'comment' in req.body) {
      const komenRepo = getRepository(Komentar);
      const komen = new Komentar();
      komen.path = req.body.path;
      komen.comment = req.body.comment;
      if ('parent' in req.body) {
        const comment =  await komenRepo.findOneOrFail({
          where: [
            { id: Equal(req.body.parent) }
          ]
        });
        komen.parent_komentar_ = comment;
      }
      const userRepo = getRepository(User);
      const user =  await userRepo.findOneOrFail({
        where: [
          { id: Equal(req.user.id) }
        ]
      });
      komen.user_ = user;
      const resKomenSave = await komenRepo.save(komen);
      if ('user_' in resKomenSave && resKomenSave.user_) {
        delete resKomenSave.user_.role;
        delete resKomenSave.user_.password;
        delete resKomenSave.user_.session_token;
        delete resKomenSave.user_.created_at;
        delete resKomenSave.user_.updated_at;
      }
      return res.status(200).json({
        info: `😅 200 - Komentar API :: Tambah Baru 🤣`,
        result: resKomenSave
      });
    } else {
      return res.status(400).json({
        info: `🙄 400 - Komentar API :: Gagal Membuat Komentar 😪`,
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

router.get('/:id', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const komenRepo = getRepository(Komentar);
    const [komens, count] = await komenRepo.findAndCount({
      where: [
        {
          parent_komentar_: Equal(req.params['id']),
          comment: ILike(`%${req.query.q ? req.query.q : ''}%`)
        }
      ],
      order: {
        ...((req.query.sort && req.query.order) ? {
          [req.query.sort]: req.query.order.toUpperCase()
        } : {
          created_at: 'DESC',
          id: 'DESC'
        })
      },
      relations: ['parent_komentar_', 'user_'],
      skip: req.query.page > 0 ? (req.query.page * req.query.row - req.query.row) : 0,
      take: (req.query.row > 0 && req.query.row <= 500) ? req.query.row : 10
    });
    for (const k of komens) {
      if ('user_' in k && k.user_) {
        delete k.user_.role;
        delete k.user_.password;
        delete k.user_.session_token;
        delete k.user_.created_at;
        delete k.user_.updated_at;
      }
      (k as any).reply_count = await komenRepo.count({
        where: [
          { parent_komentar_: Equal(k.id) }
        ]
      });
    }
    return res.status(200).json({
      info: `😅 200 - Komentar API :: List All 🤣`,
      count,
      pages: Math.ceil(count / (req.query.row ? req.query.row : 10)),
      results: komens
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: `🙄 400 - Komentar API :: Gagal Mendapatkan All Komentar 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// DELETE `/api/comment/:id`
router.delete('/:id', isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user.role === RoleModel.ADMIN || req.user.role === RoleModel.MODERATOR) {
      const komenRepo = getRepository(Komentar);
      const komen =  await komenRepo.findOneOrFail({
        where: [
          { id: Equal(req.params['id']) }
        ]
      });
      const deletedKomen = await komenRepo.remove(komen);
      if ('user_' in deletedKomen && deletedKomen.user_) {
        delete deletedKomen.user_.role;
        delete deletedKomen.user_.password;
        delete deletedKomen.user_.session_token;
        delete deletedKomen.user_.created_at;
        delete deletedKomen.user_.updated_at;
      }
      return res.status(200).json({
        info: `😅 200 - Komentar API :: Berhasil Menghapus Komentar ${req.params['id']} 🤣`,
        result: deletedKomen
      });
    } else {
      return res.status(401).json({
        info: '🙄 401 - Komentar API :: Authorisasi Pengguna Gagal 😪',
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
