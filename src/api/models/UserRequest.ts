import User from '../../app/_shared/models/User';

import { Request } from 'express';
import { Server } from 'socket.io';

import { TextChannel } from 'discord.js';

export interface UserRequest extends Request {
  query: any;
  user?: User;
  io?: Server;
  bot?: TextChannel;
}
