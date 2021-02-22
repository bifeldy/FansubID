import 'zone.js/dist/zone-node';
import 'localstorage-polyfill';
import 'reflect-metadata';

import fs from 'fs';
import path from 'path';
import http from 'http';

import rateLimit from 'express-rate-limit';
import cors from 'cors';
import compression from 'compression';

import socketIo from 'socket.io';

import { UserRequest } from './src/api/models/UserRequest';

const currentWorkingDir = process.cwd();

import logger from './src/api/helpers/logger';

const domino = require('domino');
const ssrPage = fs.readFileSync(path.join(currentWorkingDir, 'dist/hikki/browser', 'index.html')).toString();
const win = domino.createWindow(ssrPage);

const MockBrowser = require('mock-browser').mocks.MockBrowser;
const mock = new MockBrowser();

global.window = win;
global.document = win.document;
global.localStorage = localStorage;
global.navigator = mock.getNavigator();

import { createConnection, Equal, getRepository } from 'typeorm';

import { ngExpressEngine } from '@nguniversal/express-engine';
import express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';

import { Client, TextChannel, Message } from 'discord.js';

import MorganChalk from './src/api/helpers/morganChalk';
import { discordBot } from './src/api/helpers/discordBot';
import { socketBot } from './src/api/helpers/socketBot';

import { environment } from './src/environments/server/environment';

// Model
import { ApiKey } from './src/api/entities/ApiKey';

const dbType = process.env.DB_TYPE || environment.dbType;
const dbHost = process.env.DB_HOST || environment.dbHost;
const dbPort = process.env.DB_PORT || environment.dbPort;
const dbName = process.env.DB_NAME || environment.dbName;
const dbUsername = process.env.DB_USERNAME || environment.dbUsername;
const dbPassword = process.env.DB_PASSWORD || environment.dbPassword;
const dbEntities = process.env.DB_ENTITIES || environment.dbEntities;

const typeOrmConfig: any = {
  type: dbType,
  host: dbHost,
  port: dbPort,
  username: dbUsername,
  password: dbPassword,
  database: dbName,
  synchronize: true,
  logging: false,
  entities: dbEntities
};

// Express Router
import indexRouter from './src/api/routes';

// Express rest api endpoints
const apiLimiter = rateLimit({
  windowMs: 1000, // 1 Second
  max: 5, // 5 Request
  message: '💩 Sabar Wheiy, Jangan Nge-SPAM! 💩'
});

// CORS Options
const corsOptions = {
  origin: async (origin, callback) => {
    try {
      let o = origin || '';
      if (!o) {
        callback(null, true);
      } else {
        if (o.startsWith('http://')) {
          o = o.slice(7, o.length);
        } else if (o.startsWith('https://')) {
          o = o.slice(8, o.length);
        }
        if (o.startsWith('www.')) {
          o = o.slice(4, o.length);
        }
        o = o.split(':')[0];
        const apiKeyRepo = getRepository(ApiKey);
        const apiKey = await apiKeyRepo.findOneOrFail({
          where: [
            { ip_domain: Equal(o) }
          ]
        });
        if (apiKey) {
          callback(null, true);
        } else {
          throw new Error('Origin, Wheiy~ Siapa Nih ?');
        }
      }
    } catch (error) {
      console.error(error);
      callback(new Error('Origin, Wheiy~ Siapa Nih ?'), false);
    }
  }
};

// Standard server not serverless
let io = null;
let bot = null;

