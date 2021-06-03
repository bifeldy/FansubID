import createError from 'http-errors';

import { Router, Response, NextFunction } from 'express';
import { getRepository, ILike } from 'typeorm';

import { UserRequest } from '../../models/UserRequest';

import { Hirakata } from '../../entities/Hirakata';

const router = Router();

// GET `/api/nihongo/hirakata`
router.get('/', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const hirakataRepo = getRepository(Hirakata);
    const [hirakatas, count] = await hirakataRepo.findAndCount({
      where: [
        { romaji: ILike(`%${req.query.q ? req.query.q : ''}%`) },
        { katakana: ILike(`%${req.query.q ? req.query.q : ''}%`) },
        { hiragana: ILike(`%${req.query.q ? req.query.q : ''}%`) }
      ],
      order: {
        ...((req.query.sort && req.query.order) ? {
          [req.query.sort]: req.query.order.toUpperCase()
        } : {
          segment: 'ASC',
          category: 'ASC',
          romaji: 'ASC'
        })
      },
      skip: req.query.page > 0 ? (req.query.page * req.query.row - req.query.row) : 0,
      take: (req.query.row > 0 && req.query.row <= 500) ? req.query.row : 10
    });
    return res.status(200).json({
      info: `😅 200 - Hirakata API :: List All 🤣`,
      count,
      pages: Math.ceil(count / (req.query.row ? req.query.row : 10)),
      results: hirakatas
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: `🙄 400 - Hirakata API :: Gagal Mendapatkan All Hirakatas 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// PATCH `/api/nihongo/hirakata/list-all`
router.patch('/list-all', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const hirakataRepo = getRepository(Hirakata);
    const [hirakatas, count] = await hirakataRepo.findAndCount({
      order: {
        segment: 'ASC',
        category: 'ASC',
        romaji: 'ASC'
      }
    });
    return res.status(200).json({
      info: `😅 200 - Hirakata API :: List All 🤣`,
      count,
      pages: 1,
      results: hirakatas
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: `🙄 400 - Hirakata API :: Gagal Mendapatkan All Hirakata 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// GET `/api/nihongo/hirakata/:romaji`
router.get('/:romaji', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const hirakataRepo = getRepository(Hirakata);
    const hirakata = await hirakataRepo.findOneOrFail({
      where: [
        { romaji: ILike(req.params.romaji) }
      ]
    });
    return res.status(200).json({
      info: `😅 200 - Hirakata API :: Detail ${req.params.romaji} 🤣`,
      result: hirakata
    });
  } catch (error) {
    console.error(error);
    return next(createError(404));
  }
});

export default router;
