import createError from 'http-errors';

import { Router, Response, NextFunction } from 'express';
import { getRepository, Equal } from 'typeorm';

import { UserRequest } from '../models/UserRequest';

import { Role } from '../../app/_shared/models/Role';

import { ProjectType } from '../entities/ProjectType';

// Middleware
import auth from '../middlewares/auth';

const router = Router();

// GET `/api/project`
router.get('/', async (req: UserRequest, res: Response, next: NextFunction) => {
  const projectRepo = getRepository(ProjectType);
  const [projects, count] = await projectRepo.findAndCount({
    order: {
      name: 'ASC'
    }
  });
  for (const p of projects) {
    delete p.description;
  }
  return res.status(200).json({
    info: `😅 200 - Project API :: List All 🤣`,
    count,
    pages: 1,
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
    return res.status(200).json({
      info: `😅 200 - Project API :: Tambah Baru 🤣`,
      result: resProjectSave
    });
  } else {
    return res.status(400).json({
      info: '🙄 400 - Project API :: Gagal Menambah Jenis Project Baru 😪',
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
    return res.status(200).json({
      info: `😅 200 - Project API :: Detail ${req.params.id} 🤣`,
      result: project
    });
  } catch (error) {
    console.error(error);
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
      return res.status(200).json({
        info: `😅 200 - Project API :: Ubah ${req.params.id} 🤣`,
        result: resProjectSave
      });
    } else {
      throw new Error('Data Tidak Lengkap!');
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: `🙄 400 - Project API :: Gagal Mengubah Jenis Project ${req.params.id} 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// DELETE `/api/project/:id`
router.delete('/:id', auth.isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user.role === Role.ADMIN || req.user.role === Role.MODERATOR) {
      const projectRepo = getRepository(ProjectType);
      const project =  await projectRepo.findOneOrFail({
        where: [
          { id: Equal(req.params.id) }
        ]
      });
      const deletedProject = await projectRepo.remove(project);
      return res.status(200).json({
        info: `😅 200 - Project API :: Berhasil Menghapus Project 🤣`,
        results: deletedProject
      });
    } else {
      return res.status(401).json({
        info: '🙄 401 - Project API :: Authorisasi Pengguna Gagal 😪',
        result: {
          message: 'Khusus Admin / Moderator!'
        }
      });
    }
  } catch (error) {
    console.error(error);
    return next(createError(404));
  }
});

export default router;
