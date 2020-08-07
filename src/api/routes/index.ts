import { Router, Response } from 'express';
import createError from 'http-errors';

// Middleware
import auth from '../middlewares/auth';

// Child router
import seasonalRouter from './anime';

const router = Router();

// Child route url
router.use('/anime', seasonalRouter);

// GET `/api`
router.get('/', (req, res) => {
  res.redirect('/');
});

// POST `/api/login`
router.post('/login', (req: any, res: Response, next) => {
  auth.loginModule(req, res, next);
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
