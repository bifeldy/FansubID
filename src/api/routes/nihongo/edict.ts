import createError from 'http-errors';

import { Router, Response, NextFunction } from 'express';
import { Equal, getRepository, Like } from 'typeorm';

import { UserRequest } from '../../models/UserRequest';

import { Edict } from '../../entities/Edict';

const router = Router();

// GET `/api/nihongo/edict`
router.get('/', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const edictRepo = getRepository(Edict);
    const [edicts, count] = await edictRepo.findAndCount({
      where: [
        {
          kanji: Like(`%${req.query.q ? req.query.q : ''}%`),
          jlpt: Like(`%${req.query.jlpt ? req.query.jlpt : ''}%`)
        },
        {
          reading: Like(`%${req.query.q ? req.query.q : ''}%`),
          jlpt: Like(`%${req.query.jlpt ? req.query.jlpt : ''}%`)
        },
        {
          meaning: Like(`%${req.query.q ? req.query.q : ''}%`),
          jlpt: Like(`%${req.query.jlpt ? req.query.jlpt : ''}%`)
        }
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
      take: (req.query.row > 0 && req.query.row <= 500) ? req.query.row : 10
    });
    return res.status(200).json({
      info: `😅 200 - Edict API :: List All 🤣`,
      count,
      pages: Math.ceil(count / (req.query.row ? req.query.row : 10)),
      results: edicts
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: `🙄 400 - Edict API :: Gagal Mendapatkan All Edicts 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// GET `/api/nihongo/edict/:id`
router.get('/:id', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const edictRepo = getRepository(Edict);
    const edict = await edictRepo.findOneOrFail({
      where: [
        { id: Equal(req.params.id) }
      ]
    });
    return res.status(200).json({
      info: `😅 200 - Edict API :: Detail ${req.params.id} 🤣`,
      result: edict
    });
  } catch (error) {
    console.error(error);
    return next(createError(404));
  }
});

export default router;
