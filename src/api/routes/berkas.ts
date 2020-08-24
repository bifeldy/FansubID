import createError from 'http-errors';
import multer from 'multer';
import fs from 'fs';

import { Router, Response, NextFunction } from 'express';
import { getRepository, Like, Equal, In } from 'typeorm';

import { UserRequest } from '../models/UserRequest';

import { environment } from '../../environments/environment';
import { universalAtob } from '../helpers/base64';

import { ProjectType } from '../entities/ProjectType';
import { User } from '../entities/User';
import { Fansub } from '../entities/Fansub';
import { Berkas } from '../entities/Berkas';
import { Anime } from '../entities/Anime';

// Middleware
import auth from '../middlewares/auth';

// tslint:disable-next-line: typedef
function fileImageFilter(req, file, cb) {
  const typeArray = file.mimetype.split('/');
  const fileType = typeArray[0];
  const fileExt = typeArray[1];
  if (fileType === 'image' && file) {
    if (fileExt === 'gif' || fileExt === 'jpg' || fileExt === 'jpeg' || fileExt === 'png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  } else {
    cb(null, false);
  }
}

const upload = multer({
  dest: environment.uploadFolder + '/img/berkas/',
  fileFilter: fileImageFilter,
  limits: {
    fileSize: 256000
  }
});

const router = Router();

// GET `/api/berkas`
router.get('/', async (req: UserRequest, res: Response, next: NextFunction) => {
  const fileRepo = getRepository(Berkas);
  const [files, count] = await fileRepo.findAndCount({
    where: [
      { private: false, name: Like(`%${req.query.q ? req.query.q : ''}%`) }
    ],
    order: {
      created_at: 'DESC',
      name: 'ASC'
    },
    relations: ['project_type_', 'fansub_', 'user_', 'anime_'],
    skip: req.query.page > 0 ? (req.query.page * req.query.row - req.query.row) : 0,
    take: req.query.row > 0 ? req.query.row : 10
  });
  for (const f of files) {
    delete f.private;
    delete f.download_url;
    delete f.description;
    // delete f.updated_at;
    delete f.project_type_.created_at;
    // delete f.project_type_.updated_at;
    for (const fansub of f.fansub_) {
      delete fansub.description;
      delete fansub.urls;
      delete fansub.tags;
      delete fansub.created_at;
      // delete fansub.updated_at;
    }
    delete f.anime_.created_at;
    // delete f.anime_.updated_at;
    delete f.user_.role;
    delete f.user_.password;
    delete f.user_.session_token;
    delete f.user_.created_at;
    // delete f.user_.updated_at;
  }
  res.status(200).json({
    info: `😅 200 - Berkas API :: List All 🤣`,
    count,
    results: files
  });
});

// POST `/api/berkas`
router.post('/', auth.isAuthorized, upload.single('image'), async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    req.body = JSON.parse(universalAtob(req.body.data));
    if (
      'name' in req.body && 'description' in req.body && 'episode' in req.body && 'projectType_id' in req.body &&
      'download_url' in req.body && Array.isArray(req.body.download_url) && req.body.download_url.length > 0 &&
      'fansub_id' in req.body && Array.isArray(req.body.fansub_id) && req.body.fansub_id.length > 0
    ) {
      const fileRepo = getRepository(Berkas);
      const file = new Berkas();
      const filteredUrls = [];
      for (const u of req.body.download_url) {
        if ('url' in u && 'name' in u && u.url && u.name) {
          filteredUrls.push(u);
        }
      }
      file.name = req.body.name;
      file.download_url = JSON.stringify(filteredUrls);
      file.description = req.body.description;
      file.episode = req.body.episode;
      if (req.body.private) {
        file.private = req.body.private;
      }
      if (req.file) {
        file.image_url = '/img/berkas/' + req.file.filename;
      } else {
        file.image_url = '/favicon.ico';
      }
      const animeRepo = getRepository(Anime);
      const anime = await animeRepo.findOneOrFail({
        where: [
          { id: Equal(req.body.anime_id) }
        ]
      });
      file.anime_ = anime;
      const fansubRepo = getRepository(Fansub);
      const fansub = await fansubRepo.find({
        where: [
          { id: In([req.body.fansub_id]) }
        ]
      });
      file.fansub_ = fansub;
      const projectRepo = getRepository(ProjectType);
      const project = await projectRepo.findOneOrFail({
        where: [
          { id: Equal(req.body.projectType_id) }
        ]
      });
      file.project_type_ = project;
      const userRepo = getRepository(User);
      const user = await userRepo.findOneOrFail({
        where: [
          { id: Equal(req.user.id) }
        ]
      });
      file.user_ = user;
      const resFileSave = await fileRepo.save(file);
      res.status(200).json({
        info: `😅 200 - Berkas API :: Tambah Baru 🤣`,
        results: resFileSave
      });
    } else {
      throw new Error('Data Tidak Lengkap!');
    }
  } catch (error) {
    res.status(400).json({
      info: '🙄 400 - Gagal Menambah Berkas Baru! 😪',
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// GET `/api/berkas/:id`
router.get('/:id', auth.isLogin, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const fileRepo = getRepository(Berkas);
    const file = await fileRepo.findOneOrFail({
      where: [
        { id: Equal(req.params.id) }
      ],
      relations: ['project_type_', 'fansub_', 'user_', 'anime_'],
    });
    file.view_count++;
    const resFileSave = await fileRepo.save(file);
    resFileSave.project_type_ = file.project_type_;
    resFileSave.fansub_ = file.fansub_;
    resFileSave.user_ = file.user_;
    delete resFileSave.project_type_.created_at;
    // delete resFileSave.project_type_.updated_at;
    for (const fansub of resFileSave.fansub_) {
      delete fansub.description;
      delete fansub.urls;
      delete fansub.tags;
      delete fansub.created_at;
      // delete fansub.updated_at;
    }
    delete resFileSave.anime_.created_at;
    // delete resFileSave.anime_.updated_at;
    delete resFileSave.user_.role;
    delete resFileSave.user_.password;
    delete resFileSave.user_.session_token;
    delete resFileSave.user_.created_at;
    // delete resFileSave.user_.updated_at;
    if (req.user) {
      resFileSave.download_url = JSON.parse(resFileSave.download_url) || null;
      if (!req.user.verified) {
        delete resFileSave.ddl_file;
      }
    } else {
      delete resFileSave.download_url;
      delete resFileSave.ddl_file;
    }
    res.status(200).json({
      info: `😅 200 - Berkas API :: Detail ${req.params.id} 🤣`,
      result: resFileSave
    });
  } catch (error) {
    return next(createError(404));
  }
});

// PUT `/api/berkas/:id`
router.put('/:id', auth.isAuthorized, upload.single('image'), async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    req.body = JSON.parse(universalAtob(req.body.data));
    if (
      'name' in req.body || 'description' in req.body || 'private' in req.body ||
      'anime_id' in req.body || 'projectType_id' in req.body ||
      ('file' in req && req.file.mimetype.includes('image')) ||
      ('download_url' in req.body && Array.isArray(req.body.download_url) && req.body.download_url.length > 0) ||
      ('fansub_id' in req.body && Array.isArray(req.body.fansub_id) && req.body.fansub_id.length > 0)
    ) {
      try {
        const fileRepo = getRepository(Berkas);
        const file = await fileRepo.findOneOrFail({
          where: [
            { id: Equal(req.params.id) }
          ],
          relations: ['user_'],
        });
        if (req.user.id === file.user_.id) {
          if (req.body.name) {
            file.name = req.body.name;
          }
          if (req.body.description) {
            file.description = req.body.description;
          }
          if (req.file) {
            fs.unlink(environment.uploadFolder + file.image_url, (err) => { if (err) {}});
            file.image_url = '/img/berkas/' + req.file.filename;
          }
          if (req.body.episode) {
            file.episode = req.body.episode;
          }
          if (req.body.private) {
            file.private = req.body.private;
          }
          if (req.body.anime_id) {
            const animeRepo = getRepository(Anime);
            const anime = await animeRepo.findOneOrFail({
              where: [
                { id: Equal(req.body.anime_id) }
              ]
            });
            file.anime_ = anime;
          }
          if (req.body.download_url) {
            const filteredUrls = [];
            for (const u of req.body.download_url) {
              if ('url' in u && 'name' in u && u.url && u.name) {
                filteredUrls.push(u);
              }
            }
            file.download_url = JSON.stringify(filteredUrls);
          }
          if (req.body.fansub_id) {
            const fansubRepo = getRepository(Fansub);
            const fansub = await fansubRepo.find({
              where: [
                { id: In(req.body.fansub_id) }
              ]
            });
            file.fansub_ = fansub;
          }
          if (req.body.projectType_id) {
            const projectRepo = getRepository(ProjectType);
            const project = await projectRepo.findOneOrFail({
              where: [
                { id: Equal(req.body.projectType_id) }
              ]
            });
            file.project_type_ = project;
          }
          const resFileSave = await fileRepo.save(file);
          res.status(200).json({
            info: `😅 200 - Berkas API :: Ubah ${req.params.id} 🤣`,
            results: resFileSave
          });
        } else {
          res.status(401).json({
            info: '🙄 401 - Authorisasi Kepemilikan Gagal! 😪',
            result: {
              message: 'Berkas Milik Orang Lain!'
            }
          });
        }
      } catch (err) {
        return next(createError(404));
      }
    } else {
      throw new Error('Data Tidak Lengkap!');
    }
  } catch (error) {
    res.status(400).json({
      info: `🙄 400 - Gagal Mengubah Berkas :: ${req.params.id} 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

export default router;
