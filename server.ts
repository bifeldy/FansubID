import 'zone.js/dist/zone-node';
import 'localstorage-polyfill';
import 'reflect-metadata';

import fs from 'fs';
import path from 'path';

import cors from 'cors';
import rateLimit from 'express-rate-limit';

const domino = require('domino');
const ssrPage = fs.readFileSync(path.join(process.cwd(), 'dist/hikki/browser', 'index.html')).toString();
const win = domino.createWindow(ssrPage);

global.window = win;
global.document = win.document;
global.localStorage = localStorage;

import { createConnection } from 'typeorm';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

import MorganChalk from './src/api/helpers/morganChalk';

// Model
import { Profile } from 'src/api/entities/Profile';
import { KartuTandaPenduduk } from './src/api/entities/KartuTandaPenduduk';
import { User } from './src/api/entities/User';
import { ProjectType } from 'src/api/entities/ProjectType';
import { Fansub } from 'src/api/entities/Fansub';
import { Anime } from 'src/api/entities/Anime';
import { Berkas } from 'src/api/entities/Berkas';

const dbName = process.env.DB_NAME || 'hikkiid_main-site';
const dbUsername = process.env.DB_USERNAME || 'bifeldy';
const dbPassword = process.env.DB_PASSWORD || '123qweasdzxc';

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
    Berkas
  ]
};

// Express Router
import indexRouter from './src/api/routes';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {

  const apiLimiter = rateLimit({
    windowMs: 1000, // 1 Second
    max: 10, // 10 Request
    message: '💩 Sabar Wheiy, Jangan Nge-SPAM! 💩'
  });
  const server = express();

  console.log(`Working Directory :: ${process.cwd()}`);

  const distFolder = join(process.cwd(), 'dist/hikki/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // middleware
  server.use(MorganChalk.morganChalk);
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));

  server.use(cors({
    origin: '*',
    optionsSuccessStatus: 200,
    exposedHeaders: [
      'Content-Language',
      'Content-Type',
      'Content-Length',
      'Content-Disposition',
      'Last-Modified',
      'Expires'
    ],
  }));

  // Static Image Folder
  server.use('/img', express.static(join(process.cwd(), 'dist/hikki/uploads/img')));

  // Express rest api endpoints
  server.use('/api', apiLimiter, indexRouter);

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

// tslint:disable-next-line: variable-name
const Hikki_ExpressAngularSSR = createConnection({
  ...typeOrmConfig
}).then(async connection => {
  console.log(`📚 MySQL Database ~ ${typeOrmConfig.username}@${typeOrmConfig.host}:${typeOrmConfig.port}/${typeOrmConfig.database} 🎀`);
  const port = process.env.PORT || 3000;
  const server = app();
  server.listen(port, () => {
    console.log(`✨ Node Angular TypeORM Express ~ http://localhost:${port} 💘`);
  });
}).catch(
  error => console.log(error)
);

export * from './src/main.server';
