import User from '../../app/_shared/models/User';

import { Request } from 'express';
import { Server } from 'socket.io';

export interface UserRequest extends Request {
  user: User;
  query: any;
  io: Server;
}
