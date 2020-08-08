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
import { KartuTandaPenduduk } from './src/api/entities/KartuTandaPenduduk';
import { User } from './src/api/entities/User';
import { ProjectType } from 'src/api/entities/ProjectType';
import { Fansub } from 'src/api/entities/Fansub';
import { Berkas } from 'src/api/entities/Berkas';

const typeOrmConfig: any = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'hikki',
  synchronize: true,
  logging: false,
  entities: [User, KartuTandaPenduduk, ProjectType, Fansub, Berkas]
};

// Express Router
import indexRouter from './src/api/routes';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {

  const apiLimiter = rateLimit({
    windowMs: 1000, // 1 Second
    max: 2, // 2 Request
    message: '💩 Sabar Wheiy, Jangan Nge-SPAM! 💩'
  });
  const server = express();

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
    exposedHeaders: [
      'Cache-Control',
      'Content-Language',
      'Content-Type',
      'Expires',
      'Last-Modified',
      'Pragma',
      'Content-Length',
      'Content-Disposition'
    ],
  }));

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

function run(): void {
  createConnection({
    ...typeOrmConfig
  }).then(async connection => {
    console.log(`📚 MySQL Database ~ ${typeOrmConfig.username}@${typeOrmConfig.host}:${typeOrmConfig.port}/${typeOrmConfig.database} 🎀`);
    const port = process.env.PORT || 4000;
    const server = app();
    server.listen(port, () => {
      console.log(`✨ Node Angular TypeORM Express ~ http://localhost:${port} 💘`);
    });
  }).catch(error => console.log(error));
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
