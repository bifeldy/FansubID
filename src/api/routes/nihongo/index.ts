import createError from 'http-errors';

import { Router, Response, NextFunction } from 'express';
import { Equal, getRepository, ILike } from 'typeorm';

import { Role } from '../../../app/_shared/models/Role';

import { UserRequest } from '../../models/UserRequest';

import { Nihongo } from '../../entities/Nihongo';
import { User } from '../../entities/User';

// Middleware
import auth from '../../middlewares/auth';

import edictRouter from './edict';
import kanjiRouter from './kanji';
import kanjivgRouter from './kanjivg';
import lessonRouter from './lesson';
import tatoebaRouter from './tatoeba';
import hirakataRouter from './hirakata';

const router = Router();

router.use('/edict', edictRouter);
router.use('/kanji', kanjiRouter);
router.use('/kanjivg', kanjivgRouter);
router.use('/lesson', lessonRouter);
router.use('/tatoeba', tatoebaRouter);
router.use('/hirakata', hirakataRouter);

// GET `/api/nihongo`
router.get('/', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const kanaRepo = getRepository(Nihongo);
    const [kanas, count] = await kanaRepo.findAndCount({
      where: [
        { romaji: ILike(`%${req.query.q ? req.query.q : ''}%`) },
        { kana: ILike(`%${req.query.q ? req.query.q : ''}%`) },
        { meaning: ILike(`%${req.query.q ? req.query.q : ''}%`) }
      ],
      order: {
        ...((req.query.sort && req.query.order) ? {
          [req.query.sort]: req.query.order.toUpperCase()
        } : {
          created_at: 'DESC',
          romaji: 'ASC'
        })
      },
      skip: req.query.page > 0 ? (req.query.page * req.query.row - req.query.row) : 0,
      take: (req.query.row > 0 && req.query.row <= 500) ? req.query.row : 10
    });
    return res.status(200).json({
      info: `😅 200 - Nihongo Kana API :: List All 🤣`,
      count,
      pages: Math.ceil(count / (req.query.row ? req.query.row : 10)),
      results: kanas
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: `🙄 400 - Nihongo Kana API :: Gagal Mendapatkan All Kanas 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// POST `/api/nihongo`
router.post('/', auth.isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user.verified) {
      if (
        'romaji' in req.body &&
        'kana' in req.body &&
        'meaning' in req.body &&
        'category' in req.body &&
        'image_url' in req.body
      ) {
        const kanaRepo = getRepository(Nihongo);
        const kana = new Nihongo();
        kana.romaji = req.body.romaji;
        kana.kana = req.body.kana;
        kana.meaning = req.body.meaning;
        kana.category = req.body.category;
        kana.image_url = req.body.image_url;
        if (req.body.audio) {
          kana.audio = req.body.audio;
        }
        const userRepo = getRepository(User);
        const user = await userRepo.findOneOrFail({
          where: [
            { id: Equal(req.user.id) }
          ]
        });
        kana.user_ = user;
        const resKanaSave = await kanaRepo.save(kana);
        if ('user_' in resKanaSave && resKanaSave.user_) {
          delete resKanaSave.user_.role;
          delete resKanaSave.user_.password;
          delete resKanaSave.user_.session_token;
          delete resKanaSave.user_.created_at;
          delete resKanaSave.user_.updated_at;
        }
        return res.status(200).json({
          info: `😅 200 - Nihongo Kana API :: Tambah Baru 🤣`,
          result: resKanaSave
        });
      } else {
        throw new Error('Data Tidak Lengkap!');
      }
    } else {
      return res.status(400).json({
        info: '🙄 400 - Nihongo Kana API :: Gagal Menambah Kana Baru 😪',
        result: {
          message: 'Khusus Pengguna Terverifikasi!'
        }
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: '🙄 400 - Nihongo Kana API :: Gagal Menambah Kana Baru 😪',
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// GET `/api/nihongo/:id`
router.get('/:id', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const kanaRepo = getRepository(Nihongo);
    const kana = await kanaRepo.findOneOrFail({
      where: [
        { id: Equal(req.params.id) }
      ],
      relations: ['user_'],
    });
    if ('user_' in kana && kana.user_) {
      delete kana.user_.role;
      delete kana.user_.password;
      delete kana.user_.session_token;
      delete kana.user_.created_at;
      delete kana.user_.updated_at;
    }
    return res.status(200).json({
      info: `😅 200 - Nihongo Kana API :: Detail ${req.params.id} 🤣`,
      result: kana
    });
  } catch (error) {
    console.error(error);
    return next(createError(404));
  }
});

// DELETE `/api/nihongo/:id`
router.delete('/:id', auth.isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user.role === Role.ADMIN || req.user.role === Role.MODERATOR) {
      const kanaRepo = getRepository(Nihongo);
      const kana =  await kanaRepo.findOneOrFail({
        where: [
          { id: Equal(req.params.id) }
        ]
      });
      const deletedKana = await kanaRepo.remove(kana);
      if ('user_' in deletedKana && deletedKana.user_) {
        delete deletedKana.user_.role;
        delete deletedKana.user_.password;
        delete deletedKana.user_.session_token;
        delete deletedKana.user_.created_at;
        delete deletedKana.user_.updated_at;
      }
      return res.status(200).json({
        info: `😅 200 - Nihongo Kana API :: Berhasil Menghapus Kana ${req.params.id} 🤣`,
        result: deletedKana
      });
    } else {
      return res.status(401).json({
        info: '🙄 401 - Nihongo Kana API :: Authorisasi Pengguna Gagal 😪',
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
