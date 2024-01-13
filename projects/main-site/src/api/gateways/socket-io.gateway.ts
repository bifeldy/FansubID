// 3rd Party Library
import Mutex from 'standalone-mutex';

// NodeJS Library
import cluster from 'node:cluster';

import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Server, Socket  } from 'socket.io';
import { Equal, ILike, IsNull } from 'typeorm';

import { CONSTANTS } from '../../constants';

import { RoleModel } from '../../models/req-res.model';
import { VisitorModel, PayloadModel, PingPongModel, RoomInfoModel, StatsServerModel, ServerInfoModel } from '../../models/socket-io.model';

import { ClusterMasterSlaveService } from '../services/cluster-master-slave.service';
import { ConfigService } from '../services/config.service';
import { GlobalService } from '../services/global.service';
import { QuizService } from '../services/quiz.service';
import { SocketIoService } from '../services/socket-io.service';

import { TrackerStatisticsService } from '../scheduler/tracker-statistics-tasks.service';

import { BerkasService } from '../repository/berkas.service';
import { FansubService } from '../repository/fansub.service';
import { NewsService } from '../repository/news.service';
import { ProfileService } from '../repository/profile.service';
import { TrackService } from '../repository/track.service';
import { UserService } from '../repository/user.service';

@WebSocketGateway()
export class SocketIoGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private timeoutSocketConnect = null;

  constructor(
    private cms: ClusterMasterSlaveService,
    private cfg: ConfigService,
    private berkasRepo: BerkasService,
    private fansubRepo: FansubService,
    private gs: GlobalService,
    private newsRepo: NewsService,
    private profileRepo: ProfileService,
    private qs: QuizService,
    private sis: SocketIoService,
    private trackRepo: TrackService,
    private userRepo: UserService,
    private ts: TrackerStatisticsService
  ) {
    //
  }

  afterInit(server: Server) {
    this.sis.setSocketIoServer(server);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.gs.log('[SOCKET_IO_GATEWAY-CLIENT_CONNECTED] 🌟', client.id);
    this.sis.checkNewNotification(client);
    if (this.timeoutSocketConnect) {
      clearTimeout(this.timeoutSocketConnect);
    }
    this.timeoutSocketConnect = setTimeout(async () => {
      this.timeoutSocketConnect = null;
      const totalSockets = await this.getTotalSocket();
      this.ts.updateVisitor(`🏃‍♂️ ${totalSockets} Pengunjung`);
      this.sis.emitToBroadcast('visitor', totalSockets);
    }, 5 * 1000);
  }

  async handleDisconnect(client: Socket, ...args: any[]) {
    this.gs.log('[SOCKET_IO_GATEWAY-CLIENT_DISCONNECTED] 🌟', client.id);
    await this.sis.disconnectRoom(client);
    const totalSockets = await this.getTotalSocket();
    this.sis.emitToBroadcast('visitor', totalSockets);
    this.ts.updateVisitor(`🏃‍♂️ ${totalSockets} Pengunjung`);
  }

  async getTotalSocket(): Promise<number> {
    const visitor = (await this.sis.getAllClientsSocket()).length;
    await this.cfgStatsServerSet({ nodes: visitor });
    return visitor;
  }

  /** */

  async cfgServerSet(serverInfo: ServerInfoModel): Promise<void> {
    if (cluster.isMaster) {
      this.cfg.serverSet(serverInfo);
    } else {
      await this.cms.sendMessageToMaster('CFG_SERVER_SET', serverInfo);
    }
  }

  async cfgServerGet(): Promise<ServerInfoModel> {
    if (cluster.isMaster) {
      return this.cfg.serverGet();
    } else {
      return await this.cms.sendMessageToMaster('CFG_SERVER_GET', null);
    }
  }

  async cfgGithubGet(): Promise<any> {
    if (cluster.isMaster) {
      return this.cfg.githubGet();
    } else {
      return await this.cms.sendMessageToMaster('CFG_GITHUB_GET', null);
    }
  }

  async cfgStatsServerSet(statsServer: StatsServerModel): Promise<void> {
    if (cluster.isMaster) {
      this.cfg.statsServerSet(statsServer as any);
    } else {
      await this.cms.sendMessageToMaster('CFG_STATS_SET', statsServer);
    }
  }

  async cfgStatsServerGet(): Promise<any> {
    if (cluster.isMaster) {
      return this.cfg.statsServerGet();
    } else {
      return await this.cms.sendMessageToMaster('CFG_STATS_GET', null);
    }
  }

  /** */

  @SubscribeMessage('ping-pong')
  async pingPong(client: Socket, payload: PayloadModel): Promise<PingPongModel> {
    this.gs.log('[SOCKET_IO_PING_PONG] PID :: WID 🌟', `${process.pid} :: ${cluster.worker?.id || 0}`);
    return {
      github: await this.cfgGithubGet(),
      visitor: await this.getTotalSocket(),
      server: await this.cfgServerGet()
    };
  }

  @SubscribeMessage('stats-server')
  async statsServer(client: Socket, payload: PayloadModel): Promise<StatsServerModel> {
    return await this.cfgStatsServerGet();
  }

  @SubscribeMessage('server-set')
  async serverSet(client: Socket, payload: PayloadModel): Promise<void> {
    try {
      const original_payload = { ...payload };
      await this.sis.checkUserLogin(client, payload);
      if (payload.user) {
        if (payload.user.role === RoleModel.ADMIN || payload.user.role === RoleModel.MODERATOR) {
          this.cfgServerSet(original_payload as any);
          this.sis.emitToBroadcast('server-config', await this.cfgServerGet());
        }
      }
    } catch (error) {
      this.gs.log('[SOCKET_IO_SERVER_SET-ERROR] 🌟', error, 'error');
    }
  }

  @SubscribeMessage('track-get')
  async trackGet(client: Socket, payload: PayloadModel): Promise<VisitorModel> {
    try {
      let selected = null;
      const idSlugUsername = payload.idSlugUsername.split('?')[0];
      if (payload.trackType === 'berkas') {
        selected = await this.berkasRepo.findOneOrFail({
          where: [
            { id: Equal(idSlugUsername) }
          ]
        });
      } else if (payload.trackType === 'fansub') {
        selected = await this.fansubRepo.findOneOrFail({
          where: [
            { slug: ILike(idSlugUsername) }
          ]
        });
      } else if (payload.trackType === 'user') {
        selected = await this.userRepo.findOneOrFail({
          where: [
            { username: ILike(idSlugUsername) }
          ]
        });
      } else if (payload.trackType === 'news') {
        selected = await this.newsRepo.findOneOrFail({
          where: [
            { id: Equal(parseInt(idSlugUsername)) }
          ]
        });
      } else {
        // TODO :: Other Url Target In FansubID API -- e.g '/other/:otherId'
        throw new Error('Data Tidak Lengkap!');
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
        FROM
          (
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
              DATE_TRUNC('DAY', created_at)::DATE visitor_date,
              COUNT(*) visitor_count
            FROM
              track
            WHERE
              created_at >= NOW() - INTERVAL '7 DAY'
              AND ${trackColumnName}id = $1
            GROUP BY 1
          ) t USING (visitor_date)
        ORDER BY
          visitor_date ASC
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
        visitor: [
          {
            visitor_date: new Date(),
            visitor_count: 0
          }
        ]
      };
    }
  }

  @SubscribeMessage('track-set')
  async trackSet(client: Socket, payload: PayloadModel): Promise<void> {
    if (
      payload.pathUrl.startsWith('/berkas/') ||
      payload.pathUrl.startsWith('/fansub/') ||
      payload.pathUrl.startsWith('/news/') ||
      payload.pathUrl.startsWith('/user/')
    ) {
      try {
        await this.sis.checkUserLogin(client, payload);
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
          // TODO :: Other Url Target In FansubID API -- e.g '/other/:otherId'
          throw new Error('Data Tidak Lengkap!');
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
      // Url Target Is Other Web API -- e.g 'https://api.github.com/repos/Bifeldy/fansubid/commits'
    }
  }

  @SubscribeMessage('leave-join-room')
  async leaveJoinRoom(client: Socket, payload: PayloadModel): Promise<void> {
    try {
      await this.sis.checkUserLogin(client, payload);
      await this.sis.leaveRoom(client, payload);
      await this.sis.joinOrUpdateRoom(client, payload);
      await this.sis.joinOrUpdateRoom(client, { user: payload.user, newRoom: CONSTANTS.socketRoomNameGlobalPublic });
      await this.sis.checkMultipleConnection(client, payload);
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
  async roomInfo(client: Socket, payload: PayloadModel): Promise<void | RoomInfoModel> {
    if (payload.roomId) {
      return await this.sis.getRoomInfo(payload.roomId);
    }
  }

  @SubscribeMessage('force-logout')
  async forceLogout(client: Socket, payload: PayloadModel): Promise<void> {
    try {
      await this.sis.checkUserLogin(client, payload);
      if (payload.user) {
        if (payload.user.role === RoleModel.ADMIN || payload.user.role === RoleModel.MODERATOR) {
          const multipleSocketId = [];
          for (const socketId of Object.keys(await this.sis.cfgRoomSocketGetRoom(CONSTANTS.socketRoomNameGlobalPublic))) {
            const userRoom = await this.sis.cfgRoomSocketGetUser(CONSTANTS.socketRoomNameGlobalPublic, socketId);
            if (socketId !== client.id && userRoom && userRoom.username === payload.username) {
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
  async sendChat(client: Socket, payload: PayloadModel): Promise<void> {
    try {
      await this.sis.checkUserLogin(client, payload);
      if (payload.user) {
        const chatData = {
          room_id: payload.roomId,
          sender: payload.user,
          message: payload.message
        };
        if (payload.roomId === CONSTANTS.socketRoomNameGlobalPublic) {
          await this.sis.emitToRoomOrId(CONSTANTS.socketRoomNameGlobalPublic, 'receive-chat', chatData);
        } else if (payload.roomId === CONSTANTS.socketRoomNameGlobalFansub) {
          if (payload.user.role === RoleModel.ADMIN || payload.user.role === RoleModel.MODERATOR || payload.user.role === RoleModel.FANSUBBER) {
            await this.sis.emitToRoomOrId(CONSTANTS.socketRoomNameGlobalFansub, 'receive-chat', chatData);
          }
        } else {
          await this.sis.emitToRoomOrId(payload.roomId, 'receive-chat', chatData);
        }
      }
    } catch (error) {
      this.gs.log('[SOCKET_IO_SEND_CHAT-ERROR] 🌟', error, 'error');
    }
  }

  @SubscribeMessage('quiz-answer')
  async quizAnswer(client: Socket, payload: PayloadModel): Promise<void> {
    try {
      await this.sis.checkUserLogin(client, payload);
      if (payload.user) {
        const check1 = await this.qs.cfgQuizRoomShowQuestion(payload.roomId);
        if (check1) {
          if (check1.randomInteger === payload.randomInteger) {
            const _mutex = await Mutex.acquire(payload.roomId);
            this.gs.log('[SOCKET_IO_QUIZ_MUTEX_LOCK-INFO] 🌟', _mutex);
            try {
              const check2 = await this.qs.cfgQuizRoomShowQuestion(payload.roomId);
              if (check2.randomInteger === payload.randomInteger) {
                let answer = 0;
                if (Object.entries(check2.question).toString() === Object.entries(payload.answer).toString()) {
                  answer = await this.sis.increasePlayerPoint(client, payload);
                } else {
                  answer = await this.sis.decreasePlayerPoint(client, payload);
                }
                let question = null;
                try {
                  question = await this.qs.getNewQuestion(payload.roomId);
                } catch (err) {
                  await this.sis.emitToRoomOrId(payload.roomId, 'force-redirect', {
                    title: 'Terjadi Kesalahan',
                    message: 'Kuis Tidak Tersedia',
                    url: '/nihongo'
                  });
                  throw err;
                }
                await this.sis.emitToRoomOrId(payload.roomId, 'receive-chat', {
                  room_id: payload.roomId,
                  sender: {
                    username: '[📢-LOG]'
                  },
                  message: `'${payload.user.username}' Menjawab ${answer > 0 ? 'Benar ' : 'Salah '} (${answer})`
                });
                await this.sis.emitToRoomOrId(payload.roomId, 'quiz-question', {
                  room_id: payload.roomId,
                  ...question
                });
                await this.sis.emitToRoomOrId(payload.roomId, 'room-info', await this.sis.getRoomInfo(payload.roomId));
              }
            } catch (e) {
              this.gs.log('[SOCKET_IO_QUIZ_MUTEX_LOCK-ERROR] 🌟', e, 'error');
            }
            _mutex.release();
          }
        }
      }
    } catch (error) {
      this.gs.log('[SOCKET_IO_QUIZ_ANSWER-ERROR] 🌟', error, 'error');
    }
  }

}
