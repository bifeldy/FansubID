import { Router, Response } from 'express';

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
router.get('/', (req, res: Response) => {
  return res.redirect('/nihongo');
});

export default router;
