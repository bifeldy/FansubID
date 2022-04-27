import { BerkasModel, FansubModel, HirakataModel, KanjiModel, NewsModel, UserModel } from "./req-res.model";

export interface ServerInfoModel {
  consoleLog: boolean;
  isMaintenance: boolean;
  winboxOpenLink: boolean;
  discordNotification: boolean;
  openForRegister: boolean;
}

export interface PingPongModel {
  github?: object;
  server?: ServerInfoModel;
}

export interface RoomModel {
  [roomId: string]: {
    [socketId: string]: UserModel;
  };
}

export interface RoomChatModel {
  roomId?: string;
  user?: UserModel;
  message?: number;
}

export interface RoomInfoModel {
  room_id?: string;
  member_list?: {
    [socketId: string]: UserModel;
  };
  socket_count?: number;
}

export interface RoomInfoInOutModel {
  oldRoom?: string;
  newRoom?: string;
  jwtToken?: string;
  roomId?: string;
  randomInteger?: number;
  user?: UserModel;
  answer?: any;
}

export interface HirakataStatsModel {
  id?: number;
  created_at?: number | Date;
  updated_at?: number | Date;
  question_?: HirakataModel;
  answer_?: HirakataModel;
  user_?: UserModel;
}

export interface KanjiStatsModel {
  id?: number;
  created_at?: number | Date;
  updated_at?: number | Date;
  question_?: KanjiModel;
  answer_?: KanjiModel;
  user_?: UserModel;
}

export interface TrackModel {
  id?: number;
  ip?: string;
  created_at?: number | Date;
  updated_at?: number | Date;
  news_?: NewsModel;
  berkas_?: BerkasModel;
  fansub_?: FansubModel;
  user_?: UserModel;
  track_by_?: UserModel;
}