// 3rd Party Library
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import Mutex from 'standalone-mutex';
import { AbortController } from 'abort-controller';
import { setupMaster } from '@socket.io/sticky';
import { setupPrimary } from '@socket.io/cluster-adapter';

// NodeJS Library
import cluster from 'node:cluster';
import os from 'node:os';
import process from 'node:process';
import http from 'node:http';

import { environment } from '../environments/api/environment';

import { INestApplication, INestApplicationContext } from '@nestjs/common';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { AbstractHttpAdapter, NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { urlencoded, json, Request, Response, NextFunction } from 'express';
import { Equal } from 'typeorm';

import { SocketIoAdapter } from './adapters/socket-io.adapter';
import { SocketIoClusterAdapter } from './adapters/socket-io-cluster.adapter';

import { AppModule } from './app.module';

import { CONSTANTS } from '../constants';

import { ApiKeyService } from './repository/api-key.service';
import { GlobalService } from './services/global.service';
import { SocketIoService } from './services/socket-io.service';
import { ClusterMasterSlaveService } from './services/cluster-master-slave.service';
import { DiscordService } from './services/discord.service';
import { CloudflareService } from './services/cloudflare.service';
import { FailToBanService } from './repository/fail-to-ban.service';
import { ConfigService } from './services/config.service';

// Website Pemerintah Memang Kadang-Kadang Rada-Rada ..
// Meng-Full Hadeh ..
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

export async function ctx(): Promise<INestApplicationContext> {
  return await NestFactory.createApplicationContext(AppModule);
}

// The Nest app is exported so that it can be used by serverless Functions.
export async function app(httpAdapter: AbstractHttpAdapter = null): Promise<INestApplication> {
  if (!httpAdapter) {
    httpAdapter = new ExpressAdapter(express());
  }
  const nestApp = await NestFactory.create(AppModule, httpAdapter);
  const gs = nestApp.get(GlobalService);
  const cfg = nestApp.get(ConfigService);
  const aks = nestApp.get(ApiKeyService);
  const cfs = nestApp.get(CloudflareService);
  const ftb = nestApp.get(FailToBanService);
  const sis = nestApp.get(SocketIoService);
  nestApp.setGlobalPrefix('api');
  nestApp.getHttpAdapter().getInstance().set('trust proxy', true);
  nestApp.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    // crossOriginOpenerPolicy: true,
    // crossOriginResourcePolicy: true,
    // dnsPrefetchControl: true,
    // expectCt: true,
    // frameguard: true,
    // hidePoweredBy: true,
    // hsts: true,
    // ieNoOpen: true,
    noSniff: false,
    // originAgentCluster: true,
    // permittedCrossDomainPolicies: true,
    referrerPolicy: false,
    // xssFilter: true
  }));
  nestApp.use(compression());
  nestApp.use(cookieParser());
  nestApp.use(json({ limit: '128mb' }));
  nestApp.use(urlencoded({ extended: false, limit: '128mb' }));
  nestApp.enableCors(aks.getCorsOptions());
  nestApp.use((req: Request, res: Response, next: NextFunction) => {
    const timeStart = new Date();
    res.locals['abort-controller'] = new AbortController();
    req.on('close', () => {
      try {
        res.locals['abort-controller'].abort();
      } catch (e) {
        gs.log('[REQUEST_ON_CLOSED] ❌', e, 'error');
      }
    });
    res.on('close', async () => {
      try {
        const clientOriginIpCc = aks.getOriginIpCc(req, true);
        const timeEnd = Date.now() - timeStart.getTime();
        const reqResInfo = `${clientOriginIpCc.origin_ip} ~ ${timeStart.toString()} ~ ${req.method} ~ ${res.statusCode} ~ ${req.originalUrl} ~ ${timeEnd} ms`;
        await sis.emitToRoomOrId(CONSTANTS.socketRoomNameServerLogs, 'console-log', reqResInfo);
        if (
          !cfg.domainIpBypass.includes(clientOriginIpCc.origin_ip) &&
          // 404 Not Found Will Redirect To Home Page
          (res.statusCode === 404 || res.statusCode === 429 || (res.statusCode >= 500 && res.statusCode < 600))
        ) {
          const failToBan = await ftb.find({
            where: [
              { ip_domain: Equal(clientOriginIpCc.origin_ip) }
            ],
            order: {
              ip_domain: 'ASC'
            }
          });
          if (failToBan.length === 0) {
            const _ftb = ftb.new();
            _ftb.ip_domain = clientOriginIpCc.origin_ip;
            await ftb.save(_ftb);
          } else if (failToBan.length === 1) {
            const _ftb = failToBan[0];
            _ftb.fail_count++;
            const resSaveFtb = await ftb.save(_ftb);
            if (resSaveFtb.fail_count >= CONSTANTS.failToBanMaxCountPerMin) {
              const resBan = await cfs.createFailToBan(resSaveFtb.ip_domain);
              if (resBan && resBan.status >= 200 && resBan.status < 400) {
                resSaveFtb.rule_id = resBan.result.id;
                await ftb.save(resSaveFtb);
              }
            }
          } else {
            throw new Error('Data Duplikat!');
          }
        }
      } catch (e) {
        gs.log('[RESPONSE_ON_CLOSED] ❌', e, 'error');
      }
    });
    next();
  });
  const swaggerCfg = new DocumentBuilder()
    .setTitle(environment.siteName)
    .setDescription(environment.siteDescription)
    .setContact(environment.siteName, environment.baseUrl, `noreply@${environment.domain}`)
    .addSecurity('apiKey', { type: 'apiKey', in: 'query', name: 'key' })
    .addSecurityRequirements('apiKey')
    .build();
  const swaggerOpt: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey
  };
  const swaggerDoc = SwaggerModule.createDocument(nestApp, swaggerCfg, swaggerOpt);
  SwaggerModule.setup('api', nestApp, swaggerDoc);
  return nestApp;
}

