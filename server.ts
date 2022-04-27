import 'zone.js/node';
import 'localstorage-polyfill';
import 'reflect-metadata';

import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

import cors from 'cors';
import compression from 'compression';

import cookieParser from 'cookie-parser';
import express from 'express';

import MorganChalk from './src/api/helpers/morganChalk';

import { log } from './src/api/helpers/logger';
import { NodeFetchGET } from './src/api/helpers/fetcher';

import { Server, Socket } from 'socket.io';

import { UserRequest } from './src/api/models/UserRequest';

import { createConnection, Equal, getRepository } from 'typeorm';

import { ngExpressEngine } from '@nguniversal/express-engine';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';

import { Client, TextChannel, Message, NewsChannel, Intents } from 'discord.js';

import { discordBot } from './src/api/programs/discordBot';
import { disconnectRoom, joinOrUpdateRoom, socketBot } from './src/api/programs/socketWeb';

import { environment } from './src/environments/api/environment';

import { serverGet, serverGetDiscordNotification } from './src/api/settings';

import { ApiKey } from './src/api/entities/ApiKey';

const currentWorkingDir = process.cwd();

const dbType = process.env['DB_TYPE'] || environment.dbType;
const dbHost = process.env['DB_HOST'] || environment.dbHost;
const dbPort = process.env['DB_PORT'] || environment.dbPort;
const dbName = process.env['DB_NAME'] || environment.dbName;
const dbUsername = process.env['DB_USERNAME'] || environment.dbUsername;
const dbPassword = process.env['DB_PASSWORD'] || environment.dbPassword;
const dbEntities = process.env['DB_ENTITIES'] || environment.dbEntities;
const dbSync = process.env['DB_SYNC'] || environment.dbSync;
const dbLog = process.env['DB_LOG'] || environment.dbLog;

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

// CORS Options
const corsOptions: cors.CorsOptions = {
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
  },
};

// Standard server not serverless
let io: Server = null;
let bot: Client = null;
let github = null;

async function updateVisitor(): Promise<any> {
  if (bot && io) {
    bot?.user?.setPresence({
      status: 'idle',
      activities: [
        {
          name: `${io.sockets.sockets.size} Pengunjung`,
          type: 'WATCHING',
          url: environment.baseUrl
        }
      ]
    });
  }
}

// Discord Bot
function startDiscordBot(): void {
  bot.on('messageCreate', (msg: Message) => {
    if (msg.channel.id === environment.discordBotChannelBotId && msg.content.startsWith('~')) {
      log(`[${msg.guild.name}] [${(msg.channel as TextChannel).name}] [${msg.author.username}#${msg.author.discriminator}] ${msg.content}`);
      discordBot(io, msg).catch(console.error);
    }
  });
  bot.once('ready', async () => {
    try {
      log(`[DISCORD_CONNECTED] 🎉 ${bot.user.username}#${bot.user.discriminator} - ${bot.user.id} 🎶`);
      updateVisitor();
      const url = new URL(`https://api.github.com/repos/${environment.author}/${environment.siteName}/commits`);
      const res_raw = await NodeFetchGET(url, environment.nodeJsXhrHeader);
      const gh: any = await res_raw.json();
      github = gh[0];
      bot.guilds.cache.get(environment.discordGuildId)?.members.cache.get(bot.user.id)?.setNickname(`Hikki - ${github?.sha?.slice(0, 7)}`);
    } catch (error) {
      console.error(error);
      github = null;
    }
  });
  if (environment.production) {
    bot.login(environment.discordBotLoginToken).catch(console.error);
  }
}

function socketGenerateId(token: string): string {
  return `${environment.siteName}-${new Date().getTime()}`;
}

// Socket.io
function startSocketIo(): void {
  io.engine.generateId = (req: any) => socketGenerateId(req.headers.token);
  io.use((socket: any, next) => {
    socket.id = socketGenerateId(socket.handshake.headers.token);
    return next();
  });
  io.on('connection', async (socket: Socket) => {
    try {
      joinOrUpdateRoom(io, socket, { user: null, newRoom: 'GLOBAL_PUBLIK' });
      updateVisitor();
      io.emit('visitors', io.sockets.sockets.size);
      socket.on('disconnect', () => {
        io.emit('visitors', io.sockets.sockets.size);
        disconnectRoom(io, socket);
        updateVisitor();
      });
      socket.on('ping-pong', (data: any, callback: any) => {
        callback({ github, server: serverGet() });
      });
      await socketBot(io, socket);
    } catch (error) {
      console.error(error);
    }
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
    bot = new Client({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING
      ],
      partials: [
        'MESSAGE',
        'REACTION',
        'GUILD_MEMBER',
        'USER',
        'CHANNEL'
      ]
    });
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
    req.botSendNews = function botSendNews(optionMessage: any) {
      const botEnabled = environment.production ? (bot.channels.cache.get(environment.discordBotChannelEventId) as NewsChannel) : null;
      if (botEnabled && serverGetDiscordNotification()) {
        botEnabled.send(optionMessage).catch(console.error);
      }
    };
    return next();
  });

  // GET `/verify-discord`
  expressApp.get('/verify-discord', (req, res) => {
    return res.redirect(`https://discord.com/api/oauth2/authorize?redirect_uri=${encodeURIComponent(environment.baseUrl)}%2Fverify%3Fapp%3Ddiscord&client_id=${environment.discordClientId}&response_type=code&scope=identify%20email`);
  });

  expressApp.use('/api', indexRouter);

  log(`[CLI] 📢 Working Directory :: ${currentWorkingDir} 🧨`, null, true);

  const distFolder = path.join(currentWorkingDir, `dist/${environment.siteName.toLocaleLowerCase()}/browser`);
  const indexHtml = fs.existsSync(path.join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

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
  log(`[DB] 📚 ${c.options.type} Database ~ ${c.options.username}@${c.options.host}:${c.options.port}/${c.options.database} 🎀`, null, true);
  const port = process.env['PORT'] || 4000;
  const listener: any = app().listen(port, () => {
    log(`[HTTP] ✨ Node Angular TypeORM Express Socket ~ ${listener.address().address}:${listener.address().port} 💘`, null, true);
  });
}).catch(
  error => console.error(error)
);

export * from './src/main.server';
