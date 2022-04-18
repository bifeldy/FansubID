import { Response, NextFunction } from 'express';

import { UserRequest } from '../models/UserRequest';

import { serverGetConsoleLog } from '../settings';

import { environment } from '../../environments/api/environment';

export function log(text, data = null, forcePrint = false) {
  if (!environment.production || serverGetConsoleLog()) {
    forcePrint = true;
  }
  if (forcePrint) {
    if (data) {
      console.log(text, data);
    } else {
      console.log(text);
    }
  }
}

export async function reqHeaderBodyCleanUp(req: UserRequest, res: Response, next: NextFunction) {
  for (const propName in req.body) {
    if (req.body[propName] === null || req.body[propName] === undefined || req.body[propName] === '') {
      delete req.body[propName];
    }
  }
  log('[REQUEST_HEADER] 🏹', req.headers);
  log('[REQUEST_BODY] 🏹', req.body);
  return next();
}
