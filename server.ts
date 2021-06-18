import 'zone.js/node';
import 'localstorage-polyfill';
import 'reflect-metadata';

import fs from 'fs';
import http from 'http';

import rateLimit from 'express-rate-limit';
import cors from 'cors';
import compression from 'compression';
import request from 'request';

import { Server, Socket } from 'socket.io';

import { UserRequest } from './src/api/models/UserRequest';

const currentWorkingDir = process.cwd();

import logger from './src/api/helpers/logger';

import { createConnection, Equal, getRepository } from 'typeorm';

import { ngExpressEngine } from '@nguniversal/express-engine';
import cookieParser from 'cookie-parser';
import express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';

import { Client, TextChannel, Message } from 'discord.js';

import MorganChalk from './src/api/helpers/morganChalk';
import { discordBot } from './src/api/helpers/discordBot';
import { disconnectRoom, joinOrUpdateRoom, socketBot } from './src/api/helpers/socketBot';

import { environment } from './src/environments/server/environment';

// Server Settings
import { serverGet } from './src/api/settings';

// Model
import { ApiKey } from './src/api/entities/ApiKey';

const dbType = process.env.DB_TYPE || environment.dbType;
const dbHost = process.env.DB_HOST || environment.dbHost;
const dbPort = process.env.DB_PORT || environment.dbPort;
const dbName = process.env.DB_NAME || environment.dbName;
const dbUsername = process.env.DB_USERNAME || environment.dbUsername;
const dbPassword = process.env.DB_PASSWORD || environment.dbPassword;
const dbEntities = process.env.DB_ENTITIES || environment.dbEntities;
const dbSync = process.env.DB_SYNC || environment.dbSync;
const dbLog = process.env.DB_LOG || environment.dbLog;

const typeOrmConfig: any = {
  type: dbType,
  host: dbHost,
  port: dbPort,
  username: dbUsername,
  password: dbPassword,
  database: dbName,
  synchronize: dbSync,
  logging: dbLog,
  entities: dbEntities
};

// Express Router
import indexRouter from './src/api/routes/index';

// Express rest api endpoints ~ 1 req/4s
const apiLimiter = rateLimit({
  windowMs: 60000, // 60 Seconds / 1 Minute
  max: 15, // 15 Request
  handler: (req, res, next) => {
    return res.status(429).json({
      info: '😡 429 - API SPAM :: Kebanjiran Permintaan 😤',
      result: {
        message: '💩 Sabar Wheiy, Jangan Nge-SPAM! 🤬',
      }
    });
  }
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
let io: Server = null;
let bot: Client = null;
let github = null;

async function updateVisitor(): Promise<any> {
  if (bot && io) {
    bot?.user?.setPresence({
      status: 'idle',
      activity: {
        name: `${io.sockets.sockets.size} Pengunjung`,
        type: 'WATCHING',
        url: 'http://hikki.id'
      }
    });
  }
}

// Discord Bot
function startDiscordBot(): void {
  bot.on('disconnect', (event) => {
    logger.log(`[DISCORD] 🎉 DISCONNECTED ${bot.user.username}#${bot.user.discriminator} - ${bot.user.id}`);
  });
  bot.on('ready', () => {
    logger.log(`[DISCORD] 🎉 CONNECTED ${bot.user.username}#${bot.user.discriminator} - ${bot.user.id}`);
    updateVisitor();
    request({
      method: 'GET',
      uri: `https://api.github.com/repos/${environment.author}/${environment.siteName}/commits`,
      headers: environment.nodeJsXhrHeader
    }, async (error, result, body) => {
      if (error || !result) {
        console.error(error);
      } else {
        try {
          github = JSON.parse(body)[0];
        } catch (error) {
          github = null;
        }
        // tslint:disable-next-line: max-line-length
        bot.guilds.cache.get(environment.discordGuildId)?.members.cache.get(bot.user.id)?.setNickname(`Hikki - ${github?.sha?.slice(0, 7)}`);
      }
    });
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
  io.on('connection', async (socket: Socket) => {
    joinOrUpdateRoom(io, socket, { user: null, newRoom: 'GLOBAL_PUBLIK' });
    updateVisitor();
    io.emit('visitors', io.sockets.sockets.size);
    socket.on('disconnect', () => {
      io.emit('visitors', io.sockets.sockets.size);
      disconnectRoom(io, socket);
      updateVisitor();
    });
    socket.on('ping-pong', (data: any, callback: any) => {
      if (typeof callback === 'function') {
        callback({ github, server: serverGet() });
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
    io = new Server(httpApp, {
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
  expressApp.use(cookieParser());
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
