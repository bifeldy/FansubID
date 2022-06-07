import { BerkasModel, FansubModel, HirakataModel, KanjiModel, NewsModel, UserModel } from "./req-res.model";

export interface PayloadModel {
  token?: string;
  user?: UserModel;
  ip?: string;
  pathUrl?: string;
  idSlugUsername?: string;
  trackType?: string;
  roomId?: string;
  username?: string;
  reason?: string;
  message?: string;
  randomInteger: number;
  answer: string;
  [data: string]: any;
}

export interface CallbackModel {
  unique_ip?: number;
  unique_user?: number;
  verified_user?: number;
  un_verified_user?: number;
  visitor?: {
    visitor_date?: number | Date;
    visitor_count?: number;
  };
  [data: string]: any;
}

export interface ServerInfoModel {
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
  token?: string;
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