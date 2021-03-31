import { Server, Socket } from 'socket.io';
import { Equal, getRepository, IsNull, MoreThanOrEqual } from 'typeorm';

import { Notification } from '../entities/Notification';
import { Berkas } from '../entities/Berkas';
import { Track } from '../entities/Track';
import { User } from '../entities/User';

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
  socket.on('track', async (data: any) => {
    data.ip = socket.request.socket.remoteAddress;
    data.port = socket.request.socket.remotePort;
    if (data.pathUrl.startsWith('http://')) {
      data.pathUrl = data.pathUrl.slice(7, data.pathUrl.length);
    } else if (data.pathUrl.startsWith('https://')) {
      data.pathUrl = data.pathUrl.slice(8, data.pathUrl.length);
    }
    if (data.pathUrl.startsWith('/')) {
      if (data.pathUrl.startsWith('/berkas/')) {
        try {
          const trackRepo = getRepository(Track);
          const tracks = await trackRepo.find({
            where: [
              {
                ...((data.userId) ? {
                  ip: Equal(data.ip),
                  user_: {
                    id: Equal(data.userId)
                  }
                } : {
                  ip: Equal(data.ip),
                  user_: IsNull()
                })
              }
            ],
            relations: ['user_']
          });
          if (tracks.length <= 0) {
            const track = new Track();
            track.ip = data.ip;
            const fileRepo = getRepository(Berkas);
            const selectedFile = await fileRepo.findOneOrFail({
              where: [
                { id: Equal(data.pathUrl.split('?')[0].split('/').pop()) }
              ]
            });
            track.berkas_ = selectedFile;
            if (data.userId) {
              const userRepo = getRepository(User);
              const selectedUser = await userRepo.findOneOrFail({
                where: [
                  { id: Equal(data.userId) }
                ]
              });
              track.user_ = selectedUser;
            }
            await trackRepo.save(track);
            const visitor = await trackRepo.count({
              where: [
                {
                  berkas_: {
                    id: Equal(selectedFile.id)
                  }
                }
              ],
              relations: ['berkas_']
            });
            selectedFile.view_count = visitor;
            await fileRepo.save(selectedFile);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        // Other Url Target In Hikki API -- e.g '/news/:newsId'
      }
    } else {
      // Url Target Is Other Web API -- e.g 'https://api.github.com/repos/Bifeldy/Hikki/commits'
    }
    // console.log(`[${data.ip}:${data.port}] 🖇 ${data.userId} @ ${data.pathUrl}`);
  });
}
