import createError from 'http-errors';

import { Router, Response, NextFunction } from 'express';
import { getRepository, Equal, ILike } from 'typeorm';

import { UserRequest } from '../models/UserRequest';

import { Role } from '../../app/_shared/models/Role';

import { Fansub } from '../entities/Fansub';
import { Berkas } from '../entities/Berkas';
import { User } from '../entities/User';

// Middleware
import auth from '../middlewares/auth';

import { MessageEmbed } from 'discord.js';

import { environment } from '../../environments/server/environment';

const router = Router();

// GET `/api/fansub`
router.get('/', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const fansubRepo = getRepository(Fansub);
    const [fansubs, count] = await fansubRepo.findAndCount({
      where: [
        { slug: ILike(`%${req.query.q ? req.query.q : ''}%`) },
        { name: ILike(`%${req.query.q ? req.query.q : ''}%`) }
      ],
      order: {
        ...((req.query.sort && req.query.order) ? {
          [req.query.sort]: req.query.order.toUpperCase()
        } : {
          name: 'ASC',
          active: 'DESC'
        })
      },
      skip: req.query.page > 0 ? (req.query.page * req.query.row - req.query.row) : 0,
      take: (req.query.row > 0 && req.query.row <= 500) ? req.query.row : 10
    });
    for (const f of fansubs) {
      delete f.description;
      f.urls = JSON.parse(f.urls);
      f.tags = JSON.parse(f.tags);
    }
    return res.status(200).json({
      info: `😅 200 - Fansub API :: List All 🤣`,
      count,
      pages: Math.ceil(count / (req.query.row ? req.query.row : 10)),
      results: fansubs
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: `🙄 400 - Fansub API :: Gagal Mendapatkan All Fansub 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// GET `/api/fansub/list-all`
router.patch('/list-all', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const fansubRepo = getRepository(Fansub);
    const [fansubs, count] = await fansubRepo.findAndCount({
      order: {
        name: 'ASC',
        active: 'DESC'
      }
    });
    for (const f of fansubs) {
      delete f.description;
      f.urls = JSON.parse(f.urls);
      f.tags = JSON.parse(f.tags);
    }
    return res.status(200).json({
      info: `😅 200 - Fansub API :: List All 🤣`,
      count,
      pages: 1,
      results: fansubs
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: `🙄 400 - Fansub API :: Gagal Mendapatkan All Fansub 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// POST `/api/fansub/cek-slug`
router.post('/cek-slug', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if ('slug' in req.body && req.body.slug) {
      const slug = req.body.slug.replace(/[^a-zA-Z-]/g, '');
      const fansubRepo = getRepository(Fansub);
      const selectedFansub = await fansubRepo.find({
        where: [
          { slug: ILike(slug) }
        ]
      });
      if (selectedFansub.length === 0) {
        return res.status(200).json({
          info: `😅 200 - Fansub API :: Cek Slug Berhasil 🤣`,
          result: {
            message: `'${slug}' Dapat Digunakan`
          }
        });
      } else {
        return res.status(202).json({
          info: '😅 202 - Fansub API :: Cek Fansub Slug Gagal 🥰',
          result: {
            message: `'${slug}' Sudah Terpakai`
          }
        });
      }
    } else {
      throw new Error('Data Tidak Lengkap!');
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: '🙄 400 - Fansub API :: Gagal Mengecek Fansub Slug 😪',
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// POST `/api/fansub`
router.post('/', auth.isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (
      'name' in req.body && 'born' in req.body && 'slug' in req.body &&
      ('urls' in req.body && Array.isArray(req.body.urls) && req.body.urls.length > 0)
    ) {
      const slug = req.body.slug.replace(/[^a-zA-Z-]/g, '');
      const fansubRepo = getRepository(Fansub);
      const selectedFansub = await fansubRepo.find({
        where: [
          { slug: ILike(slug) }
        ]
      });
      if (selectedFansub.length === 0) {
        const userRepo = getRepository(User);
        const user = await userRepo.findOneOrFail({
          where: [
            { id: Equal(req.user.id) }
          ]
        });
        const fansub = new Fansub();
        fansub.user_ = user;
        fansub.name = req.body.name;
        fansub.born = new Date(req.body.born);
        fansub.slug = slug;
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
        if ('user_' in resFansubSave && resFansubSave.user_) {
          delete resFansubSave.user_.role;
          delete resFansubSave.user_.password;
          delete resFansubSave.user_.session_token;
          delete resFansubSave.user_.created_at;
          delete resFansubSave.user_.updated_at;
        }
        req.bot.send(
          new MessageEmbed()
          .setColor('#0099ff')
          .setTitle(resFansubSave.name)
          .setURL(`${environment.baseUrl}/fansub/${resFansubSave.slug}`)
          .setAuthor('Hikki - Penambahan Fansub Baru', `${environment.baseUrl}/assets/img/favicon.png`, environment.baseUrl)
          .setDescription(resFansubSave.description.replace(/<[^>]*>/g, ' ').trim())
          // tslint:disable-next-line: max-line-length
          .setThumbnail(resFansubSave.image_url === '/favicon.ico' ? `${environment.baseUrl}/assets/img/favicon.png` : resFansubSave.image_url)
          .setTimestamp(resFansubSave.updated_at)
          .setFooter(
            resFansubSave.user_.username,
            // tslint:disable-next-line: max-line-length
            resFansubSave.user_.image_url === '/favicon.ico' ? `${environment.baseUrl}/assets/img/favicon.png` : resFansubSave.user_.image_url
          )
        );
        req.io.volatile.emit('new-fansub', resFansubSave);
        return res.status(200).json({
          info: `😅 200 - Fansub API :: Tambah Baru 🤣`,
          result: resFansubSave
        });
      } else {
        return res.status(400).json({
          info: '🙄 400 - Fansub API :: Gagal Menambah Fansub Baru 😪',
          result: {
            message: `'${slug}' Sudah Terpakai`
          }
        });
      }
    } else {
      throw new Error('Data Tidak Lengkap!');
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: '🙄 400 - Fansub API :: Gagal Menambah Fansub Baru 😪',
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// GET `/api/fansub/berkas?id=`
router.patch('/berkas', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const fansubId = req.query.id.split(',').map(Number);
    if (Array.isArray(fansubId) && fansubId.length > 0) {
      const fileRepo = getRepository(Berkas);
      let fileRepoQuery = fileRepo
        .createQueryBuilder('berkas')
        .leftJoinAndSelect('berkas.project_type_', 'project_type_')
        .leftJoinAndSelect('berkas.anime_', 'anime_')
        .leftJoinAndSelect('berkas.dorama_', 'dorama_')
        .leftJoinAndSelect('berkas.user_', 'user_')
        .leftJoinAndSelect('berkas.fansub_', 'fansub_')
        .where('fansub_.id IN (:...id)', { id: fansubId })
        .andWhere('berkas.private = :isPrivate', { isPrivate: false })
        .andWhere('berkas.name ILIKE :query', { query: `%${req.query.q ? req.query.q : ''}%` });
      if (req.query.sort && req.query.order) {
        fileRepoQuery = fileRepoQuery.orderBy(`berkas.${req.query.sort}`, req.query.order.toUpperCase());
      } else {
        fileRepoQuery = fileRepoQuery
          .orderBy('berkas.created_at', 'DESC')
          .addOrderBy('berkas.name', 'ASC');
      }
      const [files, count] = await fileRepoQuery
        .skip(req.query.page > 0 ? (req.query.page * req.query.row - req.query.row) : 0)
        .take((req.query.row > 0 && req.query.row <= 500) ? req.query.row : 10)
        .getManyAndCount();
      const results: any = {};
      for (const i of fansubId) {
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
        if ('anime_' in f && f.anime_) {
          delete f.anime_.created_at;
          delete f.anime_.updated_at;
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
        if ('fansub_' in f && f.fansub_) {
          for (const fansub of f.fansub_) {
            delete fansub.description;
            delete fansub.urls;
            delete fansub.tags;
            delete fansub.created_at;
            delete fansub.updated_at;
            if (fansubId.includes(fansub.id)) {
              results[fansub.id].push(f);
            }
          }
        }
      }
      return res.status(200).json({
        info: `😅 200 - Fansub API :: Berkas 🤣`,
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
      info: `🙄 400 - Fansub API :: Gagal Mencari Berkas ${req.query.id} 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// GET `/api/fansub/anime?id=`
router.patch('/anime', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const fansubId = req.query.id.split(',').map(Number);
    if (Array.isArray(fansubId) && fansubId.length > 0) {
      const fileRepo = getRepository(Berkas);
      const [files, count] = await fileRepo
        .createQueryBuilder('berkas')
        .leftJoinAndSelect('berkas.anime_', 'anime_')
        .leftJoinAndSelect('berkas.fansub_', 'fansub_')
        .where('fansub_.id IN (:...id)', { id: fansubId })
        .andWhere('berkas.anime_ IS NOT NULL')
        .getManyAndCount();
      const results: any = {};
      for (const i of fansubId) {
        results[i] = [];
      }
      for (const f of files) {
        if ('anime_' in f && f.anime_) {
          delete f.anime_.created_at;
          delete f.anime_.updated_at;
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
        results[key] = (value as any)
          .filter((a, b, c) => c.findIndex(d => (d.id === a.id)) === b)
          .sort((a, b) => (a.name > b.name) ? 1 : -1);
      }
      return res.status(200).json({
        info: `😅 200 - Fansub API :: Anime 🤣`,
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
      info: `🙄 400 - Fansub API :: Gagal Mencari Anime ${req.query.id} 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// GET `/api/fansub/dorama?id=`
router.patch('/dorama', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const fansubId = req.query.id.split(',').map(Number);
    if (Array.isArray(fansubId) && fansubId.length > 0) {
      const fileRepo = getRepository(Berkas);
      const [files, count] = await fileRepo
        .createQueryBuilder('berkas')
        .leftJoinAndSelect('berkas.dorama_', 'dorama_')
        .leftJoinAndSelect('berkas.fansub_', 'fansub_')
        .where('fansub_.id IN (:...id)', { id: fansubId })
        .andWhere('berkas.dorama_ IS NOT NULL')
        .getManyAndCount();
      const results: any = {};
      for (const i of fansubId) {
        results[i] = [];
      }
      for (const f of files) {
        if ('dorama_' in f && f.dorama_) {
          delete f.dorama_.created_at;
          delete f.dorama_.updated_at;
        }
        if ('fansub_' in f && f.fansub_) {
          for (const fansub of f.fansub_) {
            if (fansubId.includes(fansub.id)) {
              results[fansub.id].push(f.dorama_);
            }
          }
        }
      }
      for (const [key, value] of Object.entries(results)) {
        results[key] = (value as any)
          .filter((a, b, c) => c.findIndex(d => (d.id === a.id)) === b)
          .sort((a, b) => (a.name > b.name) ? 1 : -1);
      }
      return res.status(200).json({
        info: `😅 200 - Fansub API :: Dorama 🤣`,
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
      info: `🙄 400 - Fansub API :: Gagal Mencari Dorama 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// GET `/api/fansub/:slug`
router.get('/:slug', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const fansubRepo = getRepository(Fansub);
    const fansub = await fansubRepo.findOneOrFail({
      where: [
        { slug: ILike(req.params.slug) }
      ],
      relations: ['user_']
    });
    fansub.urls = JSON.parse(fansub.urls);
    fansub.tags = JSON.parse(fansub.tags);
    if ('user_' in fansub && fansub.user_) {
      delete fansub.user_.role;
      delete fansub.user_.password;
      delete fansub.user_.session_token;
      delete fansub.user_.created_at;
      delete fansub.user_.updated_at;
    }
    return res.status(200).json({
      info: `😅 200 - Fansub API :: Detail ${req.params.slug} 🤣`,
      result: fansub
    });
  } catch (error) {
    console.error(error);
    return next(createError(404));
  }
});

// PUT `/api/fansub/:slug`
router.put('/:slug', auth.isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (
      'name' in req.body || 'born' in req.body || 'description' in req.body ||
      'slug' in req.body || 'active' in req.body || 'image' in req.body ||
      ('tags' in req.body && Array.isArray(req.body.tags) && req.body.tags.length > 0) ||
      ('urls' in req.body && Array.isArray(req.body.urls) && req.body.urls.length > 0)
    ) {
      const newSlug = req.body.slug.replace(/[^a-zA-Z-]/g, '');
      const fansubRepo = getRepository(Fansub);
      const fansub = await fansubRepo.findOneOrFail({
        where: [
          { slug: ILike(req.params.slug) }
        ],
        relations: ['user_']
      });
      if (newSlug) {
        const selectedFansub = await fansubRepo.find({
          where: [
            { slug: ILike(newSlug) }
          ]
        });
        if (selectedFansub.length === 0) {
          fansub.slug = newSlug;
        } else {
          return res.status(400).json({
            info: `😅 400 - Fansub API :: Gagal Mengubah Fansub ${req.params.id} 🥰`,
            result: {
              message: `'${newSlug}' Sudah Terpakai`
            }
          });
        }
      }
      if (req.body.name) {
        fansub.name = req.body.name;
      }
      if (req.body.born) {
        fansub.born = req.body.born;
      }
      if (req.body.description) {
        fansub.description = req.body.description;
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
      const userRepo = getRepository(User);
      const user = await userRepo.findOneOrFail({
        where: [
          { id: Equal(req.user.id) }
        ]
      });
      fansub.user_ = user;
      const resFansubSave = await fansubRepo.save(fansub);
      if ('user_' in resFansubSave && resFansubSave.user_) {
        delete resFansubSave.user_.role;
        delete resFansubSave.user_.password;
        delete resFansubSave.user_.session_token;
        delete resFansubSave.user_.created_at;
        delete resFansubSave.user_.updated_at;
      }
      req.bot.send(
        new MessageEmbed()
        .setColor('#ff4081')
        .setTitle(resFansubSave.name)
        .setURL(`${environment.baseUrl}/fansub/${resFansubSave.slug}`)
        .setAuthor('Hikki - Pembaharuan Data Fansub', `${environment.baseUrl}/assets/img/favicon.png`, environment.baseUrl)
        .setDescription(resFansubSave.description.replace(/<[^>]*>/g, ' ').trim())
        // tslint:disable-next-line: max-line-length
        .setThumbnail(resFansubSave.image_url === '/favicon.ico' ? `${environment.baseUrl}/assets/img/favicon.png` : resFansubSave.image_url)
        .setTimestamp(resFansubSave.updated_at)
        .setFooter(
          resFansubSave.user_.username,
          // tslint:disable-next-line: max-line-length
          resFansubSave.user_.image_url === '/favicon.ico' ? `${environment.baseUrl}/assets/img/favicon.png` : resFansubSave.user_.image_url
        )
      );
      return res.status(200).json({
        info: `😅 200 - Fansub API :: Ubah ${req.params.id} 🤣`,
        result: resFansubSave
      });
    } else {
      throw new Error('Data Tidak Lengkap!');
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: `🙄 400 - Fansub API :: Gagal Mengubah Fansub ${req.params.slug} 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// DELETE `/api/fansub/:slug`
router.delete('/:slug', auth.isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user.role === Role.ADMIN || req.user.role === Role.MODERATOR) {
      const fansubRepo = getRepository(Fansub);
      const fansub =  await fansubRepo.findOneOrFail({
        where: [
          { slug: ILike(req.params.slug) }
        ]
      });
      const deletedFansub = await fansubRepo.remove(fansub);
      if ('user_' in deletedFansub && deletedFansub.user_) {
        delete deletedFansub.user_.role;
        delete deletedFansub.user_.password;
        delete deletedFansub.user_.session_token;
        delete deletedFansub.user_.created_at;
        delete deletedFansub.user_.updated_at;
      }
      return res.status(200).json({
        info: `😅 200 - Fansub API :: Berhasil Menghapus Fansub ${req.params.slug} 🤣`,
        results: deletedFansub
      });
    } else {
      return res.status(401).json({
        info: '🙄 401 - Fansub API :: Authorisasi Pengguna Gagal 😪',
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
