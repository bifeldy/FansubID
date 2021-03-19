import { Router, Response } from 'express';

import { UserRequest } from '../../models/UserRequest';

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
router.get('/', (req: UserRequest, res: Response) => {
  // Get All Book
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
