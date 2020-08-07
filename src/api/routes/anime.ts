import { Router, Request, Response, NextFunction } from 'express';
import request from 'request';

const router = Router();

const jikanV3 = 'http://api.jikan.moe/v3';
const jikanV4 = 'http://api.jikan.moe/v4-alpha';

const seasonal = [
  { id: 1, name: 'winter' }, { id: 2, name: 'spring' },
  { id: 3, name: 'summer' }, { id: 4, name: 'fall' }
];

// GET `/api/anime`
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  const currDate = new Date();
  const year = req.query.year || currDate.getFullYear();
  const season = req.query.season || seasonal.find(sB => sB.id === Math.ceil((currDate.getMonth() + 1) / 3)).name;
  return request({
    method: 'GET',
    uri: `${jikanV3}/season/${year}/${season}`
  }, (error, result, body) => {
    return res.json({
      info: `😅 Seasonal Anime API :: ${season} ${year} 🤣`,
      results: JSON.parse(body).anime
    });
  });
});

// GET `/api/anime/:id`
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  return request({
    method: 'GET',
    uri: `${jikanV4}/anime/${req.params.id}`
  }, (error, result, body) => {
    return res.json({
      info: `😅 Detail Anime API :: ${req.params.id} 🤣`,
      result: JSON.parse(body).data
    });
  });
});

export default router;
