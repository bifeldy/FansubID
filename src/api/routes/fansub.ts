import createError from 'http-errors';

import { Router, Response, NextFunction } from 'express';
import { getRepository, Equal } from 'typeorm';

import { UserRequest } from '../models/UserRequest';

import { Fansub } from '../entities/Fansub';
import { Berkas } from '../entities/Berkas';

import { universalAtob } from '../helpers/base64';

// Middleware
import auth from '../middlewares/auth';

const router = Router();

// GET `/api/fansub`
router.get('/', async (req: UserRequest, res: Response, next: NextFunction) => {
  const fansubRepo = getRepository(Fansub);
  const [fansubs, count] = await fansubRepo.findAndCount({
    order: {
      name: 'ASC',
      active: 'DESC'
    }
  });
  for (const f of fansubs) {
    delete f.description;
    // delete f.updated_at;
    f.urls = JSON.parse(f.urls);
    f.tags = JSON.parse(f.tags);
  }
  res.status(200).json({
    info: `😅 200 - Fansub API :: List All 🤣`,
    count,
    results: fansubs
  });
});

// POST `/api/fansub`
router.post('/', auth.isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    req.body = JSON.parse(universalAtob(req.body.data));
    if (
      'name' in req.body && 'born' in req.body && 'slug' in req.body &&
      ('urls' in req.body && Array.isArray(req.body.urls) && req.body.urls.length > 0)
    ) {
      const fansubRepo = getRepository(Fansub);
      const fansub = new Fansub();
      fansub.name = req.body.name;
      fansub.born = new Date(req.body.born);
      fansub.slug = req.body.slug;
      const filteredUrls = [];
      for (const u of req.body.urls) {
        if ('url' in u && 'name' in u && u.url && u.name) {
          filteredUrls.push(u);
        }
      }
      fansub.urls = JSON.stringify(filteredUrls);
      if (req.body.image) {
        fansub.image_url = req.body.image;
      } else {
        fansub.image_url = '/favicon.ico';
      }
      if (req.body.tags && Array.isArray(req.body.tags) && req.body.tags.length > 0) {
        const filteredTagsUnique = [...new Set(req.body.tags)];
        fansub.tags = JSON.stringify(filteredTagsUnique);
      }
      if (req.body.description) {
        fansub.description = req.body.description;
      }
      if (req.body.active) {
        fansub.active = req.body.active;
      }
      const resFansubSave = await fansubRepo.save(fansub);
      res.status(200).json({
        info: `😅 200 - Fansub API :: Tambah Baru 🤣`,
        result: resFansubSave
      });
    } else {
      throw new Error('Data Tidak Lengkap!');
    }
  } catch (error) {
    res.status(400).json({
      info: '🙄 400 - Gagal Menambah Fansub Baru! 😪',
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// GET `/api/fansub/berkas?id=`
router.get('/berkas', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const fansubId = req.query.id.split(',').map(Number);
    if (Array.isArray(fansubId) && fansubId.length > 0) {
      const fileRepo = getRepository(Berkas);
      const [files, count] = await fileRepo
        .createQueryBuilder('berkas')
        .leftJoinAndSelect('berkas.project_type_', 'project_type_')
        .leftJoinAndSelect('berkas.anime_', 'anime_')
        .leftJoinAndSelect('berkas.user_', 'user_')
        .leftJoinAndSelect('berkas.fansub_', 'fansub_')
        .where('fansub_.id IN (:...id)', { id: fansubId })
        .andWhere('berkas.private = :isPrivate', { isPrivate: false })
        .andWhere('berkas.name LIKE :query', { query: `%${req.query.q ? req.query.q : ''}%` })
        .orderBy('berkas.created_at', 'DESC')
        .addOrderBy('berkas.name', 'ASC')
        .skip(req.query.page > 0 ? (req.query.page * req.query.row - req.query.row) : 0)
        .take(req.query.row > 0 ? req.query.row : 10)
        .getManyAndCount();
      const results: any = {};
      for (const i of fansubId) {
        results[i] = [];
      }
      for (const f of files) {
        delete f.private;
        delete f.download_url;
        delete f.description;
        // delete f.updated_at;
        if ('project_type_' in f && f.project_type_) {
          delete f.project_type_.created_at;
          // delete f.project_type_.updated_at;
        }
        if ('anime_' in f && f.anime_) {
          delete f.anime_.created_at;
          // delete f.anime_.updated_at;
        }
        if ('user_' in f && f.user_) {
          delete f.user_.role;
          delete f.user_.password;
          delete f.user_.session_token;
          delete f.user_.created_at;
          // delete f.user_.updated_at;
        }
        if ('fansub_' in f && f.fansub_) {
          for (const fansub of f.fansub_) {
            delete fansub.description;
            delete fansub.urls;
            delete fansub.tags;
            delete fansub.created_at;
            // delete fansub.updated_at;
            if (fansubId.includes(fansub.id)) {
              results[fansub.id].push(f);
            }
          }
        }
      }
      res.status(200).json({
        info: `😅 200 - Berkas Fansub API :: ${fansubId.join(', ')} 🤣`,
        count, results
      });
    } else {
      throw new Error('Data Tidak Lengkap!');
    }
  } catch (error) {
    res.status(400).json({
      info: `🙄 400 - Gagal Mencari Berkas :: ${req.query.id} 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// GET `/api/fansub/anime?id=`
router.get('/anime', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const fansubId = req.query.id.split(',').map(Number);
    if (Array.isArray(fansubId) && fansubId.length > 0) {
      const fileRepo = getRepository(Berkas);
      const [files, count] = await fileRepo
        .createQueryBuilder('berkas')
        .leftJoinAndSelect('berkas.anime_', 'anime_')
        .leftJoinAndSelect('berkas.fansub_', 'fansub_')
        .where('fansub_.id IN (:...id)', { id: fansubId })
        .getManyAndCount();
      const results: any = {};
      for (const i of fansubId) {
        results[i] = [];
      }
      for (const f of files) {
        if ('anime_' in f && f.anime_) {
          delete f.anime_.created_at;
          // delete f.anime_.updated_at;
        }
        if ('fansub_' in f && f.fansub_) {
          for (const fansub of f.fansub_) {
            if (fansubId.includes(fansub.id)) {
              results[fansub.id].push(f.anime_);
            }
          }
        }
      }
      for (const [key, value] of Object.entries(results)) {
        results[key] = (value as any).filter((a, b, c) => c.findIndex(d => (d.id === a.id)) === b);
      }
      res.status(200).json({
        info: `😅 200 - Anime Fansub API :: ${fansubId.join(', ')} 🤣`,
        count, results
      });
    } else {
      throw new Error('Data Tidak Lengkap!');
    }
  } catch (error) {
    res.status(400).json({
      info: `🙄 400 - Gagal Mencari Anime :: ${req.query.id} 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// GET `/api/fansub/:id`
router.get('/:id', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const fansubRepo = getRepository(Fansub);
    const fansub = await fansubRepo.findOneOrFail({
      where: [
        { id: Equal(req.params.id) }
      ]
    });
    fansub.urls = JSON.parse(fansub.urls);
    fansub.tags = JSON.parse(fansub.tags);
    res.status(200).json({
      info: `😅 200 - Fansub API :: Detail ${req.params.id} 🤣`,
      result: fansub
    });
  } catch (error) {
    return next(createError(404));
  }
});

// PUT `/api/fansub/:id`
router.put('/:id', auth.isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    req.body = JSON.parse(universalAtob(req.body.data));
    if (
      'name' in req.body || 'born' in req.body || 'description' in req.body ||
      'slug' in req.body || 'active' in req.body || 'image' in req.body ||
      ('tags' in req.body && Array.isArray(req.body.tags) && req.body.tags.length > 0) ||
      ('urls' in req.body && Array.isArray(req.body.urls) && req.body.urls.length > 0)
    ) {
      const fansubRepo = getRepository(Fansub);
      const fansub = await fansubRepo.findOneOrFail({
        where: [
          { id: Equal(req.params.id) }
        ]
      });
      if (req.body.name) {
        fansub.name = req.body.name;
      }
      if (req.body.born) {
        fansub.born = req.body.born;
      }
      if (req.body.description) {
        fansub.description = req.body.description;
      }
      if (req.body.slug) {
        fansub.born = req.body.slug;
      }
      if (req.body.active) {
        fansub.active = req.body.active;
      }
      if (req.body.image) {
        fansub.image_url = req.body.image;
      }
      if (req.body.tags) {
        const filteredTagsUnique = [...new Set(req.body.tags)];
        fansub.tags = JSON.stringify(filteredTagsUnique);
      }
      if (req.body.urls) {
        const filteredUrls = [];
        for (const u of req.body.urls) {
          if ('url' in u && 'name' in u && u.url && u.name) {
            filteredUrls.push(u);
          }
        }
        fansub.urls = JSON.stringify(filteredUrls);
      }
      const resFansubSave = await fansubRepo.save(fansub);
      res.status(200).json({
        info: `😅 200 - Fansub API :: Ubah ${req.params.id} 🤣`,
        result: resFansubSave
      });
    } else {
      throw new Error('Data Tidak Lengkap!');
    }
  } catch (error) {
    res.status(400).json({
      info: `🙄 400 - Gagal Mengubah Fansub :: ${req.params.id} 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

export default router;
