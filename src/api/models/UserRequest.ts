import { Request } from 'express';
import { Server } from 'socket.io';

import { User } from '../../app/_shared/models/User';

export interface UserRequest extends Request {
  query: any;
  user?: User;
  io?: Server;
  botSendNews?: Function;
}
