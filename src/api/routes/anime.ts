import fetch from 'node-fetch';
import translate from '@iamtraction/google-translate';

import { URL } from 'url';
import { Router, Response, NextFunction } from 'express';
import { getRepository, ILike, In, Equal, FindManyOptions } from 'typeorm';

import { environment } from '../../environments/api/environment';

import { UserRequest } from '../models/UserRequest';

import { cacheGet, cachePut } from '../helpers/cache';
import { log } from '../helpers/logger';

import { isAuthorized, isLogin } from '../middlewares/auth';

import { Berkas } from '../entities/Berkas';
import { Anime } from '../entities/Anime';

const router = Router();

const seasonal = [
  { id: 1, name: 'winter' }, { id: 2, name: 'spring' },
  { id: 3, name: 'summer' }, { id: 4, name: 'fall' }
];

// GET `/api/anime`
router.get('/', async (req: UserRequest, res: Response, next: NextFunction) => {
  const searchQuery = req.query.q || '';
  const searchType = req.query.type || '';
  const cacheData = cacheGet(req.originalUrl);
  if (cacheData) {
    return res.status(cacheData.status).json(cacheData.body);
  } else {
    try {
      const url = new URL(`${environment.externalApiAnime}/anime`);
      url.searchParams.append('q', searchQuery);
      url.searchParams.append('type', searchType);
      const res_raw = await fetch(url, {
        method: 'GET',
        headers: environment.nodeJsXhrHeader
      });
      const res_json = await res_raw.json();
      log(`[apiAnime] 🔥 ${res_raw.status}`, res_json);
      if (res_raw.ok) {
        let data = res_json.data;
        for (let i = 0; i < data.length; i++) {
          data[i].image_url = data[i].images.jpg?.image_url || data[i].images.webp?.image_url;
        }
        const responseBody = {
          info: `😅 ${res_raw.status} - Anime API :: Search ${searchQuery} 🤣`,
          results: data
        };
        if (data.length > 0) {
          cachePut(req.originalUrl, { status: res_raw.status, body: responseBody }, environment.externalApiCacheTime);
        }
        return res.status(res_raw.status).json(responseBody);
      } else {
        throw new Error('Gagal Tarik Data Anime');
      }
    } catch (error) {
      console.error(error);
      return res.status(200).json({
        info: `😅 200 - Anime API :: Search ${searchQuery} 🤣`,
        results: []
      });
    }
  }
});

