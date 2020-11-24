import fs from 'fs';
import { Response, NextFunction } from 'express';

import { UserRequest } from '../models/UserRequest';

import { environment } from '../../environments/environment';

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
async function reqBodyLogger(req: UserRequest, res: Response, next: NextFunction) {
  log('[REQUEST_BODY] 🏹 ', req.body);
  return next();
}

export default { log, reqBodyLogger };
