import request from 'postman-request';
import translate from '@iamtraction/google-translate';
import cache from 'memory-cache';

import { Router, Response, NextFunction } from 'express';
import { getRepository, ILike, In, Equal, FindManyOptions } from 'typeorm';

import { environment } from '../../environments/server/environment';

import { UserRequest } from '../models/UserRequest';

import { isLogin, isAuthorized } from '../middlewares/auth';

import { Berkas } from '../entities/Berkas';
import { Dorama } from '../entities/Dorama';

const router = Router();

const seasonal = [
  { id: 1, name: 'winter' }, { id: 2, name: 'spring' },
  { id: 3, name: 'summer' }, { id: 4, name: 'fall' }
];

// GET `/api/dorama`
router.get('/', async (req: UserRequest, res: Response, next: NextFunction) => {
  const searchQuery = req.query.q || '';
  const searchType = req.query.type || '';
  const cacheData = cache.get(req.originalUrl);
  if (cacheData) {
    return res.status(cacheData.status).json(cacheData.body);
  } else {
    return request({
      method: 'GET',
      uri: `${environment.externalApiDorama}/search/q/${searchQuery}`,
      headers: environment.nodeJsXhrHeader
    }, async (error, result, body) => {
      if (error || !result) {
        console.error(error);
        return res.status(200).json({
          info: `😅 200 - Dorama API :: Search ${searchQuery} 🤣`,
          results: []
        });
      } else {
        const statusCode = result.statusCode;
        let data = [];
        try {
          data = JSON.parse(body).results.filter(x => x.type.toLowerCase().includes(searchType));
        } catch (e) {
          console.error(e);
        }
        const responseBody = {
          info: `😅 ${statusCode} - Dorama API :: Search ${searchQuery} 🤣`,
          results: data
        };
        if (data.length > 0) {
          cache.put(req.originalUrl, { status: statusCode, body: responseBody }, environment.externalApiCacheTime);
        }
        return res.status(statusCode).json(responseBody);
      }
    });
  }
});

