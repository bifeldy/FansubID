import webtorrentHealth from 'webtorrent-health';

import { Router, Response, NextFunction } from 'express';

import { UserRequest } from '../models/UserRequest';
import { environment } from '../../environments/api/environment';

const router = Router();

// // TODO :: GET `/api/torrent`
// router.get('/', async (req: UserRequest, res: Response, next: NextFunction) => {
//   try {
//     return res.status(200).json({
//       info: `😅 200 - Torrent Tracker API :: List All 🤣`,
//       count: 0,
//       pages: 1,
//       results: []
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(400).json({
//       info: `🙄 400 - Torrent Tracker API :: Gagal Mendapatkan All Torrent 😪`,
//       result: {
//         message: 'Data Tidak Lengkap!'
//       }
//     });
//   }
// });

// POST `/api/torrent`
router.post('/', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if ('magnetHash' in req.body) {
      return webtorrentHealth(req.body.magnetHash, {
        trackers: environment.trackerAnnounce,
        timeout: req.body.trackTimeout || 1234
      }, (err, data) => {
        if (err) {
          return res.status(400).json({
            info: `🙄 400 - Torrent Tracker API :: Gagal Mendapatkan Torrent 😪`,
            result: {
              message: err.message
            }
          });
        }
        return res.status(200).json({
          info: `😅 200 - Torrent Tracker API :: Berhasil Mendapatkan ${req.body.magnetHash} 🤣`,
          result: data
        });
      });
    } else {
      throw new Error('Data Tidak Lengkap!');
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: '🙄 400 - Torrent Tracker API :: Gagal Mendapatkan Torrent 😪',
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

export default router;
