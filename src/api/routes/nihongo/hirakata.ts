import { Router, Response, NextFunction } from 'express';

import { UserRequest } from '../../models/UserRequest';

const router = Router();

// GET `/api/nihongo/hirakata`
router.get('/', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    //
  } catch (error) {
    //
  }
});

// GET `/api/nihongo/hirakata/:romaji`
router.get('/:romaji', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    //
  } catch (error) {
    //
  }
});

export default router;
