import { Request } from 'express';
import { Server } from 'socket.io';

import { UserModel } from '../../models/req-res.model';

export interface UserRequest extends Request {
  query: any;
  user?: UserModel;
  io?: Server;
  botSendNews?: Function;
}
