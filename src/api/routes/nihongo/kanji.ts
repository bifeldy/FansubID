import createError from 'http-errors';

import { Router, Response, NextFunction } from 'express';
import { Equal, getRepository, Like } from 'typeorm';

import { UserRequest } from '../../models/UserRequest';

import { Kanji } from '../../entities/Kanji';

const router = Router();

// GET `/api/nihongo/kanji`
router.get('/', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const kanjiRepo = getRepository(Kanji);
    const [kanjis, count] = await kanjiRepo.findAndCount({
      where: [
        { character: Like(`%${req.query.q ? req.query.q : ''}%`) },
        { v_onyomi: Like(`%${req.query.q ? req.query.q : ''}%`) },
        { v_kunyomi: Like(`%${req.query.q ? req.query.q : ''}%`) }
      ],
      order: {
        ...((req.query.sort && req.query.order) ? {
          [req.query.sort]: req.query.order.toUpperCase()
        } : {
          created_at: 'DESC',
          character: 'ASC'
        })
      },
      skip: req.query.page > 0 ? (req.query.page * req.query.row - req.query.row) : 0,
      take: (req.query.row > 0 && req.query.row <= 100) ? req.query.row : 10
    });
    return res.status(200).json({
      info: `😅 200 - Kanji API :: List All 🤣`,
      count,
      results: kanjis
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: `🙄 400 - Kanji API :: Gagal Mendapatkan All Kanjis 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// GET `/api/nihongo/kanji/:character`
router.get('/:character', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const kanjiRepo = getRepository(Kanji);
    const kanji = await kanjiRepo.findOneOrFail({
      where: [
        { character: Equal(req.params.character) }
      ]
    });
    return res.status(200).json({
      info: `😅 200 - Kanji API :: Detail ${req.params.character} 🤣`,
      result: kanji
    });
  } catch (error) {
    console.error(error);
    return next(createError(404));
  }
});

export default router;
