import { Router, Response } from 'express';

import { UserRequest } from '../../models/UserRequest';

import edictRouter from './edict';
import kanjiRouter from './kanji';
import kanjivgRouter from './kanjivg';
import lessonRouter from './lesson';
import tatoebaRouter from './tatoeba';

const router = Router();

router.use('/edict', edictRouter);
router.use('/kanji', kanjiRouter);
router.use('/kanjivg', kanjivgRouter);
router.use('/lesson', lessonRouter);
router.use('/tatoeba', tatoebaRouter);

// GET `/api/nihongo`
router.get('/', (req: UserRequest, res: Response) => {
  return res.redirect('/documentation');
});

export default router;
