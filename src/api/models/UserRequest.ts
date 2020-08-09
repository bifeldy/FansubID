import User from '../../app/_shared/models/User';

import { Request } from 'express';

export interface UserRequest extends Request {
  user: User;
  query: any;
}