async function bootstrap(): Promise<void> {
  const port = process.env['PORT'] || 4200;
  const totCPUs = os.cpus().length;
  /* We Will Using 75 % Available CPUs Power */
  const numCPUs = Number(process.env['MAX_CPUS']) || Math.max(Math.round(totCPUs / 2), 2);
  if (numCPUs <= totCPUs && numCPUs > 1) {
    try {
      const expressApp = express();
      const httpServer = http.createServer(expressApp);
      if (cluster.isMaster) {
        const nestCtx = await ctx();
        const gs = nestCtx.get(GlobalService);
        nestCtx.get(ClusterMasterSlaveService).masterHandleMessages();
        await nestCtx.get(DiscordService).startBot();
        gs.log('[APP_MASTER_PID] 💻', process.pid);
        setupMaster(httpServer, {
          loadBalancingMethod: 'least-connection'
        });
        setupPrimary();
        cluster.setupMaster({
          serialization: 'advanced'
        });
        for (let i = 0; i < numCPUs - 1 /* i Slave(s) & 1 Master CPU */ ; i++) {
          const worker = cluster.fork();
          gs.log(`[WORKER_${i}] Spawned`, worker.id);
        }
        Mutex.init();
        cluster.on('exit', (worker, code, signal) => {
          let msg = `[WORKER_${worker.id}]`;
          if (signal) {
            gs.log(`${msg} Killed`, signal, 'error');
          } else {
            gs.log(`${msg} Exited`, code, 'error');
          }
          const wrkr = cluster.fork();
          gs.log(`${msg} Re-Spawned`, wrkr.id);
        });
      } else {
        const nestApp = await app(new ExpressAdapter(expressApp));
        const gs = nestApp.get(GlobalService);
        gs.log('[APP_SLAVE_PID] 👀', process.pid);
        nestApp.useWebSocketAdapter(new SocketIoClusterAdapter(nestApp));
        await nestApp.listen(port, async () => {
          gs.log(`[APP_SLAVE_SERVER] 💻 Running on => ${process.cwd()} 💘`, cluster.worker.id);
        });
      }
    } catch (e) {
      console.error('[APP_WORKER] 💢', e);
    }
  } else {
    Mutex.init();
    const nestApp = await app();
    const gs = nestApp.get(GlobalService);
    await nestApp.get(DiscordService).startBot();
    nestApp.useWebSocketAdapter(new SocketIoAdapter(nestApp));
    await nestApp.listen(port, async () => {
      gs.log(`[APP_MASTER_SERVER] 💻 Running on => ${process.cwd()} 💘`, process.pid);
    });
  }
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  bootstrap().catch(err => console.error('[APP_BOOTSTRAP] 💣', err));
}
