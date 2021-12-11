import { User } from './User';

export interface RoomInfoResponse {
  room_id?: string;
  member_list?: any;
  socket_count?: number;
}

export interface RoomInfoInOut {
  oldRoom?: string;
  newRoom?: string;
  jwtToken?: string;
  roomId?: string;
  randomInteger?: number;
  user?: User;
  answer?: any;
}

export interface RoomChat {
  roomId?: string;
  user?: User;
  message?: number;
}
