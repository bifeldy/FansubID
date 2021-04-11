import createError from 'http-errors';

import { Router, Response, NextFunction } from 'express';
import { getRepository, ILike, Equal } from 'typeorm';

import { UserRequest } from '../models/UserRequest';

import { Role } from '../../app/_shared/models/Role';

import { LikeDislike } from '../entities/LikeDislike';
import { User } from '../entities/User';
import { Berkas } from '../entities/Berkas';
import { Fansub } from '../entities/Fansub';

// Middleware
import auth from '../middlewares/auth';

const router = Router();

// GET `/api/likedislike?tipe=&id=`
router.get('/', auth.isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user.role === Role.ADMIN || req.user.role === Role.MODERATOR) {
      const likedislikeRepo = getRepository(LikeDislike);
      const [likedislike, count] = await likedislikeRepo.findAndCount({
        where: [
          {
            ...((req.query.type && req.query.id) ? {
              [`${req.query.type}_`]: {
                id: Equal(req.query.id)
              }
            } : {
              //
            })
          }
        ],
        order: {
          ...((req.query.sort && req.query.order) ? {
            [req.query.sort]: req.query.order.toUpperCase()
          } : {
            created_at: 'DESC'
          })
        },
        relations: ['berkas_', 'fansub_', 'user_', 'report_by_'],
        skip: req.query.page > 0 ? (req.query.page * req.query.row - req.query.row) : 0,
        take: (req.query.row > 0 && req.query.row <= 500) ? req.query.row : 10
      });
      for (const l of likedislike) {
        if ('berkas_' in l && l.berkas_) {
          delete l.berkas_.description;
          delete l.berkas_.download_url;
          delete l.berkas_.private;
          delete l.berkas_.created_at;
          delete l.berkas_.updated_at;
        }
        if ('fansub_' in l && l.fansub_) {
          delete l.fansub_.description;
          delete l.fansub_.urls;
          delete l.fansub_.tags;
          delete l.fansub_.created_at;
          delete l.fansub_.updated_at;
        }
        if ('user_' in l && l.user_) {
          delete l.user_.role;
          delete l.user_.password;
          delete l.user_.session_token;
          delete l.user_.created_at;
          delete l.user_.updated_at;
        }
        if ('report_by_' in l && l.report_by_) {
          delete l.report_by_.role;
          delete l.report_by_.password;
          delete l.report_by_.session_token;
          delete l.report_by_.created_at;
          delete l.report_by_.updated_at;
        }
      }
      return res.status(200).json({
        info: `😅 200 - Like Dislike API :: List All 🤣`,
        count,
        pages: Math.ceil(count / (req.query.row ? req.query.row : 10)),
        results: likedislike
      });
    } else {
      return res.status(401).json({
        info: '🙄 401 - Like Dislike API :: Authorisasi Pengguna Gagal 😪',
        result: {
          message: 'Khusus Admin / Moderator!'
        }
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      info: `🙄 400 - Like Dislike API :: Gagal Mencari Like Dislike ${req.query.id} @ ${req.query.type} 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// GET `/api/likedislike/:type/:idSlugUsername`
router.get('/:type/:idSlugUsername', auth.isLogin, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    let selectedRepo = null;
    let selected = null;
    if (req.params.type === 'berkas') {
      selectedRepo = getRepository(Berkas);
      selected = await selectedRepo.findOneOrFail({
        where: [
          { id: Equal(req.params.idSlugUsername) }
        ]
      });
    } else if (req.params.type === 'fansub') {
      selectedRepo = getRepository(Fansub);
      selected = await selectedRepo.findOneOrFail({
        where: [
          { slug: ILike(req.params.idSlugUsername) }
        ]
      });
    } else if (req.params.type === 'user') {
      selectedRepo = getRepository(User);
      selected = await selectedRepo.findOneOrFail({
        where: [
          { username: ILike(req.params.idSlugUsername) }
        ]
      });
    } else {
      // Other Url Target In Hikki API -- e.g '/news/:newsId'
    }
    if (req.params.type === 'berkas' || req.params.type === 'fansub' || req.params.type === 'user') {
      const likedislikeRepo = getRepository(LikeDislike);
      const likedislike = await likedislikeRepo.query(`
        SELECT
          type, COUNT(*) AS count
        FROM
          public.like_dislike
        WHERE
          ${req.params.type}_id = $1
        GROUP BY type
        ORDER BY type ASC
      `, [selected.id]);
      if (req.user) {
        const myReport = await likedislikeRepo.find({
          where: [
            {
              [`${req.params.type}_`]: {
                id: Equal(selected.id)
              },
              report_by_: {
                id: Equal(req.user.id)
              }
            }
          ],
          relations: ['berkas_', 'fansub_', 'user_', 'report_by_']
        });
        if (myReport.length <= 0) {
          return res.status(200).json({
            info: `😅 200 - Like Dislike API :: Statistik Report 🤣`,
            result: {
              statistics: likedislike,
              myReport: null
            }
          });
        } else if (myReport.length === 1) {
          if ('berkas_' in myReport[0] && myReport[0].berkas_) {
            delete myReport[0].berkas_.description;
            delete myReport[0].berkas_.download_url;
            delete myReport[0].berkas_.private;
            delete myReport[0].berkas_.created_at;
            delete myReport[0].berkas_.updated_at;
          }
          if ('fansub_' in myReport[0] && myReport[0].fansub_) {
            delete myReport[0].fansub_.description;
            delete myReport[0].fansub_.urls;
            delete myReport[0].fansub_.tags;
            delete myReport[0].fansub_.created_at;
            delete myReport[0].fansub_.updated_at;
          }
          if ('user_' in myReport[0] && myReport[0].user_) {
            delete myReport[0].user_.role;
            delete myReport[0].user_.password;
            delete myReport[0].user_.session_token;
            delete myReport[0].user_.created_at;
            delete myReport[0].user_.updated_at;
          }
          if ('report_by_' in myReport[0] && myReport[0].report_by_) {
            delete myReport[0].report_by_.role;
            delete myReport[0].report_by_.password;
            delete myReport[0].report_by_.session_token;
            delete myReport[0].report_by_.created_at;
            delete myReport[0].report_by_.updated_at;
          }
          return res.status(200).json({
            info: `😅 200 - Like Dislike API :: Statistik Report 🤣`,
            result: {
              statistics: likedislike,
              myReport: myReport[0]
            }
          });
        } else {
          throw new Error('Data Duplikat');
        }
      } else {
        return res.status(200).json({
          info: `😅 200 - Like Dislike API :: Statistik Report 🤣`,
          result: {
            statistics: likedislike,
            myReport: null
          }
        });
      }
    } else {
      throw new Error('Data Tidak Lengkap');
    }
  } catch (error) {
    console.error(error);
    return next(createError(404));
  }
});

// POST `/api/likedislike/:type/:idSlugUsername`
router.post('/:type/:idSlugUsername', auth.isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    let selectedRepo = null;
    let selected = null;
    if (req.params.type === 'berkas') {
      selectedRepo = getRepository(Berkas);
      selected = await selectedRepo.findOneOrFail({
        where: [
          { id: Equal(req.params.idSlugUsername) }
        ]
      });
    } else if (req.params.type === 'fansub') {
      selectedRepo = getRepository(Fansub);
      selected = await selectedRepo.findOneOrFail({
        where: [
          { slug: ILike(req.params.idSlugUsername) }
        ]
      });
    } else if (req.params.type === 'user') {
      selectedRepo = getRepository(User);
      selected = await selectedRepo.findOneOrFail({
        where: [
          { username: ILike(req.params.idSlugUsername) }
        ]
      });
    } else {
      // Other Url Target In Hikki API -- e.g '/news/:newsId'
    }
    const likedislikeRepo = getRepository(LikeDislike);
    const likedislike = await likedislikeRepo.find({
      where: [
        {
          [`${req.params.type}_`]: {
            id: Equal(selected.id)
          },
          report_by_: {
            id: Equal(req.user.id)
          }
        }
      ],
      relations: ['berkas_', 'fansub_', 'user_', 'report_by_']
    });
    if (likedislike.length <= 0) {
      const ldl = new LikeDislike();
      ldl[`${req.params.type}_`] = selected;
      ldl.type = req.body.likedislike;
      const userRepo = getRepository(User);
      const visitorUser = await userRepo.findOneOrFail({
        where: [
          { id: Equal(req.user.id) }
        ]
      });
      ldl.report_by_ = visitorUser;
      const resLdlSave = await likedislikeRepo.save(ldl);
      if ('berkas_' in resLdlSave && resLdlSave.berkas_) {
        delete resLdlSave.berkas_.description;
        delete resLdlSave.berkas_.download_url;
        delete resLdlSave.berkas_.private;
        delete resLdlSave.berkas_.created_at;
        delete resLdlSave.berkas_.updated_at;
      }
      if ('fansub_' in resLdlSave && resLdlSave.fansub_) {
        delete resLdlSave.fansub_.description;
        delete resLdlSave.fansub_.urls;
        delete resLdlSave.fansub_.tags;
        delete resLdlSave.fansub_.created_at;
        delete resLdlSave.fansub_.updated_at;
      }
      if ('user_' in resLdlSave && resLdlSave.user_) {
        delete resLdlSave.user_.role;
        delete resLdlSave.user_.password;
        delete resLdlSave.user_.session_token;
        delete resLdlSave.user_.created_at;
        delete resLdlSave.user_.updated_at;
      }
      if ('report_by_' in resLdlSave && resLdlSave.report_by_) {
        delete resLdlSave.report_by_.role;
        delete resLdlSave.report_by_.password;
        delete resLdlSave.report_by_.session_token;
        delete resLdlSave.report_by_.created_at;
        delete resLdlSave.report_by_.updated_at;
      }
      return res.status(200).json({
        info: `😅 200 - Like Dislike API :: Berhasil Report 🤣`,
        result: resLdlSave
      });
    } else if (likedislike.length === 1) {
      let auditedLikedislike = null;
      if (!req.body.likedislike) {
        auditedLikedislike = await likedislikeRepo.remove(likedislike[0]);
      } else {
        likedislike[0].type = req.body.likedislike;
        auditedLikedislike = await likedislikeRepo.save(likedislike[0]);
      }
      if ('berkas_' in auditedLikedislike && auditedLikedislike.berkas_) {
        delete auditedLikedislike.berkas_.description;
        delete auditedLikedislike.berkas_.download_url;
        delete auditedLikedislike.berkas_.private;
        delete auditedLikedislike.berkas_.created_at;
        delete auditedLikedislike.berkas_.updated_at;
      }
      if ('fansub_' in auditedLikedislike && auditedLikedislike.fansub_) {
        delete auditedLikedislike.fansub_.description;
        delete auditedLikedislike.fansub_.urls;
        delete auditedLikedislike.fansub_.tags;
        delete auditedLikedislike.fansub_.created_at;
        delete auditedLikedislike.fansub_.updated_at;
      }
      if ('user_' in auditedLikedislike && auditedLikedislike.user_) {
        delete auditedLikedislike.user_.role;
        delete auditedLikedislike.user_.password;
        delete auditedLikedislike.user_.session_token;
        delete auditedLikedislike.user_.created_at;
        delete auditedLikedislike.user_.updated_at;
      }
      if ('report_by_' in auditedLikedislike && auditedLikedislike.report_by_) {
        delete auditedLikedislike.report_by_.role;
        delete auditedLikedislike.report_by_.password;
        delete auditedLikedislike.report_by_.session_token;
        delete auditedLikedislike.report_by_.created_at;
        delete auditedLikedislike.report_by_.updated_at;
      }
      return res.status(200).json({
        info: `😅 200 - Like Dislike API :: Berhasil Audit Report ${auditedLikedislike.id} 🤣`,
        result: auditedLikedislike
      });
    } else {
      throw new Error('Data Duplikat');
    }
  } catch (error) {
    console.error(error);
    return next(createError(404));
  }
});

// DELETE `/api/likedislike/:id`
router.delete('/:id', auth.isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user.role === Role.ADMIN || req.user.role === Role.MODERATOR) {
      const likedislikeRepo = getRepository(LikeDislike);
      const likedislike = await likedislikeRepo.findOneOrFail({
        where: [
          { id: req.params.id }
        ],
        relations: ['berkas_', 'fansub_', 'user_', 'report_by_']
      });
      const deletedLikedislike = await likedislikeRepo.remove(likedislike);
      if ('berkas_' in deletedLikedislike && deletedLikedislike.berkas_) {
        delete deletedLikedislike.berkas_.description;
        delete deletedLikedislike.berkas_.download_url;
        delete deletedLikedislike.berkas_.private;
        delete deletedLikedislike.berkas_.created_at;
        delete deletedLikedislike.berkas_.updated_at;
      }
      if ('fansub_' in deletedLikedislike && deletedLikedislike.fansub_) {
        delete deletedLikedislike.fansub_.description;
        delete deletedLikedislike.fansub_.urls;
        delete deletedLikedislike.fansub_.tags;
        delete deletedLikedislike.fansub_.created_at;
        delete deletedLikedislike.fansub_.updated_at;
      }
      if ('user_' in deletedLikedislike && deletedLikedislike.user_) {
        delete deletedLikedislike.user_.role;
        delete deletedLikedislike.user_.password;
        delete deletedLikedislike.user_.session_token;
        delete deletedLikedislike.user_.created_at;
        delete deletedLikedislike.user_.updated_at;
      }
      if ('report_by_' in deletedLikedislike && deletedLikedislike.report_by_) {
        delete deletedLikedislike.report_by_.role;
        delete deletedLikedislike.report_by_.password;
        delete deletedLikedislike.report_by_.session_token;
        delete deletedLikedislike.report_by_.created_at;
        delete deletedLikedislike.report_by_.updated_at;
      }
      return res.status(200).json({
        info: `😅 200 - Like Dislike API :: Berhasil Menghapus Like Dislike ${req.params.id} 🤣`,
        result: deletedLikedislike
      });
    } else {
      return res.status(401).json({
        info: '🙄 401 - Like Dislike API :: Authorisasi Pengguna Gagal 😪',
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
