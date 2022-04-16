import { Server, Socket } from 'socket.io';
import { Equal, getConnection, getRepository, ILike, IsNull, MoreThanOrEqual } from 'typeorm';

import { serverGet, serverSet } from '../settings';

import { RoomInfoInOut, RoomInfoResponse, RoomChat } from '../../app/_shared/models/RoomInfo';

import { Role } from '../../app/_shared/models/Role';

import { JwtDecrypt } from '../helpers/crypto';
import { getQuizHirakata, getQuizKanji } from '../helpers/quizRoom';

import { Notification } from '../entities/Notification';
import { Berkas } from '../entities/Berkas';
import { Track } from '../entities/Track';
import { User } from '../entities/User';
import { Fansub } from '../entities/Fansub';
import { Profile } from '../entities/Profile';
import { News } from '../entities/News';

// Room Chat List
const room = {};

// Questions Each Room
const quiz = {};

async function getNewQuestion(roomId: string) {
  try {
    switch (roomId) {
      case '/nihongo/hiragana':
      case '/nihongo/katakana':
        quiz[roomId] = await getQuizHirakata();
        return;
      case '/nihongo/kelas-lanjutan-2':
        quiz[roomId] = await getQuizKanji('9', null);
        return;
      case '/nihongo/kelas-lanjutan-1':
        quiz[roomId] = await getQuizKanji('8', null);
        return;
      case '/nihongo/kelas-6':
      case '/nihongo/kelas-5':
      case '/nihongo/kelas-4':
      case '/nihongo/kelas-3':
      case '/nihongo/kelas-2':
      case '/nihongo/kelas-1':
        const schoolLevel = roomId.split('-').pop()[0];
        quiz[roomId] = await getQuizKanji(schoolLevel, null);
        return;
      case '/nihongo/jlpt-n5':
      case '/nihongo/jlpt-n4':
      case '/nihongo/jlpt-n3':
      case '/nihongo/jlpt-n2':
      case '/nihongo/jlpt-n1':
        const jlptLevel = roomId.split('-').pop()[1];
        quiz[roomId] = await getQuizKanji(null, jlptLevel);
        return;
      case '/nihongo/semua-kanji':
        quiz[roomId] = await getQuizKanji(null, null);
        return;
      default:
        return;
    }
  } catch (error) {
    console.error(error);
  }
}

function sendChat(data: RoomChat) {
  return {
    room_id: data.roomId,
    sender: data.user,
    message: data.message
  };
}

function getRoomInfo(io: Server, roomId: string): RoomInfoResponse {
  return {
    room_id: roomId,
    member_list: room[roomId],
    socket_count: io.sockets.adapter.rooms.get(roomId)?.size || 0
  };
}

function calculatePoints(data: RoomInfoInOut): number {
  let points = 1;
  if (quiz[data.roomId].question.jlpt === 0) {
    points = 64;
  } else if (quiz[data.roomId].question.jlpt) {
    // n5 = 2, n4 = 4, n3 = 8, n2 = 16, n1 = 32
    const totalPangkat = (Math.abs(quiz[data.roomId].question.jlpt - 5) + 1);
    let hasilPangkatDua = 1;
    for (let i = 0; i < totalPangkat; i++) {
      hasilPangkatDua = hasilPangkatDua * 2;
    }
    points = hasilPangkatDua;
  } else {
    points = 1;
  }
  return points;
}

async function increasePlayerPoint(io: Server, socket: Socket, data: RoomInfoInOut) {
  const userRepo = getRepository(User);
  const selectedUser = await userRepo.findOneOrFail({
    where: [
      { id: Equal(data.user.id) }
    ],
    relations: ['profile_']
  });
  const profileRepo = getRepository(Profile);
  const selectedProfile = await profileRepo.findOneOrFail({
    where: [
      { id: Equal(selectedUser.profile_.id) }
    ]
  });
  let points = calculatePoints(data);
  selectedProfile.points += points;
  const resSaveProfile = await profileRepo.save(selectedProfile);
  room[data.roomId][socket.id].points = resSaveProfile.points;
  return points;
}

async function decreasePlayerPoint(io: Server, socket: Socket, data: RoomInfoInOut) {
  const userRepo = getRepository(User);
  const selectedUser = await userRepo.findOneOrFail({
    where: [
      { id: Equal(data.user.id) }
    ],
    relations: ['profile_']
  });
  const profileRepo = getRepository(Profile);
  const selectedProfile = await profileRepo.findOneOrFail({
    where: [
      { id: Equal(selectedUser.profile_.id) }
    ]
  });
  let points = calculatePoints(data);
  if (selectedProfile.points > 0) {
    selectedProfile.points += (points * -1);
    if (selectedProfile.points <= 0) {
      selectedProfile.points = 0;
    }
    const resSaveProfile = await profileRepo.save(selectedProfile);
    room[data.roomId][socket.id].points = resSaveProfile.points;
  }
  return (points * -1);
}

