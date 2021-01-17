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
    if (req.body.image) {
      project.image_url = req.body.image;
    } else {
      project.image_url = '/favicon.ico';
    }
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
        info: `😅 200 - Project API :: Berhasil Menghapus Project ${req.params.id} 🤣`,
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
