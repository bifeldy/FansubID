// 3rd Party Library
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { urlencoded, json } from 'express';

import { SocketIoAdapter } from './adapters/socket-io.adapter';

import { AppModule } from './app.module';

import { ApiKeyService } from './repository/api-key.service';
import { GlobalService } from './services/global.service';

let gs: GlobalService = null;

// The Nest app is exported so that it can be used by serverless Functions.
export async function app(): Promise<INestApplication> {
  const nestApp = await NestFactory.create(AppModule);
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
    // noSniff: true,
    // originAgentCluster: true,
    // permittedCrossDomainPolicies: true,
    // referrerPolicy: true,
    // xssFilter: true
  }));
  nestApp.use(compression());
  nestApp.use(cookieParser());
  nestApp.use(json({ limit: '512mb' }));
  nestApp.use(urlencoded({ extended: false, limit: '512mb' }));
  nestApp.enableCors(nestApp.select(AppModule).get(ApiKeyService).getCorsOptions());
  nestApp.useWebSocketAdapter(new SocketIoAdapter(nestApp));
  gs = nestApp.select(AppModule).get(GlobalService);
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
