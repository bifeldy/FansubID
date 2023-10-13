// NodeJS Library
import cluster from 'node:cluster';

import { Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Equal, MoreThanOrEqual } from 'typeorm';

import { CONSTANTS } from '../../constants';
import { UserModel } from '../../models/req-res.model';

import { RoomModel, RoomInfoInOutModel, RoomInfoModel, PayloadModel } from '../../models/socket-io.model';
import { NotificationService } from '../repository/notification.service';

import { ApiKeyService } from '../repository/api-key.service';
import { ProfileService } from '../repository/profile.service';
import { UserService } from '../repository/user.service';

import { ClusterMasterSlaveService } from './cluster-master-slave.service';
import { ConfigService } from './config.service';
import { CryptoService } from './crypto.service';
import { GlobalService } from './global.service';
import { QuizService } from './quiz.service';

@Injectable()
export class SocketIoService {

  @WebSocketServer()
  io: Server;

  constructor(
    private cms: ClusterMasterSlaveService,
    private cfg: ConfigService,
    private cs: CryptoService,
    private gs: GlobalService,
    private aks: ApiKeyService,
    private profileRepo: ProfileService,
    private notificationRepo: NotificationService,
    private qs: QuizService,
    private userRepo: UserService
  ) {
    //
  }

  setSocketIoServer(server): void {
    this.io = server;
  }

  emitToBroadcast(key: string, data: any): boolean {
    this.gs.log('[SOCKET_IO_SERVICE-EMIT_BROADCAST] 📢', { key, data });
    return this.io.emit(key, data);
  }

  async emitToRoomOrId(socketOrRoomId: string, key: string, data: any, callback = null): Promise<boolean> {
    this.gs.log('[SOCKET_IO_SERVICE-EMIT_PRIVATE] 📢', { socketOrRoomId, key, data });
    if (callback) {
      return (await this.getClientSocket(socketOrRoomId))?.emit(key, data, callback);
    }
    return this.io.to(socketOrRoomId).emit(key, data);
  }

  async getAllClientsSocket(roomId = CONSTANTS.socketRoomNameGlobalPublic): Promise<any[]> {
    const sockets = await this.io?.in(roomId).fetchSockets();
    this.gs.log('[SOCKET_IO_SERVICE-GET_ALL_CLIENT_SOCKET] 📢', sockets.length);
    return sockets;
  }

  async getClientSocket(socketId: string): Promise<any> {
    const sockets = await this.io?.in(socketId).fetchSockets();
    if (sockets.length === 1) {
      const sckt = sockets[0];
      this.gs.log('[SOCKET_IO_SERVICE-GET_CLIENT_SOCKET] 📢', sckt.id);
      return sckt;
    }
    return null;
  }

  /** */

  async cfgRoomSocketGetAll(): Promise<RoomModel> {
    if (cluster.isMaster) {
      return this.cfg.roomSocketGetAll();
    } else {
      return await this.cms.sendMessageToMaster('CFG_ROOM_SOCKET_GET_ALL', null);
    }
  }

  async cfgRoomSocketGetRoom(roomId: string): Promise<any> {
    if (cluster.isMaster) {
      return this.cfg.roomSocketGetRoom(roomId);
    } else {
      return await this.cms.sendMessageToMaster('CFG_ROOM_SOCKET_GET_ROOM', roomId);
    }
  }

  async cfgRoomSocketGetUser(roomId: string, socketId: string): Promise<UserModel> {
    if (cluster.isMaster) {
      return this.cfg.roomSocketGetUser(roomId, socketId);
    } else {
      return await this.cms.sendMessageToMaster('CFG_ROOM_SOCKET_GET_USER', { roomId, socketId });
    }
  }

  async cfgRoomSocketRemoveUser(roomId: string, socketId: string): Promise<void> {
    if (cluster.isMaster) {
      this.cfg.roomSocketRemoveUser(roomId, socketId);
    } else {
      await this.cms.sendMessageToMaster('CFG_ROOM_SOCKET_REMOVE_USER', { roomId, socketId });
    }
  }