// POST `/api/anime`
router.post('/', isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
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

// PATCH `/api/anime/seasonal`
router.patch('/seasonal', async (req: UserRequest, res: Response, next: NextFunction) => {
  const currDate = new Date();
  const year = req.query.year || currDate.getFullYear();
  const season = req.query.season || seasonal.find(sB => sB.id === Math.ceil((currDate.getMonth() + 1) / 3)).name;
  const cacheData = cacheGet(req.originalUrl);
  if (cacheData) {
    return res.status(cacheData.status).json(cacheData.body);
  } else {
    try {
      const url = new URL(`${environment.externalApiAnime}/seasons/${year}/${season}`);
      const res_raw = await fetch(url, {
        method: 'GET',
        headers: environment.nodeJsXhrHeader
      });
      const res_json = await res_raw.json();
      log(`[apiAnime] 🔥 ${res_raw.status}`, res_json);
      if (res_raw.ok) {
        let data = res_json.data;
        for (let i = 0; i < data.length; i++) {
          data[i].image_url = data[i].images.jpg?.image_url || data[i].images.webp?.image_url;
        }
        const responseBody = {
          info: `😅 ${res_raw.status} - Anime API :: Seasonal ${season} ${year} 🤣`,
          results: data
        };
        if (data.length > 0) {
          cachePut(req.originalUrl, { status: res_raw.status, body: responseBody }, environment.externalApiCacheTime);
        }
        return res.status(res_raw.status).json(responseBody);
      } else {
        throw new Error('Gagal Tarik Data Anime');
      }
    } catch (error) {
      console.error(error);
      return res.status(200).json({
        info: `😅 200 - Anime API :: Seasonal ${season} ${year} 🤣`,
        results: []
      });
    }
  }
});

// PATCH `/api/anime/berkas?id=`
router.patch('/berkas', isLogin, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const animeId = req.query.id ? req.query.id.split(',').map(Number) : req.body.id;
    if (Array.isArray(animeId) && animeId.length > 0) {
      const fileRepo = getRepository(Berkas);
      const [files, count] = await fileRepo.findAndCount({
        where: [
          {
            ...((req.user?.verified) ? {
              // Verified User Can See Private Berkas
            } : {
              private: false
            }),
            name: ILike(`%${req.query.q ? req.query.q : ''}%`),
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
        take: (req.query.row > 0 && req.query.row <= 500) ? req.query.row : 10
      });
      const results: any = {};
      for (const i of animeId) {
        results[i] = [];
      }
      for (const f of files) {
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

// PATCH `/api/anime/fansubs?id=`
router.patch('/fansub', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const animeId = req.query.id ? req.query.id.split(',').map(Number) : req.body.id;
    if (Array.isArray(animeId) && animeId.length > 0) {
      const fileRepo = getRepository(Berkas);
      const findOpt: FindManyOptions<Berkas> = {
        where: [
          {
            anime_: {
              id: In(animeId)
            }
          }
        ],
        relations: ['fansub_', 'anime_']
      };
      if (animeId.length === 1) {
        findOpt.skip = req.query.page > 0 ? (req.query.page * req.query.row - req.query.row) : 0;
        findOpt.take = (req.query.row > 0 && req.query.row <= 500) ? req.query.row : 10;
      }
      const files = await fileRepo.find(findOpt);
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
      let count = 0;
      for (const i of animeId) {
        count += results[i].length;
      }
      return res.status(200).json({
        info: `😅 200 - Anime API :: Fansub 🤣`,
        count,
        pages: (animeId.length > 1 ? 1 : Math.ceil(count / (req.query.row ? req.query.row : 10))),
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

// GET `/api/anime/:malSlug`
router.get('/:malSlug', async (req: UserRequest, res: Response, next: NextFunction) => {
  const malId = req.params.malSlug.split('-')[0];
  const cacheData = cacheGet(req.originalUrl);
  if (cacheData) {
    return res.status(cacheData.status).json(cacheData.body);
  } else {
    try {
      const url = new URL(`${environment.externalApiAnime}/anime/${malId}`);
      const res_raw = await fetch(url, {
        method: 'GET',
        headers: environment.nodeJsXhrHeader
      });
      const res_json = await res_raw.json();
      log(`[apiAnime] 🔥 ${res_raw.status}`, res_json);
      if (res_raw.ok) {
        let httpStatusCode = res_raw.status;
        const animeDetail = res_json.data;
        animeDetail.image_url = animeDetail.images.jpg?.image_url || animeDetail.images.webp?.image_url;
        try {
          if ('synopsis' in animeDetail && animeDetail.synopsis) {
            const translatedAnimeSynopsis = await translate(animeDetail.synopsis, { to: 'id' });
            animeDetail.synopsis = translatedAnimeSynopsis.text;
          }
        } catch (err) {
          console.error(err);
          httpStatusCode = 202;
          animeDetail.message = 'Penerjemah / Alih Bahasa Gagal!';
        }
        const responseBody = {
          info: `😅 ${httpStatusCode} - Anime API :: Detail ${malId} 🤣`,
          result: animeDetail
        };
        if (animeDetail) {
          cachePut(req.originalUrl, { status: httpStatusCode, body: responseBody }, environment.externalApiCacheTime);
        }
        return res.status(httpStatusCode).json(responseBody);
      } else {
        throw new Error('Gagal Tarik Data Anime');
      }
    } catch (error) {
      console.error(error);
      return res.status(200).json({
        info: `😅 200 - Anime API :: Detail ${malId} 🤣`,
        result: null
      });
    }
  }
});

export default router;
