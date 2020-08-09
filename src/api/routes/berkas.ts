import createError from 'http-errors';

import { Router, Response, NextFunction } from 'express';
import { getRepository, Like, Equal } from 'typeorm';

import { UserRequest } from '../models/UserRequest';

import { ProjectType } from '../entities/ProjectType';
import { User } from '../entities/User';
import { Fansub } from '../entities/Fansub';
import { Berkas } from '../entities/Berkas';

// Middleware
import auth from '../middlewares/auth';

const router = Router();

// GET `/api/berkas`
router.get('/', async (req: UserRequest, res: Response, next: NextFunction) => {
  const fileRepo = getRepository(Berkas);
  const [files, count] = await fileRepo.findAndCount({
    where: [
      { private: false, name: Like(`%${req.query.q ? req.query.q : ''}%`) }
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
  }
  res.status(200).json({
    info: `😅 Berkas API :: List All 🤣`,
    count,
    results: files
  });
});

// POST `/api/berkas`
router.post('/', auth.isAuthorized , async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (
      'name' in req.body &&
      'download_url' in req.body && Array.isArray(req.body.download_url) && req.body.download_url.length > 0
    ) {
      const fileRepo = getRepository(Berkas);
      const file = new Berkas();
      file.name = req.body.name;
      const filteredUrls = [];
      for (const u of req.body.download_url) {
        if ('url' in u && 'name' in u) {
          filteredUrls.push(u);
        }
      }
      file.download_url = JSON.stringify(filteredUrls);
      file.image_url = req.body.image_url || '/favicon.ico';
      if (req.body.mal_id) {
        file.mal_id = req.body.mal_id;
      }
      if (req.body.description) {
        file.description = req.body.description;
      }
      if (req.body.episode) {
        file.episode = req.body.episode;
      }
      const fansubRepo = getRepository(Fansub);
      const fansub = await fansubRepo.findOneOrFail({
        where: [
          { id: Equal(req.body.fansub_id) }
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
      const resFileSave = fileRepo.save(file);
      res.status(200).json({
        info: `😅 Berkas API :: Tambah Baru 🤣`,
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
router.get('/:id', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const fileRepo = getRepository(Berkas);
    const file = await fileRepo.findOneOrFail({
      where: [
        { id: Equal(req.params.id) }
      ],
      relations: ['project_type_', 'fansub_', 'user_'],
    });
    file.view_count++;
    const resFileSave = await fileRepo.save(file);
    resFileSave.project_type_ = file.project_type_;
    resFileSave.fansub_ = file.fansub_;
    resFileSave.user_ = file.user_;
    delete resFileSave.project_type_.created_at;
    delete resFileSave.project_type_.updated_at;
    delete resFileSave.fansub_.description;
    delete resFileSave.fansub_.urls;
    delete resFileSave.fansub_.tags;
    delete resFileSave.fansub_.created_at;
    delete resFileSave.fansub_.updated_at;
    delete resFileSave.user_.role;
    delete resFileSave.user_.password;
    delete resFileSave.user_.session_token;
    delete resFileSave.user_.created_at;
    delete resFileSave.user_.updated_at;
    resFileSave.download_url = JSON.parse(resFileSave.download_url) || null;
    res.status(200).json({
      info: `😅 Berkas API :: Detail ${req.params.id} 🤣`,
      result: resFileSave
    });
  } catch (error) {
    return next(createError(404));
  }
});

// PUT `/api/berkas/:id`
router.put('/:id',  auth.isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (
      'name' in req.body || 'mal_id' in req.body || 'description' in req.body ||
      'image_url' in req.body || 'fansub_id' in req.body || 'projectType_id' in req.body ||
      ('download_url' in req.body && Array.isArray(req.body.download_url) && req.body.download_url.length > 0)
    ) {
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
        if (req.body.image_url){
          file.image_url = req.body.image_url;
        }
        if (req.body.mal_id){
          file.mal_id = req.body.mal_id;
        }
        if (req.body.episode) {
          file.episode = req.body.episode;
        }
        if (req.body.download_url){
          const filteredUrls = [];
          for (const u of req.body.download_url) {
            if ('url' in u && 'name' in u) {
              filteredUrls.push(u);
            }
          }
          file.download_url = JSON.stringify(filteredUrls);
        }
        if (req.body.fansub_id){
          const fansubRepo = getRepository(Fansub);
          const fansub = await fansubRepo.findOneOrFail({
            where: [
              { id: Equal(req.body.fansub_id) }
            ]
          });
          file.fansub_ = fansub;
        }
        if (req.body.projectType_id){
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
          info: `😅 Berkas API :: Ubah ${req.params.id} 🤣`,
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