  async cfgRoomSocketAddOrUpdateUser(roomId: string, socketId: string, user: UserModel): Promise<void> {
    if (cluster.isMaster) {
      this.cfg.roomSocketAddOrUpdateUser(roomId, socketId, user);
    } else {
      await this.cms.sendMessageToMaster('CFG_ROOM_SOCKET_ADD_OR_UPDATE_USER', { roomId, socketId, user });
    }
  }

  /** */

  async getRoomInfo(roomId: string): Promise<RoomInfoModel> {
    return {
      room_id: roomId,
      member_list: await this.cfgRoomSocketGetRoom(roomId),
      socket_count: (await this.getAllClientsSocket(roomId)).length
    };
  }

  async checkMultipleConnection(socket: Socket, data: RoomInfoInOutModel): Promise<void> {
    if (data.user) {
      const multipleSocketId = [];
      for (const socketId of Object.keys(await this.cfgRoomSocketGetRoom(CONSTANTS.socketRoomNameGlobalPublic))) {
        const userRoom = await this.cfgRoomSocketGetUser(CONSTANTS.socketRoomNameGlobalPublic, socketId);
        if (socketId !== socket.id && userRoom && userRoom.username === data.user.username) {
          multipleSocketId.push(socketId);
        }
      }
      for (const id of multipleSocketId) {
        await this.emitToRoomOrId(id, 'multiple-connection', [...multipleSocketId, socket.id], async () => {
          (await this.getClientSocket(id))?.disconnect(true);
        });
      }
    }
  }

  async disconnectRoom(socket: Socket): Promise<void> {
    for (const roomId of Object.keys(await this.cfgRoomSocketGetAll())) {
      this.leaveRoom(socket, { oldRoom: roomId });
    }
  }

  async leaveRoom(socket: Socket, data: RoomInfoInOutModel): Promise<void> {
    if (data.oldRoom) {
      await this.cfgRoomSocketRemoveUser(data.oldRoom, socket.id);
      for (const r of Object.keys(await this.cfgRoomSocketGetAll())) {
        try {
          await socket.leave(r);
        } catch (err) {
          this.gs.log('[SOCKET_IO-LEAVE_ROOM] 📢', err, 'error');
        }
      }
      await this.emitToRoomOrId(data.oldRoom, 'room-info', await this.getRoomInfo(data.oldRoom));
    }
  }

  async joinOrUpdateRoom(socket: Socket, data: RoomInfoInOutModel): Promise<void> {
    if (data.newRoom) {
      await this.cfgRoomSocketAddOrUpdateUser(data.newRoom, socket.id, data.user);
      try {
        await socket.join(data.newRoom);
      } catch (err) {
        this.gs.log('[SOCKET_IO-JOIN_UPDATE_ROOM] 📢', err, 'error');
      }
      if (data.user) {
        if (
          data.newRoom.startsWith('/nihongo/hiragana') ||
          data.newRoom.startsWith('/nihongo/katakana') ||
          data.newRoom.startsWith('/nihongo/angka') ||
          data.newRoom.startsWith('/nihongo/latihan-') ||
          data.newRoom.startsWith('/nihongo/kelas-') ||
          data.newRoom.startsWith('/nihongo/jlpt') ||
          data.newRoom.startsWith('/nihongo/semua-kanji')
        ) {
          if (!this.qs.quiz[data.newRoom]) {
            try {
              await this.qs.getNewQuestion(data.newRoom);
            } catch (err) {
              socket.emit('force-redirect', {
                title: 'Terjadi Kesalahan',
                message: 'Kuis Tidak Tersedia',
                url: '/nihongo'
              });
              throw err;
            }
          }
          socket.emit('quiz-question', {
            room_id: data.newRoom,
            ...this.qs.quiz[data.newRoom]
          });
        }
      }
      await this.emitToRoomOrId(data.newRoom, 'room-info', await this.getRoomInfo(data.newRoom));
    }
  }

