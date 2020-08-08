import createError from 'http-errors';
import request from 'request';

import { Router, Response, NextFunction } from 'express';

import { UserRequest } from '../models/UserRequest';

const router = Router();

const jikanV3 = 'http://api.jikan.moe/v3';
const jikanV4 = 'http://api.jikan.moe/v4-alpha';

const seasonal = [
  { id: 1, name: 'winter' }, { id: 2, name: 'spring' },
  { id: 3, name: 'summer' }, { id: 4, name: 'fall' }
];

// GET `/api/anime`
router.get('/', (req: UserRequest, res: Response, next: NextFunction) => {
  const currDate = new Date();
  const year = req.query.year || currDate.getFullYear();
  const season = req.query.season || seasonal.find(sB => sB.id === Math.ceil((currDate.getMonth() + 1) / 3)).name;
  return request({
    method: 'GET',
    uri: `${jikanV3}/season/${year}/${season}`
  }, (error, result, body) => {
    return res.status(result.statusCode).json({
      info: `😅 Anime API :: Seasonal ${season} ${year} 🤣`,
      results: JSON.parse(body).anime
    });
  });
});

// GET `/api/anime/:id`
router.get('/:id', (req: UserRequest, res: Response, next: NextFunction) => {
  return request({
    method: 'GET',
    uri: `${jikanV4}/anime/${req.params.id}`
  }, (error, result, body) => {
    return res.status(result.statusCode).json({
      info: `😅 Anime API :: Detail ${req.params.id} 🤣`,
      result: JSON.parse(body).data
    });
  });
});

// POST `/api/anime/fansubs`
router.post('/fansub', async (req: UserRequest, res: Response, next: NextFunction) => {
  const animeId = Array.isArray(req.params.animeId) ? req.params.animeId : [];
  // try {
  //   const fansubRepo = getRepository(Fansub);
  //   const fansub = await fansubRepo.findOneOrFail(req.params.id);
  //   fansub.urls = JSON.parse(fansub.urls) || null;
  //   fansub.tags = JSON.parse(fansub.tags) || null;
  //   res.status(200).json({
  //     info: `😅 Anime API :: Fansub ${animeId} 🤣`,
  //     result: fansub
  //   });
  // } catch (error) {
  return next(createError(404));
  // }
});

// POST `/api/anime/berkas`
router.post('/berkas', async (req: UserRequest, res: Response, next: NextFunction) => {
  const animeId = Array.isArray(req.params.animeId) ? req.params.animeId : [];
  // try {
  //   const fansubRepo = getRepository(Fansub);
  //   const fansub = await fansubRepo.findOneOrFail(req.params.id);
  //   fansub.urls = JSON.parse(fansub.urls) || null;
  //   fansub.tags = JSON.parse(fansub.tags) || null;
  //   res.status(200).json({
  //     info: `😅 Anime API :: Berkas ${animeId} 🤣`,
  //     result: fansub
  //   });
  // } catch (error) {
  return next(createError(404));
  // }
});

export default router;
