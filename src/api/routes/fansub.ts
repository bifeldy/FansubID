import createError from 'http-errors';

import { Router, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { UserRequest } from '../models/UserRequest';

import { Fansub } from '../entities/Fansub';

// Middleware
import auth from '../middlewares/auth';

const router = Router();

// GET `/api/fansub`
router.get('/', async (req: UserRequest, res: Response, next: NextFunction) => {
  const fansubRepo = getRepository(Fansub);
  const fansubs = await fansubRepo.find();
  fansubs.forEach(f => {
    delete f.description;
    delete f.created_at;
    delete f.updated_at;
    f.urls = JSON.parse(f.urls) || null;
    f.tags = JSON.parse(f.tags) || null;
  });
  res.status(200).json({
    info: `😅 Fansub API :: List All 🤣`,
    results: fansubs
  });
});

// GET `/api/fansub/:id`
router.get('/:id', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const fansubRepo = getRepository(Fansub);
    const fansub = await fansubRepo.findOneOrFail(req.params.id);
    fansub.urls = JSON.parse(fansub.urls) || null;
    fansub.tags = JSON.parse(fansub.tags) || null;
    res.status(200).json({
      info: `😅 Fansub API :: Detail ${req.params.id} 🤣`,
      result: fansub
    });
  } catch (error) {
    return next(createError(404));
  }
});

// POST `/api/fansub`
router.post('/', auth.isAuthorized , async (req: UserRequest, res: Response, next: NextFunction) => {
  if (
    'name' in req.body &&
    'urls' in req.body && Array.isArray(req.body.urls) && req.body.urls.length > 0 &&
    'born' in req.body &&
    'slug' in req.body
  ) {
    const fansubRepo = getRepository(Fansub);
    const fansub = new Fansub();
    fansub.name = req.body.name;
    fansub.born = req.body.born;
    fansub.slug = req.body.slug;
    const filteredUrls = [];
    req.body.urls.forEach(u => {
      if ('url' in u && 'name' in u) {
        filteredUrls.push(u);
      }
    });
    fansub.urls = JSON.stringify(filteredUrls);
    if (req.body.tags && Array.isArray(req.body.tags) && req.body.tags.length > 0) {
      const filteredTagsUnique = [...new Set(req.body.tags)];
      fansub.tags = JSON.stringify(filteredTagsUnique);
    }
    if (req.body.description) {
      fansub.description = req.body.description;
    }
    if (req.body.image_url) {
      fansub.image_url = req.body.image_url;
    }
    const resFansubSave = await fansubRepo.save(fansub);
    res.status(200).json({
      info: `😅 Fansub API :: Tambah Baru 🤣`,
      results: resFansubSave
    });
  } else {
    res.status(400).json({
      info: '🙄 400 - Gagal Menambah Fansub Baru! 😪',
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// PUT `/api/fansub/:id`
router.put('/:id',  auth.isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (
      'name' in req.body || 'born' in req.body || 'description' in req.body || 'image_url' in req.body || 'slug' in req.body ||
      ('tags' in req.body && Array.isArray(req.body.tags) && req.body.tags.length > 0) ||
      ('urls' in req.body && Array.isArray(req.body.urls) && req.body.urls.length > 0)
    ) {
      const fansubRepo = getRepository(Fansub);
      const fansub = await fansubRepo.findOneOrFail(req.params.id);
      if (req.body.name) {
        fansub.name = req.body.name;
      }
      if (req.body.born) {
        fansub.born = req.body.born;
      }
      if (req.body.slug) {
        fansub.born = req.body.slug;
      }
      if (req.body.description) {
        fansub.description = req.body.description;
      }
      if (req.body.image_url){
        fansub.image_url = req.body.image_url;
      }
      if (req.body.urls){
        const filteredUrls = [];
        req.body.urls.forEach(u => {
          if ('url' in u && 'name' in u) {
            filteredUrls.push(u);
          }
        });
        fansub.urls = JSON.stringify(filteredUrls);
      }
      if (req.body.tags){
        const filteredTagsUnique = [...new Set(req.body.tags)];
        fansub.tags = JSON.stringify(filteredTagsUnique);
      }
      const resFansubSave = await fansubRepo.save(fansub);
      res.status(200).json({
        info: `😅 Fansub API :: Ubah ${req.params.id} 🤣`,
        results: resFansubSave
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

// POST `/api/fansub/anime`
router.post('/anime', async (req: UserRequest, res: Response, next: NextFunction) => {
  const fansubsId = Array.isArray(req.params.fansubsId) ? req.params.fansubsId : [];
  // try {
  //   const fansubRepo = getRepository(Fansub);
  //   const fansub = await fansubRepo.findOneOrFail(req.params.id);
  //   fansub.urls = JSON.parse(fansub.urls) || null;
  //   fansub.tags = JSON.parse(fansub.tags) || null;
  //   res.status(200).json({
  //     info: `😅 Fansub API :: Anime ${fansubsId} 🤣`,
  //     result: fansub
  //   });
  // } catch (error) {
  return next(createError(404));
  // }
});

// POST `/api/fansub/berkas`
router.post('/berkas', async (req: UserRequest, res: Response, next: NextFunction) => {
  const fansubsId = Array.isArray(req.params.fansubsId) ? req.params.fansubsId : [];
  // try {
  //   const fansubRepo = getRepository(Fansub);
  //   const fansub = await fansubRepo.findOneOrFail(req.params.id);
  //   fansub.urls = JSON.parse(fansub.urls) || null;
  //   fansub.tags = JSON.parse(fansub.tags) || null;
  //   res.status(200).json({
  //     info: `😅 Fansub API :: Berkas ${fansubsId} 🤣`,
  //     result: fansub
  //   });
  // } catch (error) {
  return next(createError(404));
  // }
});

export default router;
