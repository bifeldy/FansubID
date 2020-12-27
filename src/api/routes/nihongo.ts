import { Router, Response, NextFunction } from 'express';

import { UserRequest } from '../models/UserRequest';

import edictRouter from './nihongo/edict';
import kanjiRouter from './nihongo/kanji';
import kanjivgRouter from './nihongo/kanjivg';
import tatoebaRouter from './nihongo/tatoeba';

const router = Router();

// Child route url
router.use('/edict', edictRouter);
router.use('/kanji', kanjiRouter);
router.use('/kanjivg', kanjivgRouter);
router.use('/tatoeba', tatoebaRouter);

// GET `/api/nihongo`
router.get('/', async (req: UserRequest, res: Response, next: NextFunction) => {
  return res.redirect('/');
});

export default router;
