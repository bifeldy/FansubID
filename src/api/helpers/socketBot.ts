import { Server, Socket } from 'socket.io';
import { getRepository, MoreThanOrEqual } from 'typeorm';

import { Notification } from '../entities/Notification';

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
  socket.on('track', (data) => {
    data.ip = socket.request.connection.remoteAddress;
    data.port = socket.request.connection.remotePort;
    if (data.pathUrl.startsWith('http://')) {
      data.pathUrl = data.pathUrl.slice(7, data.pathUrl.length);
    } else if (data.pathUrl.startsWith('https://')) {
      data.pathUrl = data.pathUrl.slice(8, data.pathUrl.length);
    }
    if (data.pathUrl.startsWith('/')) {
      // Url Target Is Hikki API -- e.g '/berkas?q=&page=1&row=10&sort=&order='
    } else {
      // Url Target Is Other Web API -- e.g 'https://api.github.com/repos/Bifeldy/Hikki/commits'
    }
    // console.log(`[${data.ip}:${data.port}] 🖇 ${data.userId} @ ${data.pathUrl}`);
  });
}
