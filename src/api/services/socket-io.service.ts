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

import { CryptoService } from './crypto.service';
import { GlobalService } from './global.service';
import { QuizService } from './quiz.service';

@Injectable()
export class SocketIoService {

  @WebSocketServer()
  io: Server;

  rooms: RoomModel = {};

  constructor(
    private cs:CryptoService,
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

  emitToRoomOrId(socketOrRoomId: string, key: string, data: any, callback = null): boolean {
    this.gs.log('[SOCKET_IO_SERVICE-EMIT_PRIVATE] 📢', { socketOrRoomId, key, data });
    if (callback) {
      return this.getClientSocket(socketOrRoomId)?.emit(key, data, callback);
    }
    return this.io.to(socketOrRoomId).emit(key, data);
  }

  getAllClientsSocket(): Map<string, Socket> {
    const allClients = this.io?.sockets?.sockets;
    this.gs.log('[SOCKET_IO_SERVICE-GET_ALL_CLIENT_SOCKET] 📢', allClients?.size);
    return allClients;
  }

  getClientSocket(socketId: string): Socket {
    const socket = this.getAllClientsSocket()?.get(socketId);
    this.gs.log('[SOCKET_IO_SERVICE-GET_CLIENT_SOCKET] 📢', socket?.id);
    return socket;
  }

  /** */

  getRoomInfo(roomId: string): RoomInfoModel {
    return {
      room_id: roomId,
      member_list: this.rooms[roomId],
      socket_count: this.io.sockets.adapter.rooms.get(roomId)?.size || 0
    };
  }

  checkMultipleConnection(socket: Socket, data: RoomInfoInOutModel): void {
    if (data.user) {
      const multipleSocketId = [];
      for (const socketId of Object.keys(this.rooms[CONSTANTS.socketRoomNameGlobalPublic])) {
        if (
          socketId !== socket.id && this.rooms[CONSTANTS.socketRoomNameGlobalPublic][socketId] &&
          this.rooms[CONSTANTS.socketRoomNameGlobalPublic][socketId].username === data.user.username
        ) {
          multipleSocketId.push(socketId);
        }
      }
      for (const id of multipleSocketId) {
        this.emitToRoomOrId(id, 'multiple-connection', [...multipleSocketId, socket.id], () => {
          this.getClientSocket(id)?.disconnect(true);
        });
      }
    }
  }

  disconnectRoom(socket: Socket) {
    for (const roomId of Object.keys(this.rooms)) {
      this.leaveRoom(socket, { oldRoom: roomId });
    }
  }

  async leaveRoom(socket: Socket, data: RoomInfoInOutModel): Promise<void> {
    if (data.oldRoom) {
      if (!this.rooms[data.oldRoom]) {
        this.rooms[data.oldRoom] = {};
      }
      try {
        await socket.leave(data.oldRoom);
        delete this.rooms[data.oldRoom][socket.id];
      } catch (err) {
        this.gs.log('[SOCKET_IO-LEAVE_ROOM] 📢', err, 'error');
      }
      this.emitToRoomOrId(data.oldRoom, 'room-info', this.getRoomInfo(data.oldRoom));
    }
  }

  async joinOrUpdateRoom(socket: Socket, data: RoomInfoInOutModel): Promise<void> {
    if (data.newRoom) {
      if (!this.rooms[data.newRoom]) {
        this.rooms[data.newRoom] = {};
      }
      try {
        await socket.join(data.newRoom);
        this.rooms[data.newRoom][socket.id] = data.user;
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
      this.emitToRoomOrId(data.newRoom, 'room-info', this.getRoomInfo(data.newRoom));
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
    this.rooms[data.roomId][socket.id].profile_ = resSaveProfile;
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
      this.rooms[data.roomId][socket.id].profile_ = resSaveProfile;
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
