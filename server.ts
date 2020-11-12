import 'zone.js/dist/zone-node';
import 'localstorage-polyfill';
import 'reflect-metadata';

import fs from 'fs';
import path from 'path';

import rateLimit from 'express-rate-limit';
import cors from 'cors';

const currentWorkingDir = process.cwd();

import logger from './src/api/helpers/logger';

const domino = require('domino');
const ssrPage = fs.readFileSync(path.join(currentWorkingDir, 'dist/hikki/browser', 'index.html')).toString();
const win = domino.createWindow(ssrPage);

global.window = win;
global.document = win.document;
global.localStorage = localStorage;

import { createConnection, Equal, getRepository } from 'typeorm';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

import MorganChalk from './src/api/helpers/morganChalk';

// Model
import { Profile } from './src/api/entities/Profile';
import { KartuTandaPenduduk } from './src/api/entities/KartuTandaPenduduk';
import { User } from './src/api/entities/User';
import { ProjectType } from './src/api/entities/ProjectType';
import { Fansub } from './src/api/entities/Fansub';
import { Anime } from './src/api/entities/Anime';
import { Berkas } from './src/api/entities/Berkas';
import { Attachment } from './src/api/entities/Attachment';
import { TempAttachment } from './src/api/entities/TempAttachment';
import { CorsApiKey } from './src/api/entities/CorsApiKey';

const dbName = process.env.DB_NAME || 'hikki';
const dbUsername = process.env.DB_USERNAME || 'root';
const dbPassword = process.env.DB_PASSWORD || '';

const typeOrmConfig: any = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: dbUsername,
  password: dbPassword,
  database: dbName,
  synchronize: true,
  logging: false,
  entities: [
    User,
    KartuTandaPenduduk,
    Profile,
    ProjectType,
    Fansub,
    Anime,
    Berkas,
    Attachment,
    TempAttachment,
    CorsApiKey
  ]
};

// Express Router
import indexRouter from './src/api/routes';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {

  const server = express();

  // Express rest api endpoints
  const apiLimiter = rateLimit({
    windowMs: 1000, // 1 Second
    max: 10, // 10 Request
    message: '💩 Sabar Wheiy, Jangan Nge-SPAM! 💩'
  });

  // CORS Options
  const corsOptions = {
    origin: async (origin, callback) => {
      try {
        let orig = origin;
        if (!orig) {
          callback(null, true);
        } else {
          if (orig.startsWith('http://')) {
            orig = orig.slice(7, orig.length);
          } else if (orig.startsWith('https://')) {
            orig = orig.slice(8, orig.length);
          }
          if (orig.startsWith('www.')) {
            orig = orig.slice(4, orig.length);
          }
          orig = orig.split(':')[0];
          const originApiKeyRepo = getRepository(CorsApiKey);
          const originApiKey = await originApiKeyRepo.findOneOrFail({
            where: [
              { domain: Equal(orig) }
            ]
          });
          if (originApiKey) {
            callback(null, true);
          } else {
            throw new Error('CORS Wheiy~ Siapa Nih ?');
          }
        }
      } catch (error) {
        console.error(error);
        callback(new Error('CORS Wheiy~ Siapa Nih ?'), false);
      }
    }
  };

  // Config
  server.set('trust proxy', true);

  // Middleware
  server.use(cors(corsOptions));
  server.use(MorganChalk.morganChalk);
  server.use(express.json({ limit: '992mb' }));
  server.use(express.urlencoded({ extended: false, limit: '992mb' }));
  server.use('/api', apiLimiter, indexRouter);

  logger.log(`Working Directory :: ${currentWorkingDir}`);

  const distFolder = join(currentWorkingDir, 'dist/hikki/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

createConnection({
  ...typeOrmConfig
}).then(async connection => {
  const c: any = connection;
  logger.log(`📚 ${c.options.type} Database ~ ${c.options.username}@${c.options.host}:${c.options.port}/${c.options.database} 🎀`);
  const port = process.env.PORT || 4000;
  const server = app();
  server.listen(port, () => {
    logger.log(`✨ Node Angular TypeORM Express ~ http://localhost:${port} 💘`);
  });
}).catch(
  error => console.error(error)
);

export * from './src/main.server';