// POST `/api/dorama`
router.post('/', isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if ('id' in req.body && 'name' in req.body && 'image_url' in req.body) {
      const doramaRepo = getRepository(Dorama);
      const doramas = await doramaRepo.find({
        where: [
          { id: Equal(req.body.id) }
        ]
      });
      if (doramas.length === 0) {
        const dorama = new Dorama();
        dorama.id = req.body.id;
        dorama.slug = req.body.slug;
        dorama.name = req.body.name;
        dorama.image_url = req.body.image_url;
        dorama.type = req.body.type;
        const resultSaveDorama = await doramaRepo.save(dorama);
        return res.status(200).json({
          info: `😅 200 - Dorama API :: Tambah Baru 🤣`,
          result: resultSaveDorama
        });
      } else if (doramas.length === 1) {
        const dorama = doramas[0];
        if (req.body.id) {
          dorama.id = req.body.id;
        }
        if (req.body.slug) {
          dorama.slug = req.body.slug;
        }
        if (req.body.name) {
          dorama.name = req.body.name;
        }
        if (req.body.image_url) {
          dorama.image_url = req.body.image_url;
        }
        if (req.body.type) {
          dorama.type = req.body.type;
        }
        const resultSaveDorama = await doramaRepo.save(dorama);
        return res.status(202).json({
          info: `😅 202 - Dorama API :: Data Dorama Diperbaharui 🤣`,
          result: resultSaveDorama
        });
      } else {
        return res.status(202).json({
          info: `😍 202 - Dorama API :: Data Dorama Multi Duplikat 🥰`,
          result: doramas
        });
      }
    } else {
      throw new Error('Data Tidak Lengkap!');
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: `🙄 400 - Dorama API :: Gagal Menambah Dorama 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// PATCH `/api/dorama/seasonal`
router.patch('/seasonal', async (req: UserRequest, res: Response, next: NextFunction) => {
  const currDate = new Date();
  const year = req.query.year || currDate.getFullYear();
  const season = req.query.season || seasonal.find(sB => sB.id === Math.ceil((currDate.getMonth() + 1) / 3)).name;
  const quarter = seasonal.find(sB => sB.name === season).id || Math.ceil((currDate.getMonth() + 1) / 3);
  const cacheData = cache.get(req.originalUrl);
  if (cacheData) {
    return res.status(cacheData.status).json(cacheData.body);
  } else {
    return request({
      method: 'GET',
      uri: `${environment.externalApiDorama}/seasonal/${year}/${quarter}`,
      headers: environment.nodeJsXhrHeader
    }, async (error, result, body) => {
      if (error || !result) {
        console.error(error);
        return res.status(200).json({
          info: `😅 200 - Dorama API :: Seasonal ${season} ${year} 🤣`,
          results: []
        });
      } else {
        const statusCode = result.statusCode;
        let data = [];
        try {
          data = JSON.parse(body);
        } catch (e) {
          console.error(e);
        }
        const responseBody = {
          info: `😅 ${statusCode} - Dorama API :: Seasonal ${season} ${year} 🤣`,
          results: data
        };
        if (data.length > 0) {
          cache.put(req.originalUrl, { status: statusCode, body: responseBody }, environment.externalApiCacheTime);
        }
        return res.status(statusCode).json(responseBody);
      }
    });
  }
});

// PATCH `/api/dorama/berkas?id=`
router.patch('/berkas', isLogin, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const doramaId = req.query.id ? req.query.id.split(',') : req.body.id;
    if (Array.isArray(doramaId) && doramaId.length > 0) {
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
            dorama_: {
              id: In(doramaId)
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
        relations: ['project_type_', 'fansub_', 'user_', 'dorama_'],
        skip: req.query.page > 0 ? (req.query.page * req.query.row - req.query.row) : 0,
        take: (req.query.row > 0 && req.query.row <= 500) ? req.query.row : 10
      });
      const results: any = {};
      for (const i of doramaId) {
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
        if ('dorama_' in f && f.dorama_) {
          delete f.dorama_.created_at;
          delete f.dorama_.updated_at;
        }
        if ('user_' in f && f.user_) {
          delete f.user_.role;
          delete f.user_.password;
          delete f.user_.session_token;
          delete f.user_.created_at;
          delete f.user_.updated_at;
        }
        results[f.dorama_.id].push(f);
      }
      return res.status(200).json({
        info: `😅 200 - Dorama API :: Berkas 🤣`,
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
      info: `🙄 400 - Dorama API :: Gagal Mencari Berkas ${req.query.id} 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// PATCH `/api/dorama/fansubs?id=`
router.patch('/fansub', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const doramaId = req.query.id ? req.query.id.split(',') : req.body.id;
    if (Array.isArray(doramaId) && doramaId.length > 0) {
      const fileRepo = getRepository(Berkas);
      const findOpt: FindManyOptions<Berkas> = {
        where: [
          {
            dorama_: {
              id: In(doramaId)
            }
          }
        ],
        relations: ['fansub_', 'dorama_']
      };
      if (doramaId.length === 1) {
        findOpt.skip = req.query.page > 0 ? (req.query.page * req.query.row - req.query.row) : 0;
        findOpt.take = (req.query.row > 0 && req.query.row <= 500) ? req.query.row : 10;
      }
      const files = await fileRepo.find(findOpt);
      const results: any = {};
      for (const i of doramaId) {
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
            results[f.dorama_.id].push(fansub);
          }
        }
      }
      for (const [key, value] of Object.entries(results)) {
        results[key] = (value as any)
          .filter((a, b, c) => c.findIndex(d => (d.id === a.id)) === b)
          .sort((a, b) => (a.name > b.name) ? 1 : -1);
      }
      let count = 0;
      for (const i of doramaId) {
        count += results[i].length;
      }
      return res.status(200).json({
        info: `😅 200 - Dorama API :: Fansub 🤣`,
        count,
        pages: (doramaId.length > 1 ? 1 : Math.ceil(count / (req.query.row ? req.query.row : 10))),
        results
      });
    } else {
      throw new Error('Data Tidak Lengkap!');
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: `🙄 400 - Dorama API :: Gagal Mencari Fansub ${req.query.id} 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// GET `/api/dorama/:mdlSlug`
router.get('/:mdlSlug', async (req: UserRequest, res: Response, next: NextFunction) => {
  const mdlId = req.params.mdlSlug.split('-')[0];
  const cacheData = cache.get(req.originalUrl);
  if (cacheData) {
    return res.status(cacheData.status).json(cacheData.body);
  } else {
    return request({
      method: 'GET',
      uri: `${environment.externalApiDorama}/id/${req.params.mdlSlug}`,
      headers: environment.nodeJsXhrHeader
    }, async (error, result, body) => {
      if (error || !result) {
        console.error(error);
        return res.status(200).json({
          info: `😅 200 - Dorama API :: Detail ${mdlId} 🤣`,
          result: null
        });
      } else {
        let dramaDetail = null;
        let httpStatusCode = 404;
        try {
          const dramaDetailResponse = JSON.parse(body);
          httpStatusCode = result.statusCode;
          if (httpStatusCode === 200) {
            try {
              if ('synopsis' in dramaDetailResponse.data && dramaDetailResponse.data.synopsis) {
                const translatedDoramaSynopsis = await translate(dramaDetailResponse.data.synopsis, { to: 'id' });
                dramaDetailResponse.data.synopsis = translatedDoramaSynopsis.text;
              }
            } catch (e2) {
              console.error(e2);
              httpStatusCode = 202;
              dramaDetailResponse.data.message = 'Penerjemah / Alih Bahasa Gagal!';
            }
          } else {
            httpStatusCode = dramaDetailResponse.status_code;
          }
          dramaDetail = dramaDetailResponse.data;
        } catch (e1) {
          console.error(e1);
        }
        const responseBody = {
          info: `😅 ${httpStatusCode} - Dorama API :: Detail ${mdlId} 🤣`,
          result: dramaDetail
        };
        if (dramaDetail) {
          cache.put(req.originalUrl, { status: httpStatusCode, body: responseBody }, environment.externalApiCacheTime);
        }
        return res.status(httpStatusCode).json(responseBody);
      }
    });
  }
});

export default router;