  async increasePlayerPoint(socket: Socket, data: RoomInfoInOutModel): Promise<number> {
    const selectedUser = await this.userRepo.findOneOrFail({
      where: [
        { id: Equal(data.user.id) }
      ],
      relations: ['profile_']
    });
    const selectedProfile = await this.profileRepo.findOneOrFail({
      where: [
        { id: Equal(selectedUser.profile_.id) }
      ]
    });
    let points = this.qs.calculatePoints(data);
    selectedProfile.points += points;
    const resSaveProfile = await this.profileRepo.save(selectedProfile);
    delete resSaveProfile.description;
    delete resSaveProfile.updated_at;
    const userRoom = await this.cfgRoomSocketGetUser(data.roomId, socket.id);
    userRoom.profile_ = resSaveProfile;
    await this.cfgRoomSocketAddOrUpdateUser(data.roomId, socket.id, userRoom);
    return points;
  }

  async decreasePlayerPoint(socket: Socket, data: RoomInfoInOutModel): Promise<number> {
    const selectedUser = await this.userRepo.findOneOrFail({
      where: [
        { id: Equal(data.user.id) }
      ],
      relations: ['profile_']
    });
    const selectedProfile = await this.profileRepo.findOneOrFail({
      where: [
        { id: Equal(selectedUser.profile_.id) }
      ]
    });
    let points = this.qs.calculatePoints(data);
    if (selectedProfile.points > 0) {
      selectedProfile.points += (points * -1);
      if (selectedProfile.points <= 0) {
        selectedProfile.points = 0;
      }
      const resSaveProfile = await this.profileRepo.save(selectedProfile);
      delete resSaveProfile.description;
      delete resSaveProfile.updated_at;
      const userRoom = await this.cfgRoomSocketGetUser(data.roomId, socket.id);
      userRoom.profile_ = resSaveProfile;
      await this.cfgRoomSocketAddOrUpdateUser(data.roomId, socket.id, userRoom);
    }
    return (points * -1);
  }

  async checkUserLogin(client: Socket, payload: PayloadModel): Promise<void> {
    try {
      const ip = client.handshake.headers['cf-connecting-ip'] || client.handshake.address || '';
      payload.ip = this.gs.cleanIpOrigin(ip as string);
      let user: UserModel = null;
      if (payload.key) {
        const check = await this.aks.checkKey(payload.ip, payload.key);
        if (!check.allowed) {
          throw new Error('User Not Allowed!');
        } else if (check.user) {
          user = check.user;
        }
      } else if (payload.token) {
        const decoded = this.cs.jwtDecode(payload.token);
        user = decoded.user;
      }
      if (!user) {
        throw new Error('User Not Login!');
      }
      payload.user = await this.userRepo.findOneOrFail({
        where: [
          { id: Equal(user.id) }
        ],
        relations: ['kartu_tanda_penduduk_', 'profile_']
      });
      delete payload.user.email;
      delete payload.user.password;
      delete payload.user.session_token;
      delete payload.user.session_origin;
      if ('kartu_tanda_penduduk_' in payload.user && payload.user.kartu_tanda_penduduk_) {
        delete payload.user.kartu_tanda_penduduk_.nik;
        delete payload.user.kartu_tanda_penduduk_.tanggal_lahir;
        delete payload.user.kartu_tanda_penduduk_.golongan_darah;
        delete payload.user.kartu_tanda_penduduk_.alamat;
        delete payload.user.kartu_tanda_penduduk_.rt;
        delete payload.user.kartu_tanda_penduduk_.rw;
        delete payload.user.kartu_tanda_penduduk_.kelurahan_desa;
        delete payload.user.kartu_tanda_penduduk_.kecamatan;
        delete payload.user.kartu_tanda_penduduk_.agama;
        delete payload.user.kartu_tanda_penduduk_.status_perkawinan;
        delete payload.user.kartu_tanda_penduduk_.pekerjaan;
        delete payload.user.kartu_tanda_penduduk_.kewarganegaraan;
        delete payload.user.kartu_tanda_penduduk_.created_at;
        delete payload.user.kartu_tanda_penduduk_.updated_at;
      }
      if ('profile_' in payload.user && payload.user.profile_) {
        delete payload.user.profile_.description;
        delete payload.user.profile_.updated_at;
      }
    } catch (error) {
      payload.user = null;
    }
  }

  /** */

  async checkNewNotification(socket: Socket) {
    const notif = await this.notificationRepo.find({
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
  }

}
