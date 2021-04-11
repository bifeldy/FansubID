import { Server, Socket } from 'socket.io';
import { Equal, getRepository, ILike, IsNull, MoreThanOrEqual } from 'typeorm';

// Helper
import jwt from '../helpers/jwt';

import { Notification } from '../entities/Notification';
import { Berkas } from '../entities/Berkas';
import { Track } from '../entities/Track';
import { User } from '../entities/User';
import { Fansub } from '../entities/Fansub';
import { Profile } from '../entities/Profile';

// tslint:disable-next-line: typedef
export async function socketBot(io: Server, socket: Socket) {
  try {
    const notifRepo = getRepository(Notification);
    const notif = await notifRepo.find({
      where: [
        { deadline: MoreThanOrEqual(new Date()) }
      ],
      relations: ['user_']
    });
    for (const n of notif) {
      socket.emit('new-notification', {
        notifCreator: n.user_.username,
        notifData: {
          id: n.id,
          type: n.type,
          title: n.title,
          content: n.content,
          dismissible: n.dismissible
        }
      });
    }
  } catch (error) {
    console.error(error);
  }
  socket.on('track-set', async (data: any) => {
    data.ip = socket.handshake.headers['x-real-ip'] || socket.handshake.address || socket.request.socket.remoteAddress;
    if (data.jwtToken) {
      try {
        const decoded = jwt.JwtDecrypt(data.jwtToken);
        data.user = decoded.user;
      } catch (error) {
        console.error(error);
        data.user = null;
      }
    } else {
      data.user = null;
    }
    if (data.pathUrl.startsWith('/berkas/') || data.pathUrl.startsWith('/fansub/') || data.pathUrl.startsWith('/user/')) {
      try {
        const trackType = data.pathUrl.split('?')[0].split('/')[1];
        const idSlugUsername = data.pathUrl.split('?')[0].split('/')[2];
        let selectedRepo = null;
        let selected = null;
        if (trackType === 'berkas') {
          selectedRepo = getRepository(Berkas);
          selected = await selectedRepo.findOneOrFail({
            where: [
              { id: Equal(idSlugUsername) }
            ]
          });
        } else if (trackType === 'fansub') {
          selectedRepo = getRepository(Fansub);
          selected = await selectedRepo.findOneOrFail({
            where: [
              { slug: ILike(idSlugUsername) }
            ]
          });
        } else if (trackType === 'user') {
          selectedRepo = getRepository(User);
          selected = await selectedRepo.findOneOrFail({
            where: [
              { username: ILike(idSlugUsername) }
            ]
          });
        } else {
          // Other Url Target In Hikki API -- e.g '/news/:newsId'
        }
        const trackRepo = getRepository(Track);
        const tracks = await trackRepo.find({
          where: [
            {
              ...((data.user && data.user.id) ? {
                ip: Equal(data.ip),
                [`${trackType}_`]: {
                  id: Equal(selected.id)
                },
                track_by_: {
                  id: Equal(data.user.id)
                }
              } : {
                ip: Equal(data.ip),
                [`${trackType}_`]: {
                  id: Equal(selected.id)
                },
                track_by_: IsNull()
              })
            }
          ],
          relations: ['berkas_', 'fansub_', 'user_', 'track_by_']
        });
        if (tracks.length <= 0) {
          const track = new Track();
          track.ip = data.ip;
          track[`${trackType}_`] = selected;
          if (data.user && data.user.id) {
            const userRepo = getRepository(User);
            const visitorUser = await userRepo.findOneOrFail({
              where: [
                { id: Equal(data.user.id) }
              ]
            });
            track.track_by_ = visitorUser;
          }
          const resTrackSave = await trackRepo.save(track);
          if (trackType === 'user') {
            selectedRepo = getRepository(Profile);
            selected = await selectedRepo.findOneOrFail({
              where: [
                { id: Equal(resTrackSave.user_.id) }
              ]
            });
          }
          const visitorCount = await trackRepo.count({
            where: [
              {
                [`${trackType}_`]: {
                  id: Equal(selected.id)
                }
              }
            ],
            relations: ['berkas_', 'fansub_', 'user_']
          });
          selected.view_count = visitorCount;
          await selectedRepo.save(selected);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      // Url Target Is Other Web API -- e.g 'https://api.github.com/repos/Bifeldy/Hikki/commits'
    }
  });
  socket.on('track-get', async (data: any, callback: any) => {
    try {
      let selectedRepo = null;
      let selected = null;
      if (data.trackType === 'berkas') {
        selectedRepo = getRepository(Berkas);
        selected = await selectedRepo.findOneOrFail({
          where: [
            { id: Equal(data.idSlugUsername) }
          ]
        });
      } else if (data.trackType === 'fansub') {
        selectedRepo = getRepository(Fansub);
        selected = await selectedRepo.findOneOrFail({
          where: [
            { slug: ILike(data.idSlugUsername) }
          ]
        });
      } else if (data.trackType === 'user') {
        selectedRepo = getRepository(User);
        selected = await selectedRepo.findOneOrFail({
          where: [
            { username: ILike(data.idSlugUsername) }
          ]
        });
      } else {
        // Other Url Target In Hikki API -- e.g '/news/:newsId'
      }
      let tracks = null;
      const result: any = {};
      const trackRepo = getRepository(Track);
      tracks = await trackRepo.find({
        where: [
          {
            [`${data.trackType}_`]: {
              id: Equal(selected.id)
            }
          }
        ],
        relations: ['berkas_', 'fansub_', 'user_', 'track_by_']
      });
      result.uniqueIp = [...new Set(tracks.map(t => t.ip))].length;
      result.uniqueUser = [...new Set(tracks.map(t => t.track_by_?.id))].length;
      result.verifiedUser = [...new Set(tracks.map(t => t.track_by_?.verified === true))].length;
      result.unverifiedUser = [...new Set(tracks.map(t => t.track_by_?.verified === false))].length;
      tracks = await trackRepo.query(`
        SELECT *
        FROM (
          SELECT
            visitor_date::DATE
          FROM generate_series(
            NOW() - INTERVAL '7 DAY',
            NOW(),
            INTERVAL '1 DAY'
          ) visitor_date
        ) d
        LEFT JOIN (
          SELECT
            DATE_TRUNC('DAY', created_at)::DATE AS visitor_date,
            COUNT(*) AS visitor_count
          FROM
            track
          WHERE
            created_at >= NOW() - INTERVAL '7 DAY'
            AND ${data.trackType}_id = $1
          GROUP BY 1
        ) t USING (visitor_date)
        ORDER BY visitor_date ASC;
      `, [selected.id]);
      result.visitor = tracks;
      if (typeof callback === 'function') {
        callback(result);
      }
    } catch (error) {
      console.error(error);
      if (typeof callback === 'function') {
        callback({
          uniqueIp: 0,
          uniqueUser: 0,
          visitor: {
            visitor_date: new Date(),
            visitor_count: 0
          }
        });
      }
    }
  });
}
