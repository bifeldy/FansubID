import request from 'request';
import translate from '@k3rn31p4nic/google-translate-api';

import { Router, Response, NextFunction } from 'express';
import { getRepository, Like, In, Equal } from 'typeorm';

import { UserRequest } from '../models/UserRequest';

import auth from '../middlewares/auth';

import { Berkas } from '../entities/Berkas';
import { Anime } from '../entities/Anime';

const router = Router();

const jikanV3 = 'http://api.jikan.moe/v3';

const seasonal = [
  { id: 1, name: 'winter' }, { id: 2, name: 'spring' },
  { id: 3, name: 'summer' }, { id: 4, name: 'fall' }
];

// GET `/api/anime`
router.get('/', async (req: UserRequest, res: Response, next: NextFunction) => {
  const searchQuery = req.query.q || '';
  const searchType = req.query.type || '';
  return request({
    method: 'GET',
    uri: `${jikanV3}/search/anime?q=${searchQuery}&type=${searchType}`
  }, async (error, result, body) => {
    return res.status(result.statusCode).json({
      info: `😅 ${result.statusCode} - Anime API :: Search ${searchQuery} 🤣`,
      results: (
        'results' in JSON.parse(body)
          ? JSON.parse(body).results
          : []
      )
    });
  });
});

// POST `/api/anime`
router.post('/', auth.isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if ('id' in req.body && 'name' in req.body && 'image_url' in req.body) {
      const animeRepo = getRepository(Anime);
      const animes = await animeRepo.find({
        where: [
          { id: Equal(req.body.id) }
        ]
      });
      if (animes.length === 0) {
        const anime = new Anime();
        anime.id = req.body.id;
        anime.name = req.body.name;
        anime.image_url = req.body.image_url;
        anime.type = req.body.type;
        const resultSaveAnime = await animeRepo.save(anime);
        return res.status(200).json({
          info: `😅 200 - Anime API :: Tambah Baru 🤣`,
          result: resultSaveAnime
        });
      } else if (animes.length === 1) {
        const anime = animes[0];
        if (req.body.id) {
          anime.id = req.body.id;
        }
        if (req.body.name) {
          anime.name = req.body.name;
        }
        if (req.body.image_url) {
          anime.image_url = req.body.image_url;
        }
        if (req.body.type) {
          anime.type = req.body.type;
        }
        const resultSaveAnime = await animeRepo.save(anime);
        return res.status(202).json({
          info: `😅 202 - Anime API :: Data Anime Diperbaharui 🤣`,
          result: resultSaveAnime
        });
      } else {
        return res.status(202).json({
          info: `😍 202 - Anime API :: Data Anime Multi Duplikat 🥰`,
          result: animes
        });
      }
    } else {
      throw new Error('Data Tidak Lengkap!');
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: `🙄 400 - Anime API :: Gagal Menambah Anime 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
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
    return res.status(result.statusCode).json({
      info: `😅 ${result.statusCode} - Anime API :: Seasonal ${season} ${year} 🤣`,
      results: (
        'anime' in JSON.parse(body)
          ? JSON.parse(body).anime
          : []
      )
    });
  });
});

// GET `/api/anime/berkas?id=`
router.get('/berkas', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const animeId = req.query.id.split(',').map(Number);
    if (Array.isArray(animeId) && animeId.length > 0) {
      const fileRepo = getRepository(Berkas);
      const [files, count] = await fileRepo.findAndCount({
        where: [
          {
            name: Like(`%${req.query.q ? req.query.q : ''}%`),
            private: false,
            anime_: {
              id: In(animeId)
            }
          }
        ],
        order: {
          ...((req.query.sort && req.query.order) ? {
            [req.query.sort]: req.query.order.toUpperCase()
          } : {
            created_at: 'DESC',
            name: 'ASC'
          })
        },
        relations: ['project_type_', 'fansub_', 'user_', 'anime_'],
        skip: req.query.page > 0 ? (req.query.page * req.query.row - req.query.row) : 0,
        take: (req.query.row > 0 && req.query.row <= 100) ? req.query.row : 10
      });
      const results: any = {};
      for (const i of animeId) {
        results[i] = [];
      }
      for (const f of files) {
        delete f.private;
        delete f.download_url;
        delete f.description;
        if ('project_type_' in f && f.project_type_) {
          delete f.project_type_.created_at;
          delete f.project_type_.updated_at;
        }
        if ('fansub_' in f && f.fansub_) {
          for (const fansub of f.fansub_) {
            delete fansub.description;
            delete fansub.urls;
            delete fansub.tags;
            delete fansub.created_at;
            delete fansub.updated_at;
          }
        }
        if ('anime_' in f && f.anime_) {
          delete f.anime_.created_at;
          delete f.anime_.updated_at;
        }
        if ('user_' in f && f.user_) {
          delete f.user_.role;
          delete f.user_.password;
          delete f.user_.session_token;
          delete f.user_.created_at;
          delete f.user_.updated_at;
        }
        results[f.anime_.id].push(f);
      }
      return res.status(200).json({
        info: `😅 200 - Anime API :: Berkas 🤣`,
        count,
        pages: Math.ceil(count / (req.query.row ? req.query.row : 10)),
        results
      });
    } else {
      throw new Error('Data Tidak Lengkap!');
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: `🙄 400 - Anime API :: Gagal Mencari Berkas ${req.query.id} 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// GET `/api/anime/fansubs?id=`
router.get('/fansub', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const animeId = req.query.id.split(',').map(Number);
    if (Array.isArray(animeId) && animeId.length > 0) {
      const fileRepo = getRepository(Berkas);
      const [files, count] = await fileRepo.findAndCount({
        where: [
          {
            anime_: {
              id: In([animeId])
            }
          }
        ],
        relations: ['fansub_', 'anime_']
      });
      const results: any = {};
      for (const i of animeId) {
        results[i] = [];
      }
      for (const f of files) {
        if ('fansub_' in f && f.fansub_) {
          for (const fansub of f.fansub_) {
            delete fansub.description;
            delete fansub.urls;
            delete fansub.tags;
            delete fansub.created_at;
            delete fansub.updated_at;
            results[f.anime_.id].push(fansub);
          }
        }
      }
      for (const [key, value] of Object.entries(results)) {
        results[key] = (value as any)
          .filter((a, b, c) => c.findIndex(d => (d.id === a.id)) === b)
          .sort((a, b) => (a.name > b.name) ? 1 : -1);
      }
      return res.status(200).json({
        info: `😅 200 - Anime API :: Fansub 🤣`,
        count,
        pages: Math.ceil(count / (req.query.row ? req.query.row : 10)),
        results
      });
    } else {
      throw new Error('Data Tidak Lengkap!');
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: `🙄 400 - Anime API :: Gagal Mencari Fansub ${req.query.id} 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// GET `/api/anime/:malId`
router.get('/:malId', async (req: UserRequest, res: Response, next: NextFunction) => {
  return request({
    method: 'GET',
    uri: `${jikanV3}/anime/${req.params.malId}`
  }, async (error, result, body) => {
    const animeDetail = JSON.parse(body);
    let httpStatusCode = result.statusCode;
    if ('request_hash' in animeDetail) {
      delete animeDetail.request_hash;
    }
    if ('request_cached' in animeDetail) {
      delete animeDetail.request_cached;
    }
    if ('request_cache_expiry' in animeDetail) {
      delete animeDetail.request_cache_expiry;
    }
    try {
      if ('synopsis' in animeDetail && animeDetail.synopsis) {
        const translatedAnimeSynopsis = await translate(animeDetail.synopsis, { to: 'id' });
        animeDetail.synopsis = translatedAnimeSynopsis.text;
      }
    } catch (error) {
      console.error(error);
      httpStatusCode = 202;
      animeDetail.message = 'Penerjemah / Alih Bahasa Gagal!';
    }
    return res.status(httpStatusCode).json({
      info: `😅 ${httpStatusCode} - Anime API :: Detail ${req.params.malId} 🤣`,
      result: animeDetail
    });
  });
});

export default router;
