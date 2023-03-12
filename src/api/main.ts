// 3rd Party Library
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AbortController } from 'abort-controller';

import { environment } from '../environments/api/environment';

import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { urlencoded, json, Request, Response, NextFunction } from 'express';

import { SocketIoAdapter } from './adapters/socket-io.adapter';

import { AppModule } from './app.module';

import { CONSTANTS } from '../constants';

import { ApiKeyService } from './repository/api-key.service';
import { GlobalService } from './services/global.service';
import { SocketIoService } from './services/socket-io.service';

let gs: GlobalService = null;
let aks: ApiKeyService = null;
let sis: SocketIoService = null;

function reqResEvent(req: Request, res: Response, next: NextFunction) {
  const timeStart = new Date();
  res.locals['abort-controller'] = new AbortController();
  req.on('close', () => {
    res.locals['abort-controller'].abort();
  });
  res.on('close', () => {
    const clientOriginIpCc = aks.getOriginIpCc(req, true);
    const timeEnd = new Date().getTime() - timeStart.getTime();
    const reqResInfo = `${clientOriginIpCc.origin_ip} ~ ${timeStart.toString()} ~ ${req.method} ~ ${res.statusCode} ~ ${req.originalUrl} ~ ${timeEnd} ms`;
    sis.emitToRoomOrId(CONSTANTS.socketRoomNameServerLogs, 'console-log', reqResInfo);
  });
  return next();
}

// The Nest app is exported so that it can be used by serverless Functions.
export async function app(): Promise<INestApplication> {
  const nestApp = await NestFactory.create(AppModule);
  gs = nestApp.select(AppModule).get(GlobalService);
  aks = nestApp.select(AppModule).get(ApiKeyService);
  sis = nestApp.select(AppModule).get(SocketIoService);
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
  nestApp.use(json({ limit: '512mb' }));
  nestApp.use(urlencoded({ extended: false, limit: '512mb' }));
  nestApp.enableCors(aks.getCorsOptions());
  nestApp.useWebSocketAdapter(new SocketIoAdapter(nestApp));
  nestApp.use(reqResEvent);
  const swaggerCfg = new DocumentBuilder()
    .setTitle(environment.siteName)
    .setDescription(environment.siteDescription)
    .setContact(environment.siteName, environment.baseUrl, `noreply@${environment.domain}`)
    .addApiKey({ type: 'apiKey', in: 'query', name: 'key' })
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
  app().then(
    nestApp => {
      nestApp.listen(process.env['PORT'] || 4200, async () => {
        gs.log(`[APP_SERVER] 💻 Running on => ${process.cwd()} 💘`, await nestApp.getUrl());
      });
    }
  ).catch(err => gs.log('[APP-BOOTSTRAP] 💢', err, 'error'));
}
