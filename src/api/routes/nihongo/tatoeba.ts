import createError from 'http-errors';

import { Router, Response, NextFunction } from 'express';
import { Equal, getRepository, Like } from 'typeorm';

import { UserRequest } from '../../models/UserRequest';

import { Tatoeba } from '../../entities/Tatoeba';

const router = Router();

// GET `/api/nihongo/tatoeba`
router.get('/', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const tatoebaRepo = getRepository(Tatoeba);
    const [tatoebas, count] = await tatoebaRepo.findAndCount({
      where: [
        { phrase: Like(`%${req.query.q ? req.query.q : ''}%`) },
        { kanji: Like(`%${req.query.q ? req.query.q : ''}%`) }
      ],
      order: {
        ...((req.query.sort && req.query.order) ? {
          [req.query.sort]: req.query.order.toUpperCase()
        } : {
          created_at: 'DESC',
          id: 'ASC'
        })
      },
      skip: req.query.page > 0 ? (req.query.page * req.query.row - req.query.row) : 0,
      take: (req.query.row > 0 && req.query.row <= 100) ? req.query.row : 10
    });
    return res.status(200).json({
      info: `😅 200 - Tatoeba API :: List All 🤣`,
      count,
      results: tatoebas
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: `🙄 400 - Tatoeba API :: Gagal Mendapatkan All Tatoebas 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// GET `/api/nihongo/tatoeba/:id`
router.get('/:id', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const tatoebaRepo = getRepository(Tatoeba);
    const tatoeba = await tatoebaRepo.findOneOrFail({
      where: [
        { id: Equal(req.params.id) }
      ]
    });
    return res.status(200).json({
      info: `😅 200 - Tatoeba API :: Detail ${req.params.id} 🤣`,
      result: tatoeba
    });
  } catch (error) {
    console.error(error);
    return next(createError(404));
  }
});

export default router;
