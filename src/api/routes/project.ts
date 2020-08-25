import createError from 'http-errors';

import { Router, Response, NextFunction } from 'express';
import { getRepository, Equal } from 'typeorm';

import { UserRequest } from '../models/UserRequest';

import { ProjectType } from '../entities/ProjectType';

// Middleware
import auth from '../middlewares/auth';

const router = Router();

// GET `/api/project`
router.get('/', async (req: UserRequest, res: Response, next: NextFunction) => {
  const projectRepo = getRepository(ProjectType);
  const [projects, count] = await projectRepo.findAndCount({
    skip: req.query.page > 0 ? (req.query.page * req.query.row - req.query.row) : 0,
    take: req.query.row > 0 ? req.query.row : 10
  });
  for (const p of projects) {
    delete p.description;
    // delete p.updated_at;
  }
  res.status(200).json({
    info: `😅 200 - Project Type API :: List All 🤣`,
    count,
    results: projects
  });
});

// POST `/api/project`
router.post('/', auth.isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  if (
    'name' in req.body
  ) {
    const projectRepo = getRepository(ProjectType);
    const project = new ProjectType();
    project.name = req.body.name;
    project.image_url = req.body.image_url || '/favicon.ico';
    if (req.body.description) {
      project.description = req.body.description;
    }
    const resProjectSave = await projectRepo.save(project);
    res.status(200).json({
      info: `😅 200 - Project Type API :: Tambah Baru 🤣`,
      result: resProjectSave
    });
  } else {
    res.status(400).json({
      info: '🙄 400 - Gagal Menambah Jenis Project Baru! 😪',
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// GET `/api/project/:id`
router.get('/:id', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const projectRepo = getRepository(ProjectType);
    const project = await projectRepo.findOneOrFail({
      where: [
        { id: Equal(req.params.id) }
      ]
    });
    res.status(200).json({
      info: `😅 200 - Project Type API :: Detail ${req.params.id} 🤣`,
      result: project
    });
  } catch (error) {
    return next(createError(404));
  }
});

// PUT `/api/project/:id`
router.put('/:id',  auth.isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (
      'name' in req.body ||
      'description' in req.body ||
      'image_url' in req.body
    ) {
      const projectRepo = getRepository(ProjectType);
      const project = await projectRepo.findOneOrFail({
        where: [
          { id: Equal(req.params.id) }
        ]
      });
      if (req.body.name) {
        project.name = req.body.name;
      }
      if (req.body.description) {
        project.description = req.body.description;
      }
      if (req.body.image_url) {
        project.image_url = req.body.image_url;
      }
      const resProjectSave = await projectRepo.save(project);
      res.status(200).json({
        info: `😅 200 - Project Type API :: Ubah ${req.params.id} 🤣`,
        result: resProjectSave
      });
    } else {
      throw new Error('Data Tidak Lengkap!');
    }
  } catch (error) {
    res.status(400).json({
      info: `🙄 400 - Gagal Mengubah Jenis Project :: ${req.params.id} 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

export default router;
