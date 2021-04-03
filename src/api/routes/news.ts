import createError from 'http-errors';

import { Router, Response, NextFunction } from 'express';
import { Equal, getRepository, ILike } from 'typeorm';

import { UserRequest } from '../models/UserRequest';

import { News } from '../entities/News';
import { User } from '../entities/User';

import { Role } from '../../app/_shared/models/Role';

// Middleware
import auth from '../middlewares/auth';

import { MessageEmbed } from 'discord.js';

import { environment } from '../../environments/server/environment';

const router = Router();

// GET `/api/news`
router.get('/', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const newsRepo = getRepository(News);
    const [news, count] = await newsRepo.findAndCount({
      where: [
        { title: ILike(`%${req.query.q ? req.query.q : ''}%`) }
      ],
      order: {
        ...((req.query.sort && req.query.order) ? {
          [req.query.sort]: req.query.order.toUpperCase()
        } : {
          created_at: 'DESC',
          title: 'ASC'
        })
      },
      relations: ['user_'],
      skip: req.query.page > 0 ? (req.query.page * req.query.row - req.query.row) : 0,
      take: (req.query.row > 0 && req.query.row <= 500) ? req.query.row : 10
    });
    for (const n of news) {
      delete n.content;
      n.tags = JSON.parse(n.tags);
      if ('user_' in n && n.user_) {
        delete n.user_.role;
        delete n.user_.password;
        delete n.user_.session_token;
        delete n.user_.created_at;
        delete n.user_.updated_at;
      }
    }
    return res.status(200).json({
      info: `😅 200 - News API :: List All 🤣`,
      count,
      pages: Math.ceil(count / (req.query.row ? req.query.row : 10)),
      results: news
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: `🙄 400 - News API :: Gagal Mendapatkan All News 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// POST `/api/news`
router.post('/', auth.isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user.role === Role.ADMIN || req.user.role === Role.MODERATOR) {
      if ('title' in req.body && 'content' in req.body) {
        const newsRepo = getRepository(News);
        const news = new News();
        news.title = req.body.title;
        news.content = req.body.content;
        if (req.body.image) {
          news.image_url = req.body.image;
        } else {
          news.image_url = '/favicon.ico';
        }
        if (req.body.tags && Array.isArray(req.body.tags) && req.body.tags.length > 0) {
          const filteredTagsUnique = [...new Set(req.body.tags)];
          news.tags = JSON.stringify(filteredTagsUnique);
        }
        const userRepo = getRepository(User);
        const user = await userRepo.findOneOrFail({
          where: [
            { id: Equal(req.user.id) }
          ]
        });
        news.user_ = user;
        const resNewsSave = await newsRepo.save(news);
        if ('user_' in resNewsSave && resNewsSave.user_) {
          delete resNewsSave.user_.role;
          delete resNewsSave.user_.password;
          delete resNewsSave.user_.session_token;
          delete resNewsSave.user_.created_at;
          delete resNewsSave.user_.updated_at;
        }
        req.bot.send(
          new MessageEmbed()
          .setColor('#0099ff')
          .setTitle(resNewsSave.title)
          .setURL(`${environment.baseUrl}/news/${resNewsSave.id}`)
          .setAuthor('Hikki - Penambahan Berita Baru', `${environment.baseUrl}/assets/img/favicon.png`, environment.baseUrl)
          .setDescription(resNewsSave.content.replace(/<[^>]*>/g, ' ').trim())
          .setImage(resNewsSave.image_url === '/favicon.ico' ? `${environment.baseUrl}/assets/img/favicon.png` : resNewsSave.image_url)
          .setTimestamp(resNewsSave.updated_at)
          .setFooter(
            resNewsSave.user_.username,
            resNewsSave.user_.image_url === '/favicon.ico' ? `${environment.baseUrl}/assets/img/favicon.png` : resNewsSave.user_.image_url
          )
        );
        req.io.volatile.emit('new-news', resNewsSave);
        return res.status(200).json({
          info: `😅 200 - News API :: Tambah Baru 🤣`,
          result: resNewsSave
        });
      } else {
        throw new Error('Data Tidak Lengkap!');
      }
    } else {
      return res.status(401).json({
        info: '🙄 401 - News API :: Authorisasi Pengguna Gagal 😪',
        result: {
          message: 'Khusus Admin / Moderator!'
        }
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: '🙄 400 - News API :: Gagal Menambah News Baru 😪',
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// GET `/api/news/:id`
router.get('/:id', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const newsRepo = getRepository(News);
    const news = await newsRepo.findOneOrFail({
      where: [
        { id: Equal(req.params.id) }
      ],
      relations: ['user_'],
    });
    news.tags = JSON.parse(news.tags);
    if ('user_' in news && news.user_) {
      delete news.user_.role;
      delete news.user_.password;
      delete news.user_.session_token;
      delete news.user_.created_at;
      delete news.user_.updated_at;
    }
    return res.status(200).json({
      info: `😅 200 - News API :: Detail ${req.params.id} 🤣`,
      result: news
    });
  } catch (error) {
    console.error(error);
    return next(createError(404));
  }
});

// PUT `/api/news/:id`
router.put('/:id', auth.isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user.role === Role.ADMIN || req.user.role === Role.MODERATOR) {
      if (
        'title' in req.body || 'content' in req.body || 'image' in req.body ||
        ('tags' in req.body && Array.isArray(req.body.tags) && req.body.tags.length > 0)
      ) {
        try {
          const newsRepo = getRepository(News);
          const news = await newsRepo.findOneOrFail({
            where: [
              { id: Equal(req.params.id) }
            ],
            relations: ['user_']
          });
          if (req.user.id === news.user_.id) {
            if (req.body.title) {
              news.title = req.body.title;
            }
            if (req.body.content) {
              news.content = req.body.content;
            }
            if (req.body.image) {
              news.image_url = req.body.image;
            }
            if (req.body.tags) {
              const filteredTagsUnique = [...new Set(req.body.tags)];
              news.tags = JSON.stringify(filteredTagsUnique);
            }
            const resNewsSave = await newsRepo.save(news);
            if ('user_' in resNewsSave && resNewsSave.user_) {
              delete resNewsSave.user_.role;
              delete resNewsSave.user_.password;
              delete resNewsSave.user_.session_token;
              delete resNewsSave.user_.created_at;
              delete resNewsSave.user_.updated_at;
            }
            req.bot.send(
              new MessageEmbed()
              .setColor('#ff4081')
              .setTitle(resNewsSave.title)
              .setURL(`${environment.baseUrl}/news/${resNewsSave.id}`)
              .setAuthor('Hikki - Pembaharuan Data Berita', `${environment.baseUrl}/assets/img/favicon.png`, environment.baseUrl)
              .setDescription(resNewsSave.content.replace(/<[^>]*>/g, ' ').trim())
              .setImage(resNewsSave.image_url === '/favicon.ico' ? `${environment.baseUrl}/assets/img/favicon.png` : resNewsSave.image_url)
              .setTimestamp(resNewsSave.updated_at)
              .setFooter(
                resNewsSave.user_.username,
                // tslint:disable-next-line: max-line-length
                resNewsSave.user_.image_url === '/favicon.ico' ? `${environment.baseUrl}/assets/img/favicon.png` : resNewsSave.user_.image_url
              )
            );
            return res.status(200).json({
              info: `😅 200 - News API :: Ubah ${req.params.id} 🤣`,
              result: resNewsSave
            });
          } else {
            return res.status(401).json({
              info: '🙄 401 - News API :: Authorisasi Kepemilikan Gagal 😪',
              result: {
                message: 'Berita Milik Orang Lain!'
              }
            });
          }
        } catch (err) {
          console.error(err);
          return next(createError(404));
        }
      } else {
        throw new Error('Data Tidak Lengkap!');
      }
    } else {
      return res.status(401).json({
        info: '🙄 401 - News API :: Authorisasi Pengguna Gagal 😪',
        result: {
          message: 'Khusus Admin / Moderator!'
        }
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: `🙄 400 - News API :: Gagal Mengubah News ${req.params.id} 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// DELETE `/api/news/:id`
router.delete('/:id', auth.isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user.role === Role.ADMIN || req.user.role === Role.MODERATOR) {
      const newsRepo = getRepository(News);
      const news =  await newsRepo.findOneOrFail({
        where: [
          { id: Equal(req.params.id) }
        ]
      });
      const deletedNews = await newsRepo.remove(news);
      if ('user_' in deletedNews && deletedNews.user_) {
        delete deletedNews.user_.role;
        delete deletedNews.user_.password;
        delete deletedNews.user_.session_token;
        delete deletedNews.user_.created_at;
        delete deletedNews.user_.updated_at;
      }
      return res.status(200).json({
        info: `😅 200 - News API :: Berhasil Menghapus News ${req.params.id} 🤣`,
        result: deletedNews
      });
    } else {
      return res.status(401).json({
        info: '🙄 401 - News API :: Authorisasi Pengguna Gagal 😪',
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
