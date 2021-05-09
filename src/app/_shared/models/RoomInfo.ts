export interface RoomInfoResponse {
  room_id?: string;
  member_list?: any;
  socket_count?: number;
}

export interface RoomInfoInOut {
  oldRoom?: string;
  newRoom?: string;
  jwtToken?: string;
  user?: any;
}
