import fs from 'fs';
import { Response, NextFunction } from 'express';

import { UserRequest } from '../models/UserRequest';

import { environment } from '../../environments/server/environment';

// tslint:disable-next-line: typedef
function log(text, data = null, print = false) {
  if (!environment.production) {
    print = true;
  }
  if (print) {
    if (data) {
      fs.appendFile('stdout.log', text + JSON.stringify(data) + ' 🎶\n', (err) => {
        if (err) {
          console.error(err);
        }
      });
    } else {
      fs.appendFile('stdout.log', text + '\n', (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
  }
}

// tslint:disable-next-line: typedef
async function reqBodyCleanUp(req: UserRequest, res: Response, next: NextFunction) {
  for (const propName in req.body) {
    if (req.body[propName] === null || req.body[propName] === undefined || req.body[propName] === '') {
      delete req.body[propName];
    }
  }
  log('[REQUEST_HEADER] 🏹 ', req.headers);
  log('[REQUEST_BODY] 🏹 ', req.body);
  return next();
}

export default { log, reqBodyCleanUp };
