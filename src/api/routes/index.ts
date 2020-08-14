import { Router, Response } from 'express';
import createError from 'http-errors';

// Middleware
import auth from '../middlewares/auth';

// Child router
import seasonalRouter from './anime';
import projectRouter from './project';
import fansubRouter from './fansub';
import berkasRouter from './berkas';

const router = Router();

// Child route url
router.use('/anime', seasonalRouter);
router.use('/project', projectRouter);
router.use('/fansub', fansubRouter);
router.use('/berkas', berkasRouter);

// GET `/api`
router.get('/', (req, res) => {
  res.redirect('/');
});

// POST `/api/register`
router.post('/register', auth.registerModule, (req: any, res: Response, next) => {
  res.status(200).json({
    info: '😚 200 - Berhasil Registrasi. Yeay! 🤩',
    result: {
      token: req.user.session_token
    }
  });
});

// POST `/api/login`
router.post('/login', auth.loginModule, (req: any, res: Response, next) => {
  res.status(200).json({
    info: '😚 200 - Berhasil Login. Yeay! 🤩',
    result: {
      token: req.user.session_token
    }
  });
});

// DEL `/api/logout`
router.delete('/logout', auth.isAuthorized, auth.logoutModule, (req: any, res: Response, next) => {
  res.status(200).json({
    info: '😍 200 - Berhasil Keluar~ 🥰',
    result: req.user
  });
});

// POST `/api/verify`
router.post('/verify', auth.isAuthorized, (req: any, res: Response, next) => {
  res.status(200).json({
    info: '😍 200 - Token Selesai Di Verifikasi! UwUu~ 🥰',
    result: req.user
  });
});

// Catch 404 and forward to error handler
router.use((req, res, next) => {
  next(createError(404));
});

// Error handler
router.use((err: any, req, res: Response, next) => {
  res.locals.message = err.message;
  res.locals.error = err;
  res.status(err.status || 500).json({
    info: `😫 ${err.status || 500} - Whoops, Terjadi Kesalahan! 💩`,
    result: err
  });
});

export default router;
