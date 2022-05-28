import { Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Equal, MoreThanOrEqual } from 'typeorm';

import { RoomModel, RoomInfoInOutModel, RoomInfoModel, PayloadModel } from '../../models/socket-io.model';
import { NotificationService } from '../repository/notification.service';

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
      return this.getClientSocket(socketOrRoomId).emit(key, data, callback);
    }
    return this.io.to(socketOrRoomId).emit(key, data);
  }

  getAllClientsSocket(): Map<string, Socket> {
    const allClients = this.io.sockets.sockets;
    this.gs.log('[SOCKET_IO_SERVICE-GET_ALL_CLIENT_SOCKET] 📢', allClients.size);
    return allClients;
  }

  getClientSocket(socketId: string): Socket {
    const socket = this.getAllClientsSocket().get(socketId);
    this.gs.log('[SOCKET_IO_SERVICE-GET_CLIENT_SOCKET] 📢', socket.id);
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
      for (const socketId of Object.keys(this.rooms[this.gs.globalPublicSocketRoomName])) {
        if (
          socketId !== socket.id && this.rooms[this.gs.globalPublicSocketRoomName][socketId] &&
          this.rooms[this.gs.globalPublicSocketRoomName][socketId].username === data.user.username
        ) {
          multipleSocketId.push(socketId);
        }
      }
      for (const id of multipleSocketId) {
        this.emitToRoomOrId(id, 'multiple-connection', [...multipleSocketId, socket.id], () => {
          this.getClientSocket(id).disconnect(true);
        });
      }
    }
  }

  disconnectRoom(socket: Socket) {
    for (const roomId of Object.keys(this.rooms)) {
      delete this.rooms[roomId][socket.id];
      this.emitToRoomOrId(roomId, 'room-info', this.getRoomInfo(roomId));
    }
  }

  async leaveRoom(socket: Socket, data: RoomInfoInOutModel): Promise<void> {
    if (data.oldRoom) {
      if (!this.rooms[data.oldRoom]) {
        this.rooms[data.oldRoom] = {};
      }
      delete this.rooms[data.oldRoom][socket.id];
      try {
        await socket.leave(data.oldRoom);
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
      this.rooms[data.newRoom][socket.id] = data.user;
      try {
        await socket.join(data.newRoom);
      } catch (err) {
        this.gs.log('[SOCKET_IO-JOIN_UPDATE_ROOM] 📢', err, 'error');
      }
      if (data.user) {
        const selectedUser = await this.userRepo.findOneOrFail({
          where: [
            { id: Equal(data.user.id) }
          ],
          relations: ['profile_']
        });
        delete selectedUser.profile_.description;
        delete selectedUser.profile_.updated_at;
        this.rooms[data.newRoom][socket.id].profile_ = selectedUser.profile_;
        if (data.newRoom.startsWith('/nihongo/')) {
          if (!this.qs.quiz[data.newRoom]) {
            await this.qs.getNewQuestion(data.newRoom);
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

  checkUserLogin(client: Socket, payload: PayloadModel): void {
    const ip = client.handshake.headers['x-real-ip'] || client.handshake.headers['x-forwarded-for'] || client.handshake.address || client.request.socket.remoteAddress || '';
    payload.ip = ip as string;
    if (payload.jwtToken) {
      try {
        const decoded = this.cs.jwtDecrypt(payload.jwtToken);
        payload.user = decoded.user;
      } catch (error) {
        payload.user = null;
      }
    } else {
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
