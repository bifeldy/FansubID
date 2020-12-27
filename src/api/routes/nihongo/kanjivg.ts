import createError from 'http-errors';

import { Router, Response, NextFunction } from 'express';
import { Equal, getRepository, Like } from 'typeorm';

import { UserRequest } from '../../models/UserRequest';

import { Kanjivg } from '../../entities/Kanjivg';

const router = Router();

// GET `/api/nihongo/kanjivg`
router.get('/', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const kanjivgRepo = getRepository(Kanjivg);
    const [kanjivgs, count] = await kanjivgRepo.findAndCount({
      where: [
        { kanji: Like(`%${req.query.q ? req.query.q : ''}%`) }
      ],
      order: {
        ...((req.query.sort && req.query.order) ? {
          [req.query.sort]: req.query.order.toUpperCase()
        } : {
          created_at: 'DESC',
          id: 'ASC',
          kanji: 'ASC'
        })
      },
      skip: req.query.page > 0 ? (req.query.page * req.query.row - req.query.row) : 0,
      take: (req.query.row > 0 && req.query.row <= 100) ? req.query.row : 10
    });
    return res.status(200).json({
      info: `😅 200 - Kanjivg API :: List All 🤣`,
      count,
      results: kanjivgs
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: `🙄 400 - Kanjivg API :: Gagal Mendapatkan All Kanjivgs 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// GET `/api/nihongo/kanjivg/:id`
router.get('/:id', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const kanjivgRepo = getRepository(Kanjivg);
    const kanjivg = await kanjivgRepo.findOneOrFail({
      where: [
        { id: Equal(req.params.id) }
      ]
    });
    return res.status(200).json({
      info: `😅 200 - Kanjivg API :: Detail ${req.params.id} 🤣`,
      result: kanjivg
    });
  } catch (error) {
    console.error(error);
    return next(createError(404));
  }
});

export default router;
