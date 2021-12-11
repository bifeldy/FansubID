import createError from 'http-errors';

import { Router, Response, NextFunction } from 'express';
import { getRepository, ILike, Equal, In, Not, IsNull } from 'typeorm';

import { UserRequest } from '../models/UserRequest';
import { Role } from '../../app/_shared/models/Role';

import { User } from '../entities/User';
import { ApiKey } from '../entities/ApiKey';

import { isAuthorized } from '../middlewares/auth';

import { universalBtoa } from '../helpers/base64';

const router = Router();

// GET `/api/cors?id=`
router.get('/', isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const corsRepo = getRepository(ApiKey);
    const queryId = req.query.id;
    if (queryId) {
      const userId = queryId.split(',').map(Number);
      if (Array.isArray(userId) && userId.length > 0) {
        if (
          (userId.length > 1) || (userId.length === 1 && userId[0] !== req.user.id) &&
          req.user.role !== Role.ADMIN && req.user.role !== Role.MODERATOR
        ) {
          return res.status(401).json({
            info: '🙄 401 - Cors API :: Authorisasi Pengguna Gagal 😪',
            result: {
              message: 'Membutuhkan Hak Admin / Moderator!'
            }
          });
        }
        const [corss, count] = await corsRepo.findAndCount({
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
        for (const c of corss) {
          if ('user_' in c && c.user_) {
            delete c.user_.role;
            delete c.user_.password;
            delete c.user_.session_token;
            delete c.user_.created_at;
            delete c.user_.updated_at;
            results[c.user_.id] = c;
          }
        }
        return res.status(200).json({
          info: `😅 200 - Cors API :: User 🤣`,
          count,
          pages: 1,
          results
        });
      } else {
        throw new Error('Data Tidak Lengkap!');
      }
    } else {
      if (req.user.role === Role.ADMIN || req.user.role === Role.MODERATOR) {
        const [corss, count] = await corsRepo.findAndCount({
          where: [
            { name: ILike(`%${req.query.q ? req.query.q : ''}%`) },
            { ip_domain: ILike(`%${req.query.q ? req.query.q : ''}%`) },
            { api_key: ILike(`%${req.query.q ? req.query.q : ''}%`) }
          ],
          order: {
            ...((req.query.sort && req.query.order) ? {
              [req.query.sort]: req.query.order.toUpperCase()
            } : {
              created_at: 'DESC',
              id: 'ASC'
            })
          },
          relations: ['user_'],
          skip: req.query.page > 0 ? (req.query.page * req.query.row - req.query.row) : 0,
          take: (req.query.row > 0 && req.query.row <= 500) ? req.query.row : 10
        });
        for (const c of corss) {
          if ('user_' in c && c.user_) {
            delete c.user_.role;
            delete c.user_.password;
            delete c.user_.session_token;
            delete c.user_.created_at;
            delete c.user_.updated_at;
          }
        }
        return res.status(200).json({
          info: `😅 200 - Cors API :: List All 🤣`,
          count,
          pages: Math.ceil(count / (req.query.row ? req.query.row : 10)),
          results: corss
        });
      } else {
        return res.status(401).json({
          info: '🙄 401 - Cors API :: Authorisasi Pengguna Gagal 😪',
          result: {
            message: 'Khusus Admin / Moderator!'
          }
        });
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      info: `🙄 400 - Cors API :: Gagal Mencari Cors ${req.query.id} 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// POST `/api/cors`
router.post('/', isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user.verified) {
      if ('name' in req.body && 'ip_domain' in req.body) {
        const corsRepo = getRepository(ApiKey);
        const corss = await corsRepo.find({
          where: [
            {
              user_: {
                id: Equal(req.user.id)
              }
            }
          ],
          relations: ['user_']
        });
        if (
          corss.length >= 1 &&
          req.user.role !== Role.ADMIN &&
          req.user.role !== Role.MODERATOR &&
          req.user.role !== Role.FANSUBBER
        ) {
          return res.status(400).json({
            info: '🙄 400 - Cors API :: Gagal Menambah Cors Baru 😪',
            result: {
              message: 'Pengguna Biasa Hanya Bisa Memiliki 1 Api Key!'
            }
          });
        } else {
          const cors = new ApiKey();
          cors.name = req.body.name;
          cors.ip_domain = req.body.ip_domain;
          cors.api_key = universalBtoa(new Date().getTime());
          const userRepo = getRepository(User);
          const user = await userRepo.findOneOrFail({
            where: [
              { id: Equal(req.user.id) }
            ]
          });
          cors.user_ = user;
          const resCorsSave = await corsRepo.save(cors);
          if ('user_' in resCorsSave && resCorsSave.user_) {
            delete resCorsSave.user_.role;
            delete resCorsSave.user_.password;
            delete resCorsSave.user_.session_token;
            delete resCorsSave.user_.created_at;
            delete resCorsSave.user_.updated_at;
          }
          return res.status(200).json({
            info: `😅 200 - Cors API :: Tambah Baru 🤣`,
            result: resCorsSave
          });
        }
      } else {
        throw new Error('Data Tidak Lengkap!');
      }
    } else {
      return res.status(400).json({
        info: '🙄 400 - Cors API :: Gagal Menambah Cors Baru 😪',
        result: {
          message: 'Khusus Pengguna Terverifikasi!'
        }
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: '🙄 400 - Cors API :: Gagal Menambah Cors Baru 😪',
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// PUT `/api/cors/:id`
router.put('/:id', isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user.verified) {
      if ('name' in req.body || 'ip_domain' in req.body) {
        try {
          const corsRepo = getRepository(ApiKey);
          const cors = await corsRepo.findOneOrFail({
            where: [
              { id: Equal(req.params.id) }
            ],
            relations: ['user_']
          });
          if (req.user.id === cors.user_.id) {
            if (req.body.name) {
              cors.name = req.body.name;
            }
            if (req.body.ip_domain) {
              cors.ip_domain = req.body.ip_domain;
            }
            const resCorsSave = await corsRepo.save(cors);
            if ('user_' in resCorsSave && resCorsSave.user_) {
              delete resCorsSave.user_.role;
              delete resCorsSave.user_.password;
              delete resCorsSave.user_.session_token;
              delete resCorsSave.user_.created_at;
              delete resCorsSave.user_.updated_at;
            }
            return res.status(200).json({
              info: `😅 200 - Cors API :: Ubah ${req.params.id} 🤣`,
              result: resCorsSave
            });
          } else {
            return res.status(401).json({
              info: '🙄 401 - Cors API :: Authorisasi Kepemilikan Gagal 😪',
              result: {
                message: 'Cors Milik Orang Lain!'
              }
            });
          }
        } catch (err) {
          console.error(err);
          return next(createError(404));
        }
      } else {
        throw new Error('Data Tidak Lengkap!');
      }
    } else {
      return res.status(400).json({
        info: `🙄 400 - Cors API :: Gagal Mengubah Cors ${req.params.id} 😪`,
        result: {
          message: 'Khusus Pengguna Terverifikasi!'
        }
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: `🙄 400 - Cors API :: Gagal Mengubah Cors ${req.params.id} 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// DELETE `/api/cors/:id`
router.delete('/:id', isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user.role === Role.ADMIN || req.user.role === Role.MODERATOR) {
      const corsRepo = getRepository(ApiKey);
      const cors = await corsRepo.findOneOrFail({
        where: [
          {
            id: req.params.id,
            user_: Not(IsNull())
          },
        ],
        relations: ['user_']
      });
      const revokedUser = await corsRepo.remove(cors);
      if ('user_' in revokedUser && revokedUser.user_) {
        delete revokedUser.user_.role;
        delete revokedUser.user_.password;
        delete revokedUser.user_.session_token;
        delete revokedUser.user_.created_at;
        delete revokedUser.user_.updated_at;
      }
      return res.status(200).json({
        info: `😅 200 - Cors API :: Berhasil Revoke ${req.params.id} 🤣`,
        result: revokedUser
      });
    } else {
      return res.status(401).json({
        info: '🙄 401 - Cors API :: Authorisasi Pengguna Gagal 😪',
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