export async function checkMultipleConnection(io: Server, socket: Socket, data: RoomInfoInOut) {
  if (data.user) {
    const multipleSocketId = [];
    for (const socketId of Object.keys(room['GLOBAL_PUBLIK'])) {
      if (
        socketId !== socket.id && room['GLOBAL_PUBLIK'][socketId] &&
        room['GLOBAL_PUBLIK'][socketId].username === data.user.username
      ) {
        multipleSocketId.push(socketId);
      }
    }
    for (const id of multipleSocketId) {
      io.sockets.sockets.get(id).emit('multiple-connection', [...multipleSocketId, socket.id], () => {
        io.sockets.sockets.get(id).disconnect(true);
      });
    }
  }
}

export async function disconnectRoom(io: Server, socket: Socket) {
  for (const roomId of Object.keys(room)) {
    delete room[roomId][socket.id];
    io.to(roomId).emit('room-info', getRoomInfo(io, roomId));
  }
}

export async function leaveRoom(io: Server, socket: Socket, data: RoomInfoInOut) {
  if (data.oldRoom) {
    if (!room[data.oldRoom]) {
      room[data.oldRoom] = {};
    }
    delete room[data.oldRoom][socket.id];
    try {
      await socket.leave(data.oldRoom);
    } catch (err) {
      console.error(err);
    }
    io.to(data.oldRoom).emit('room-info', getRoomInfo(io, data.oldRoom));
  }
}

