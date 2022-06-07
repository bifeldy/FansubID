import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Server, Socket  } from 'socket.io';
import { Equal, ILike, IsNull } from 'typeorm';

import { CONSTANTS } from '../../constants';

import { RoleModel } from '../../models/req-res.model';
import { CallbackModel, PayloadModel, PingPongModel, RoomInfoModel, ServerInfoModel } from '../../models/socket-io.model';

import { ConfigService } from '../services/config.service';
import { CryptoService } from '../services/crypto.service';
import { DiscordService } from '../services/discord.service';
import { GlobalService } from '../services/global.service';
import { QuizService } from '../services/quiz.service';
import { SocketIoService } from '../services/socket-io.service';

import { BerkasService } from '../repository/berkas.service';
import { FansubService } from '../repository/fansub.service';
import { NewsService } from '../repository/news.service';
import { ProfileService } from '../repository/profile.service';
import { TrackService } from '../repository/track.service';
import { UserService } from '../repository/user.service';

@WebSocketGateway()
export class SocketIoGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    private cfg: ConfigService,
    private berkasRepo: BerkasService,
    private cs:CryptoService,
    private ds: DiscordService,
    private fansubRepo: FansubService,
    private gs: GlobalService,
    private newsRepo: NewsService,
    private profileRepo: ProfileService,
    private qs: QuizService,
    private sis: SocketIoService,
    private trackRepo: TrackService,
    private userRepo: UserService
  ) {
    //
  }

  afterInit(server: Server) {
    this.sis.setSocketIoServer(server);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.gs.log('[SOCKET_IO_GATEWAY-CLIENT_CONNECTED] 🌟', client.id);
    this.sis.emitToBroadcast('visitors', this.sis.getAllClientsSocket().size);
    this.sis.checkNewNotification(client);
    this.ds.updateVisitor();
  }

  handleDisconnect(client: Socket, ...args: any[]) {
    this.gs.log('[SOCKET_IO_GATEWAY-CLIENT_DISCONNECTED] 🌟', client.id);
    this.sis.emitToBroadcast('visitors', this.sis.getAllClientsSocket().size);
    this.sis.disconnectRoom(client);
    this.ds.updateVisitor();
  }

  @SubscribeMessage('ping-pong')
  pingPong(client: Socket, payload: PayloadModel): PingPongModel {
    return {
      github: this.cfg.github,
      server: this.cfg.serverGet()
    }
  }

  @SubscribeMessage('server-get')
  serverGet(client: Socket, payload: PayloadModel): ServerInfoModel {
    return this.cfg.serverGet();
  }

  @SubscribeMessage('server-set')
  serverSet(client: Socket, payload: PayloadModel): ServerInfoModel | void {
    try {
      if (payload.token) {
        const decoded = this.cs.jwtDecrypt(payload.token);
        payload.user = decoded.user;
        if (payload.user.role === RoleModel.ADMIN || payload.user.role === RoleModel.MODERATOR) {
          this.cfg.serverSet(payload);
          return this.cfg.serverGet();
        }
      }
    } catch (error) {
      this.gs.log('[SOCKET_IO_SERVER_SET-ERROR] 🌟', error, 'error');
    }
  }

  @SubscribeMessage('track-get')
  async trackGet(client: Socket, payload: PayloadModel): Promise<CallbackModel> {
    try {
      let selected = null;
      if (payload.trackType === 'berkas') {
        selected = await this.berkasRepo.findOneOrFail({
          where: [
            { id: Equal(payload.idSlugUsername) }
          ]
        });
      } else if (payload.trackType === 'fansub') {
        selected = await this.fansubRepo.findOneOrFail({
          where: [
            { slug: ILike(payload.idSlugUsername) }
          ]
        });
      } else if (payload.trackType === 'user') {
        selected = await this.userRepo.findOneOrFail({
          where: [
            { username: ILike(payload.idSlugUsername) }
          ]
        });
      } else if (payload.trackType === 'news') {
        selected = await this.newsRepo.findOneOrFail({
          where: [
            { id: Equal(parseInt(payload.idSlugUsername)) }
          ]
        });
      } else {
        // Other Url Target In Hikki API -- e.g '/news/:newsId'
      }
      let tracks = null;
      const result: any = {};
      tracks = await this.trackRepo.find({
        where: [
          {
            [`${payload.trackType}_`]: {
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
      const trackColumns = this.trackRepo.getMetaData().columns;
      const trackColumnName = trackColumns.find(column => column.propertyName.startsWith(`${payload.trackType}_`)).propertyName;
      tracks = await this.trackRepo.query(`
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
      return result;
    } catch (error) {
      this.gs.log('[SOCKET_IO_TRACK_GET-ERROR] 🌟', error, 'error');
      return {
        unique_ip: 0,
        unique_user: 0,
        verified_user: 0,
        un_verified_user: 0,
        visitor: {
          visitor_date: new Date(),
          visitor_count: 0
        }
      };
    }
  }

  @SubscribeMessage('track-set')
  async trackSet(client: Socket, payload: PayloadModel): Promise<void> {
    this.sis.checkUserLogin(client, payload);
    if (
      payload.pathUrl.startsWith('/berkas/') ||
      payload.pathUrl.startsWith('/fansub/') ||
      payload.pathUrl.startsWith('/news/') ||
      payload.pathUrl.startsWith('/user/')
    ) {
      try {
        const trackType = payload.pathUrl.split('?')[0].split('/')[1];
        const idSlugUsername = payload.pathUrl.split('?')[0].split('/')[2];
        let selectedRepo = null;
        let selected = null;
        if (trackType === 'berkas') {
          selectedRepo = this.berkasRepo;
          selected = await this.berkasRepo.findOneOrFail({
            where: [
              { id: Equal(idSlugUsername) }
            ]
          });
        } else if (trackType === 'fansub') {
          selectedRepo = this.fansubRepo;
          selected = await this.fansubRepo.findOneOrFail({
            where: [
              { slug: ILike(idSlugUsername) }
            ]
          });
        } else if (trackType === 'user') {
          selectedRepo = this.userRepo;
          selected = await this.userRepo.findOneOrFail({
            where: [
              { username: ILike(idSlugUsername) }
            ],
            relations: ['profile_']
          });
        } else if (trackType === 'news') {
          selectedRepo = this.newsRepo;
          selected = await this.newsRepo.findOneOrFail({
            where: [
              { id: Equal(parseInt(idSlugUsername)) }
            ]
          });
        } else {
          // Other Url Target In Hikki API -- e.g '/news/:newsId'
        }
        const tracks = await this.trackRepo.find({
          where: [
            {
              ...((payload.user && payload.user.id) ? {
                ip: Equal(payload.ip),
                [`${trackType}_`]: {
                  id: Equal(selected.id)
                },
                track_by_: {
                  id: Equal(payload.user.id)
                }
              } : {
                ip: Equal(payload.ip),
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
          const track = this.trackRepo.new();
          track.ip = payload.ip;
          track[`${trackType}_`] = selected;
          if (payload.user) {
            track.track_by_ = payload.user;
          }
          await this.trackRepo.save(track);
          if (trackType === 'user') {
            selectedRepo = this.profileRepo;
            selected = await this.profileRepo.findOneOrFail({
              where: [
                { id: Equal(selected.profile_.id) }
              ]
            });
          }
          const visitorCount = await this.trackRepo.count({
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
        this.gs.log('[SOCKET_IO_TRACK_SET-ERROR] 🌟', error, 'error');
      }
    } else {
      // Url Target Is Other Web API -- e.g 'https://api.github.com/repos/Bifeldy/Hikki/commits'
    }
  }

  @SubscribeMessage('leave-join-room')
  async leaveJoinRoom(client: Socket, payload: PayloadModel): Promise<void> {
    try {
      if (payload.token) {
        const decoded = this.cs.jwtDecrypt(payload.token);
        payload.user = decoded.user;
      } else {
        payload.user = null;
      }
      await this.sis.leaveRoom(client, payload);
      await this.sis.joinOrUpdateRoom(client, payload);
      await this.sis.joinOrUpdateRoom(client, { user: payload.user, newRoom: CONSTANTS.socketRoomNameGlobalPublic });
      this.sis.checkMultipleConnection(client, payload);
      if (payload.user) {
        if (payload.user.role === RoleModel.ADMIN || payload.user.role === RoleModel.MODERATOR || payload.user.role === RoleModel.FANSUBBER) {
          if (payload.user.role === RoleModel.ADMIN || payload.user.role === RoleModel.MODERATOR){
            await this.sis.joinOrUpdateRoom(client, { user: payload.user, newRoom: CONSTANTS.socketRoomNameServerLogs });
          }
          await this.sis.joinOrUpdateRoom(client, { user: payload.user, newRoom: CONSTANTS.socketRoomNameGlobalFansub });
        }
      }
    } catch (error) {
      this.gs.log('[SOCKET_IO_LEAVE_JOIN_ROOM-ERROR] 🌟', error, 'error');
    }
  }

  @SubscribeMessage('room-info')
  roomInfo(client: Socket, payload: PayloadModel): RoomInfoModel | void {
    if (payload.roomId) {
      return this.sis.getRoomInfo(payload.roomId);
    }
  }

  @SubscribeMessage('force-logout')
  forceLogout(client: Socket, payload: PayloadModel): void {
    try {
      if (payload.token) {
        const decoded = this.cs.jwtDecrypt(payload.token);
        payload.user = decoded.user;
        if (payload.user.role === RoleModel.ADMIN || payload.user.role === RoleModel.MODERATOR) {
          const multipleSocketId = [];
          for (const socketId of Object.keys(this.sis.rooms[CONSTANTS.socketRoomNameGlobalPublic])) {
            if (
              socketId !== client.id && this.sis.rooms[CONSTANTS.socketRoomNameGlobalPublic][socketId] &&
              this.sis.rooms[CONSTANTS.socketRoomNameGlobalPublic][socketId].username === payload.username
            ) {
              multipleSocketId.push(socketId);
            }
          }
          for (const id of multipleSocketId) {
            this.sis.emitToRoomOrId(id, 'force-logout', payload.reason);
          }
        }
      }
    } catch (error) {
      this.gs.log('[SOCKET_IO_FORCE_LOGOUT-ERROR] 🌟', error, 'error');
    }
  }

  @SubscribeMessage('send-chat')
  sendChat(client: Socket, payload: PayloadModel): void {
    try {
      if (payload.token) {
        const decoded = this.cs.jwtDecrypt(payload.token);
        payload.user = decoded.user;
        const chatData = {
          room_id: payload.roomId,
          sender: payload.user,
          message: payload.message
        };
        if (payload.roomId === CONSTANTS.socketRoomNameGlobalPublic) {
          this.sis.emitToRoomOrId(CONSTANTS.socketRoomNameGlobalPublic, 'receive-chat', chatData);
        } else if (payload.roomId === CONSTANTS.socketRoomNameGlobalFansub) {
          if (payload.user.role === RoleModel.ADMIN || payload.user.role === RoleModel.MODERATOR || payload.user.role === RoleModel.FANSUBBER) {
            this.sis.emitToRoomOrId(CONSTANTS.socketRoomNameGlobalFansub, 'receive-chat', chatData);
          }
        } else {
          this.sis.emitToRoomOrId(payload.roomId, 'receive-chat', chatData);
        }
      }
    } catch (error) {
      this.gs.log('[SOCKET_IO_SEND_CHAT-ERROR] 🌟', error, 'error');
    }
  }

  @SubscribeMessage('quiz-answer')
  async quizAnswer(client: Socket, payload: PayloadModel): Promise<void> {
    try {
      if (payload.token) {
        const decoded = this.cs.jwtDecrypt(payload.token);
        payload.user = decoded.user;
        if (this.qs.quiz[payload.roomId]) {
          if (this.qs.quiz[payload.roomId].randomInteger === payload.randomInteger && !this.qs.quiz[payload.roomId].isAnswering) {
            this.qs.quiz[payload.roomId].isAnswering = true;
            let answer = 0;
            if (Object.entries(this.qs.quiz[payload.roomId].question).toString() === Object.entries(payload.answer).toString()) {
              answer = await this.sis.increasePlayerPoint(client, payload);
            } else {
              answer = await this.sis.decreasePlayerPoint(client, payload);
            }
            await this.qs.getNewQuestion(payload.roomId);
            this.sis.emitToRoomOrId(payload.roomId, 'receive-chat', {
              room_id: payload.roomId,
              sender: {
                username: `[📢-LOG]`
              },
              message: `'${payload.user.username}' Menjawab ${answer > 0 ? 'Benar ' : 'Salah '} (${answer})`
            });
            this.sis.emitToRoomOrId(payload.roomId, 'quiz-question', {
              room_id: payload.roomId,
              ...this.qs.quiz[payload.roomId]
            });
            this.sis.emitToRoomOrId(payload.roomId, 'room-info', this.sis.getRoomInfo(payload.roomId));
          }
        }
      }
    } catch (error) {
      this.gs.log('[SOCKET_IO_QUIZ_ANSWER-ERROR] 🌟', error, 'error');
    }
  }

}