// Discord Bot
function startDiscordBot(): void {
  let botPresenceStatusInterval = null;
  bot.on('disconnect', (event) => {
    logger.log(`[DISCORD] 🎉 DISCONNECTED ${bot.user.username}#${bot.user.discriminator} - ${bot.user.id}`);
    if (botPresenceStatusInterval) {
      clearInterval(botPresenceStatusInterval);
    }
  });
  bot.on('ready', () => {
    logger.log(`[DISCORD] 🎉 CONNECTED ${bot.user.username}#${bot.user.discriminator} - ${bot.user.id}`);
    botPresenceStatusInterval = setInterval(async () => {
      try {
        const presenceStatus: any = [
          'dnd',
          'idle',
          'online'
        ];
        const presenceType: any = [
          'COMPETING',
          'WATCHING',
          'LISTENING',
          'PLAYING',
          'STREAMING',
          'CUSTOM_STATUS'
        ];
        const presenceName: any = [
          'http://www.hikki.id',
          'Anime Database',
          'Fansub Database',
          'Nihongo 日本語',
          `${io.sockets.sockets.size} Pengunjung`
        ];
        await bot.user.setPresence({
          status: presenceStatus[Math.floor(Math.random() * presenceStatus.length)],
          activity: {
            name: presenceName[Math.floor(Math.random() * presenceName.length)],
            type: presenceType[Math.floor(Math.random() * presenceType.length)],
            url: 'http://hikki.id'
          }
        });
      } catch (error) {
        console.error(error);
      }
    }, 15000);
  });
  bot.on('message', async (msg: Message) => {
    try {
      msg.channel = (msg.channel as TextChannel);
      if (msg.channel.id === environment.discordBotChannelBotId) {
        logger.log(`[${msg.guild.name}] [${msg.channel.name}] [${msg.author.username}#${msg.author.discriminator}] ${msg.content}`);
        await discordBot(io, msg);
      }
    } catch (error) {
      console.error(error);
    }
  });
  if (environment.production) {
    bot.login(environment.discordBotLoginToken).catch(console.error);
  }
}

// Socket.io
function startSocketIo(): void {
  io.on('connection', async (socket: socketIo.Socket) => {
    io.emit('visitors', io.sockets.sockets.size);
    socket.on('disconnect', () => {
      io.emit('visitors', io.sockets.sockets.size);
    });
    socket.on('ping-pong', (cb) => {
      if (typeof cb === 'function') {
        cb();
      }
    });
    await socketBot(io, socket);
  });
}

// The Express app is exported so that it can be used by serverless Functions.
export function app(): http.Server {

  const expressApp = express();
  const httpApp = http.createServer(expressApp);
  if (!io) {
    io = new socketIo.Server(httpApp, {
      cors: corsOptions
    });
    startSocketIo();
  }
  if (!bot) {
    bot = new Client();
    startDiscordBot();
  }

  // NginX Server Proxy
  expressApp.set('trust proxy', true);

  // CORS
  expressApp.use(cors(corsOptions));

  // Middleware
  expressApp.use(compression());
  expressApp.use(MorganChalk.morganChalk);
  expressApp.use(express.json({ limit: '512mb' }));
  expressApp.use(express.urlencoded({ extended: false, limit: '512mb' }));

  expressApp.use(async (req: UserRequest, res, next) => {
    req.io = io;
    req.bot = (bot.channels.cache.get(environment.discordBotChannelEventId) as TextChannel);
    next();
  });

  // GET `/verify-discord`
  expressApp.get('/verify-discord', (req, res) => {
    return res.redirect(`https://discord.com/api/oauth2/authorize?redirect_uri=${encodeURIComponent(environment.baseUrl)}%2Fverify%3Fapp%3Ddiscord&client_id=${environment.discordClientId}&response_type=code&scope=identify%20email`);
  });

  expressApp.use('/api', apiLimiter, indexRouter);

  logger.log(`[CLI] 📢 Working Directory :: ${currentWorkingDir} 🧨`, null, true);

  const distFolder = join(currentWorkingDir, 'dist/hikki/browser');
  const indexHtml = fs.existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  expressApp.engine('html', ngExpressEngine({
    bootstrap: AppServerModule
  }));

  expressApp.set('view engine', 'html');
  expressApp.set('views', distFolder);

  // Serve static files from /browser
  expressApp.get('*.*', express.static(distFolder));

  // All regular routes use the Universal engine
  expressApp.get('*', (req, res) => {
    return res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return httpApp;
}

// Main application
createConnection({
  ...typeOrmConfig
}).then(async connection => {
  const c: any = connection;
  // tslint:disable-next-line: max-line-length
  logger.log(`[DB] 📚 ${c.options.type} Database ~ ${c.options.username}@${c.options.host}:${c.options.port}/${c.options.database} 🎀`, null, true);
  const port = process.env.PORT || 4000;
  const listener: any = app().listen(port, () => {
    logger.log(`[HTTP] ✨ Node Angular TypeORM Express Socket ~ ${listener.address().address}:${listener.address().port} 💘`, null, true);
  });
}).catch(
  error => console.error(error)
);

export * from './src/main.server';
