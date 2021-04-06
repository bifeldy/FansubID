import { Router, Response } from 'express';
import { getRepository, ILike, IsNull } from 'typeorm';

import { UserRequest } from '../../models/UserRequest';

import { Lesson } from '../../entities/Lesson';

const router = Router();

// GET `/api/nihongo/lesson`
router.get('/', async (req: UserRequest, res: Response) => {
  try {
    const lessonRepo = getRepository(Lesson);
    const [lesson, count] = await lessonRepo.findAndCount({
      where: [
        {
          title: ILike(`%${req.query.q ? req.query.q : ''}%`),
          rootLesson_: IsNull()
        }
      ],
      order: {
        ...((req.query.sort && req.query.order) ? {
          [req.query.sort]: req.query.order.toUpperCase()
        } : {
          created_at: 'DESC',
          title: 'ASC'
        })
      },
      relations: ['user_'],
      skip: req.query.page > 0 ? (req.query.page * req.query.row - req.query.row) : 0,
      take: (req.query.row > 0 && req.query.row <= 500) ? req.query.row : 10
    });
    for (const l of lesson) {
      delete l.content;
      if ('user_' in l && l.user_) {
        delete l.user_.role;
        delete l.user_.password;
        delete l.user_.session_token;
        delete l.user_.created_at;
        delete l.user_.updated_at;
      }
    }
    return res.status(200).json({
      info: `😅 200 - Lesson API :: List All 🤣`,
      count,
      pages: Math.ceil(count / (req.query.row ? req.query.row : 10)),
      results: lesson
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: `🙄 400 - Lesson API :: Gagal Mendapatkan All Lesson 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// POST `/api/nihongo/lesson`
router.post('/', (req: UserRequest, res: Response) => {
  // Create New Lesson
});

// GET `/api/nihongo/lesson/:lessonId`
router.get('/:lessonId', (req: UserRequest, res: Response) => {
  // Get Lesson Detail + All Chapters
});

// PUT `/api/nihongo/lesson/:lessonId`
router.put('/:lessonId', (req: UserRequest, res: Response) => {
  // Update Lesson Detail
});

// DELETE `/api/nihongo/lesson/:lessonId`
router.delete('/:lessonId', (req: UserRequest, res: Response) => {
  // Delete Lesson
});

// POST `/api/nihongo/lesson/:lessonId`
router.post('/:lessonId', (req: UserRequest, res: Response) => {
  // Create New Chapter
});

// GET `/api/nihongo/lesson/:lessonId/:chapterId`
router.get('/:lessonId/:chapterId', (req: UserRequest, res: Response) => {
  // Get Chapter Detail
});

// PUT `/api/nihongo/lesson/:lessonId/:chapterId`
router.put('/:lessonId/:chapterId', (req: UserRequest, res: Response) => {
  // Update Chapter Detail
});

// DELETE `/api/nihongo/lesson/:lessonId/:chapterId`
router.delete('/:lessonId/:chapterId', (req: UserRequest, res: Response) => {
  // Delete Chapter
});

export default router;
