import createError from 'http-errors';
import request from 'request';

import { Router, Response, NextFunction } from 'express';
import { getRepository, Like, Equal, In } from 'typeorm';

import { UserRequest } from '../models/UserRequest';

import { Berkas } from '../entities/Berkas';

const router = Router();

const jikanV3 = 'http://api.jikan.moe/v3';
const jikanV4 = 'http://api.jikan.moe/v4-alpha';

const seasonal = [
  { id: 1, name: 'winter' }, { id: 2, name: 'spring' },
  { id: 3, name: 'summer' }, { id: 4, name: 'fall' }
];

// GET `/api/anime`
router.get('/', async (req: UserRequest, res: Response, next: NextFunction) => {
  return next(createError(404));
});

// GET `/api/anime/seasonal`
router.get('/seasonal', async (req: UserRequest, res: Response, next: NextFunction) => {
  const currDate = new Date();
  const year = req.query.year || currDate.getFullYear();
  const season = req.query.season || seasonal.find(sB => sB.id === Math.ceil((currDate.getMonth() + 1) / 3)).name;
  return request({
    method: 'GET',
    uri: `${jikanV3}/season/${year}/${season}`
  }, async (error, result, body) => {
    res.status(result.statusCode).json({
      info: `😅 Anime API :: Seasonal ${season} ${year} 🤣`,
      results: JSON.parse(body).anime
    });
  });
});

// POST `/api/anime/berkas`
router.post('/berkas', async (req: UserRequest, res: Response, next: NextFunction) => {
  const animeId = Array.isArray(req.body.animeId) ? req.body.animeId : [];
  try {
    if (animeId.length > 0) {
      const fileRepo = getRepository(Berkas);
      const [files, count] = await fileRepo.findAndCount({
        where: [
          {
            mal_id: In(animeId),
            private: false,
            name: Like(`%${req.query.q ? req.query.q : ''}%`)
          }
        ],
        order: {
          updated_at: 'DESC',
          created_at: 'DESC',
          name: 'ASC'
        },
        relations: ['project_type_', 'fansub_', 'user_'],
        skip: req.query.page > 0 ? (req.query.page * req.query.row - req.query.row) : 0,
        take: req.query.row > 0 ? req.query.row : 10
      });
      const results: any = {};
      for (const i of animeId) {
        results[i] = [];
      }
      for (const f of files) {
        const date = new Date(f.created_at);
        f.created_at = (
          ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + '@' + ' ' +
          ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2) as any
        );
        delete f.private;
        delete f.download_url;
        delete f.description;
        delete f.updated_at;
        delete f.project_type_.created_at;
        delete f.project_type_.updated_at;
        delete f.fansub_.description;
        delete f.fansub_.urls;
        delete f.fansub_.tags;
        delete f.fansub_.created_at;
        delete f.fansub_.updated_at;
        delete f.user_.role;
        delete f.user_.password;
        delete f.user_.session_token;
        delete f.user_.created_at;
        delete f.user_.updated_at;
        results[f.mal_id].push(f);
      }
      res.status(200).json({
        info: `😅 Berkas Anime API :: ${animeId.join(', ')} 🤣`,
        count, results
      });
    } else {
      throw new Error('Data Tidak Lengkap!');
    }
  } catch (error) {
    res.status(400).json({
      info: `🙄 400 - Gagal Mencari Berkas :: ${animeId.join(', ')} 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// POST `/api/anime/fansubs`
router.post('/fansub', async (req: UserRequest, res: Response, next: NextFunction) => {
  const animeId = Array.isArray(req.body.animeId) ? req.body.animeId : [];
  try {
    if (animeId.length > 0) {
      const fileRepo = getRepository(Berkas);
      const [files, count] = await fileRepo.findAndCount({
        where: [
          { mal_id: In([animeId]) }
        ],
        relations: ['fansub_']
      });
      const results: any = {};
      for (const i of animeId) {
        results[i] = [];
      }
      for (const f of files) {
        delete f.fansub_.description;
        delete f.fansub_.urls;
        delete f.fansub_.tags;
        delete f.fansub_.created_at;
        delete f.fansub_.updated_at;
        results[f.mal_id].push(f.fansub_);
      }
      for (const [key, value] of Object.entries(results)) {
        results[key] = (value as any).filter((a, b, c) => c.findIndex(d => (d.id === a.id)) === b);
      }
      res.status(200).json({
        info: `😅 Fansub Anime API :: ${animeId.join(', ')} 🤣`,
        count, results
      });
    } else {
      throw new Error('Data Tidak Lengkap!');
    }
  } catch (error) {
    res.status(400).json({
      info: `🙄 400 - Gagal Mencari Fansub :: ${animeId.join(', ')} 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// GET `/api/anime/:id`
router.get('/:id', async (req: UserRequest, res: Response, next: NextFunction) => {
  return request({
    method: 'GET',
    uri: `${jikanV4}/anime/${req.params.id}`
  }, async (error, result, body) => {
    res.status(result.statusCode).json({
      info: `😅 Anime API :: Detail ${req.params.id} 🤣`,
      result: JSON.parse(body).data
    });
  });
});

export default router;