export async function joinOrUpdateRoom(io: Server, socket: Socket, data: RoomInfoInOut) {
  if (data.newRoom) {
    if (!room[data.newRoom]) {
      room[data.newRoom] = {};
    }
    room[data.newRoom][socket.id] = data.user;
    try {
      await socket.join(data.newRoom);
    } catch (err) {
      console.error(err);
    }
    if (data.user) {
      const userRepo = getRepository(User);
      const selectedUser = await userRepo.findOneOrFail({
        where: [
          { id: Equal(data.user.id) }
        ],
        relations: ['profile_']
      });
      room[data.newRoom][socket.id].points = selectedUser.profile_.points;
      if (data.newRoom.startsWith('/nihongo/')) {
        if (!quiz[data.newRoom]) {
          await getNewQuestion(data.newRoom);
        }
        socket.emit('quiz-question', {
          room_id: data.newRoom,
          ...quiz[data.newRoom]
        });
      }
    }
    io.to(data.newRoom).emit('room-info', getRoomInfo(io, data.newRoom));
  }
}

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
  socket.on('server-set', async (data: any, callback: any) => {
    try {
      if (data.jwtToken) {
        const decoded = JwtDecrypt(data.jwtToken);
        data.user = decoded.user;
        if (data.user.role === Role.ADMIN || data.user.role === Role.MODERATOR) {
          serverSet(data);
          callback(serverGet());
        }
      }
    } catch (error) {
      console.error(error);
    }
  });
  socket.on('server-get', async (data: any, callback: any) => {
    callback(serverGet());
  });
  socket.on('track-set', async (data: any) => {
    data.ip = socket.handshake.headers['x-real-ip'] || socket.handshake.address || socket.request.socket.remoteAddress;
    if (data.jwtToken) {
      try {
        const decoded = JwtDecrypt(data.jwtToken);
        data.user = decoded.user;
      } catch (error) {
        console.error(error);
        data.user = null;
      }
    } else {
      data.user = null;
    }
    if (
      data.pathUrl.startsWith('/berkas/') ||
      data.pathUrl.startsWith('/fansub/') ||
      data.pathUrl.startsWith('/news/') ||
      data.pathUrl.startsWith('/user/')
    ) {
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
            ],
            relations: ['profile_']
          });
        } else if (trackType === 'news') {
          selectedRepo = getRepository(News);
          selected = await selectedRepo.findOneOrFail({
            where: [
              { id: Equal(idSlugUsername) }
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
          relations: ['news_', 'berkas_', 'fansub_', 'user_', 'track_by_']
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
          await trackRepo.save(track);
          if (trackType === 'user') {
            selectedRepo = getRepository(Profile);
            selected = await selectedRepo.findOneOrFail({
              where: [
                { id: Equal(selected.profile_.id) }
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
            relations: ['news_', 'berkas_', 'fansub_', 'user_']
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
      } else if (data.trackType === 'news') {
        selectedRepo = getRepository(News);
        selected = await selectedRepo.findOneOrFail({
          where: [
            { id: Equal(data.idSlugUsername) }
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
        relations: ['news_', 'berkas_', 'fansub_', 'user_', 'track_by_']
      });
      result.unique_ip = [...new Set(tracks.map(t => t.ip))].length;
      result.unique_user = [...new Set(tracks.map(t => t.track_by_?.id))].length;
      result.verified_user = [...new Set(tracks.map(t => t.track_by_?.verified === true))].length;
      result.un_verified_user = [...new Set(tracks.map(t => t.track_by_?.verified === false))].length;
      const trackColumns = getConnection().getMetadata(Track).columns;
      const trackColumnName = trackColumns.find(column => column.propertyName.startsWith(`${data.trackType}_`)).propertyName;
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
            AND ${trackColumnName}id = $1
          GROUP BY 1
        ) t USING (visitor_date)
        ORDER BY visitor_date ASC;
      `, [selected.id]);
      result.visitor = tracks;
      callback(result);
    } catch (error) {
      console.error(error);
      callback({
        unique_ip: 0,
        unique_user: 0,
        verified_user: 0,
        un_verified_user: 0,
        visitor: {
          visitor_date: new Date(0),
          visitor_count: 0
        }
      });
    }
  });
  socket.on('leave-join-room', async (data: RoomInfoInOut) => {
    try {
      if (data.jwtToken) {
        const decoded = JwtDecrypt(data.jwtToken);
        data.user = decoded.user;
      } else {
        data.user = null;
      }
      leaveRoom(io, socket, data);
      joinOrUpdateRoom(io, socket, data);
      joinOrUpdateRoom(io, socket, { user: data.user, newRoom: 'GLOBAL_PUBLIK' });
      await checkMultipleConnection(io, socket, data);
    } catch (error) {
      console.error(error);
    }
  });
  socket.on('room-info', async (data: RoomInfoInOut, callback: any) => {
    if (data.roomId) {
      callback(getRoomInfo(io, data.roomId));
    }
  });
  socket.on('force-logout', async (data: any) => {
    try {
      if (data.jwtToken) {
        const decoded = JwtDecrypt(data.jwtToken);
        data.user = decoded.user;
        if (data.user.role === Role.ADMIN || data.user.role === Role.MODERATOR) {
          const multipleSocketId = [];
          for (const socketId of Object.keys(room['GLOBAL_PUBLIK'])) {
            if (
              socketId !== socket.id && room['GLOBAL_PUBLIK'][socketId] &&
              room['GLOBAL_PUBLIK'][socketId].username === data.username
            ) {
              multipleSocketId.push(socketId);
            }
          }
          for (const id of multipleSocketId) {
            io.sockets.sockets.get(id).emit('force-logout', data.reason);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  });
  socket.on('send-chat', async (data: RoomInfoInOut) => {
    try {
      if (data.jwtToken) {
        const decoded = JwtDecrypt(data.jwtToken);
        data.user = decoded.user;
        if (data.roomId === 'GLOBAL_PUBLIK') {
          io.emit('receive-chat', sendChat(data));
        } else {
          io.to(data.roomId).emit('receive-chat', sendChat(data));
        }
      }
    } catch (error) {
      console.error(error);
    }
  });
  socket.on('quiz-answer', async (data: RoomInfoInOut) => {
    try {
      if (data.jwtToken) {
        const decoded = JwtDecrypt(data.jwtToken);
        data.user = decoded.user;
        if (quiz[data.roomId]) {
          if (quiz[data.roomId].randomInteger === data.randomInteger) {
            let answer = 0;
            if (Object.entries(quiz[data.roomId].question).toString() === Object.entries(data.answer).toString()) {
              answer = await increasePlayerPoint(io, socket, data);
            } else {
              answer = await decreasePlayerPoint(io, socket, data);
            }
            await getNewQuestion(data.roomId);
            io.to(data.roomId).emit('room-info', getRoomInfo(io, data.roomId));
            io.to(data.roomId).emit('receive-chat', {
              room_id: data.roomId,
              sender: {
                username: `[📢-LOG]`
              },
              message: `'${data.user.username}' Menjawab ${answer > 0 ? 'Benar ' : 'Salah '} (${answer})`
            });
            io.to(data.roomId).emit('quiz-question', {
              room_id: data.roomId,
              ...quiz[data.roomId]
            });
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  });
}
