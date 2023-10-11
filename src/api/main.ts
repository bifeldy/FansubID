// 3rd Party Library
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AbortController } from 'abort-controller';

// NodeJS Library
import cluster from 'node:cluster';
import os from 'node:os';
import process from 'node:process';

import { environment } from '../environments/api/environment';

import { INestApplication, INestApplicationContext } from '@nestjs/common';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { urlencoded, json, Request, Response, NextFunction } from 'express';

import { SocketIoAdapter } from './adapters/socket-io.adapter';

import { AppModule } from './app.module';

import { CONSTANTS } from '../constants';

import { ApiKeyService } from './repository/api-key.service';
import { GlobalService } from './services/global.service';
import { SocketIoService } from './services/socket-io.service';
import { ClusterMasterSlaveService } from './services/cluster-master-slave.service';

export async function ctx(): Promise<INestApplicationContext> {
  return await NestFactory.createApplicationContext(AppModule);
}

// The Nest app is exported so that it can be used by serverless Functions.
export async function app(): Promise<INestApplication> {
  const nestApp = await NestFactory.create(AppModule);
  const aks = nestApp.get(ApiKeyService);
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
  nestApp.useWebSocketAdapter(new SocketIoAdapter(nestApp));
  nestApp.use((req: Request, res: Response, next: NextFunction) => {
    const timeStart = new Date();
    res.locals['abort-controller'] = new AbortController();
    req.on('close', () => {
      res.locals['abort-controller'].abort();
    });
    res.on('close', () => {
      const clientOriginIpCc = aks.getOriginIpCc(req, true);
      const timeEnd = Date.now() - timeStart.getTime();
      const reqResInfo = `${clientOriginIpCc.origin_ip} ~ ${timeStart.toString()} ~ ${req.method} ~ ${res.statusCode} ~ ${req.originalUrl} ~ ${timeEnd} ms`;
      sis.emitToRoomOrId(CONSTANTS.socketRoomNameServerLogs, 'console-log', reqResInfo);
    });
    return next();
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

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  ctx().then(
    async (nestCtx) => {
      try {
        const nestApp = await app();
        const workers = [];
        if (cluster.isMaster) {
          nestCtx.get(ClusterMasterSlaveService).masterMessages();
          const gs = nestCtx.get(GlobalService);
          const numCPUs = Math.min(os.cpus().length, Number.parseInt(process.env['CPUS']) || 1);
          gs.log(`[APP_MASTER_PID] 💻`, process.pid);
          for (let i = 0; i < numCPUs; i++) {
            const worker = cluster.fork({ FSID: `${i}` });
            workers.push(worker);
            gs.log(`[WORKER_${i}] Spawned`, worker.id);
          }
          cluster.on('exit', (worker, code, signal) => {
            let msg = `[WORKER_${worker.id}]`;
            if (signal) {
              gs.log(`${msg} Killed`, signal);
            } else {
              gs.log(`${msg} Exited`, code);
            }
          });
        } else {
          const gs = nestApp.get(GlobalService);
          nestApp.listen(process.env['PORT'] || 4200, async () => {
            gs.log(`[APP_SLAVE_PID] 💘`, process.pid);
          });
        }
      } catch (err) {
        console.error('[APP_WORKER] 💢', cluster.worker.id);
      }
    }
  ).catch(err => console.error('[APP_CONTEXT] 💢', err));
}
