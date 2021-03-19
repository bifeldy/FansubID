import { Router, Response } from 'express';
import { getRepository, Like } from 'typeorm';

import { UserRequest } from '../../models/UserRequest';

import { NihongoBook } from '../../entities/NihongoBook';

import edictRouter from './edict';
import kanjiRouter from './kanji';
import kanjivgRouter from './kanjivg';
import tatoebaRouter from './tatoeba';

const router = Router();

router.use('/edict', edictRouter);
router.use('/kanji', kanjiRouter);
router.use('/kanjivg', kanjivgRouter);
router.use('/tatoeba', tatoebaRouter);

// GET `/api/nihongo`
router.get('/', async (req: UserRequest, res: Response) => {
  console.log('asdasdasdasd');
  try {
    const bookRepo = getRepository(NihongoBook);
    const [book, count] = await bookRepo.findAndCount({
      where: [
        { name: Like(`%${req.query.q ? req.query.q : ''}%`) }
      ],
      order: {
        ...((req.query.sort && req.query.order) ? {
          [req.query.sort]: req.query.order.toUpperCase()
        } : {
          created_at: 'DESC',
          name: 'ASC'
        })
      },
      relations: ['user_'],
      skip: req.query.page > 0 ? (req.query.page * req.query.row - req.query.row) : 0,
      take: (req.query.row > 0 && req.query.row <= 500) ? req.query.row : 10
    });
    for (const n of book) {
      delete n.description;
      if ('user_' in n && n.user_) {
        delete n.user_.role;
        delete n.user_.password;
        delete n.user_.session_token;
        delete n.user_.created_at;
        delete n.user_.updated_at;
      }
    }
    return res.status(200).json({
      info: `😅 200 - Book API :: List All 🤣`,
      count,
      pages: Math.ceil(count / (req.query.row ? req.query.row : 10)),
      results: book
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: `🙄 400 - Book API :: Gagal Mendapatkan All Book 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// POST `/api/nihongo`
router.post('/', (req: UserRequest, res: Response) => {
  // Create New Book
});

// GET `/api/nihongo/:bookId`
router.get('/:bookId', (req: UserRequest, res: Response) => {
  // Get Book Detail + All Chapters
});

// PUT `/api/nihongo/:bookId`
router.put('/:bookId', (req: UserRequest, res: Response) => {
  // Update Book Detail
});

// DELETE `/api/nihongo/:bookId`
router.delete('/:bookId', (req: UserRequest, res: Response) => {
  // Delete Book
});

// POST `/api/nihongo/:bookId`
router.post('/:bookId', (req: UserRequest, res: Response) => {
  // Create New Chapter
});

// GET `/api/nihongo/:bookId/:chapterId`
router.get('/:bookId/:chapterId', (req: UserRequest, res: Response) => {
  // Get Chapter Detail
});

// PUT `/api/nihongo/:bookId/:chapterId`
router.put('/:bookId/:chapterId', (req: UserRequest, res: Response) => {
  // Update Chapter Detail
});

// DELETE `/api/nihongo/:bookId/:chapterId`
router.delete('/:bookId/:chapterId', (req: UserRequest, res: Response) => {
  // Delete Chapter
});

export default router;
