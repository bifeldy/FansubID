// 3rd Party Library
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { NestFactory } from '@nestjs/core';
import { urlencoded, json } from 'express';

import { SocketIoAdapter } from './adapters/socket-io.adapter';

import { AppModule } from './app.module';

import { ApiKeyService } from './repository/api-key.service';
import { ConfigService } from './services/config.service';
import { GlobalService } from './services/global.service';

let aks: ApiKeyService = null;
let cfg: ConfigService = null;
let gs: GlobalService = null;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.getHttpAdapter().getInstance().set('trust proxy', true);
  app.use(helmet({
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
    // xssFilter: true,
  }));
  aks = app.select(AppModule).get(ApiKeyService);
  cfg = app.select(AppModule).get(ConfigService);
  gs = app.select(AppModule).get(GlobalService);
  cfg.appInstance = app;
  cfg.gs = gs;
  app.enableCors(aks.getCorsOptions());
  app.use(compression());
  app.use(cookieParser());
  app.use(json({ limit: '512mb' }));
  app.use(urlencoded({ extended: false, limit: '512mb' }));
  const sio = new SocketIoAdapter(app);
  app.useWebSocketAdapter(sio);
  const port = process.env['PORT'] || 4200;
  await app.listen(port, async () => {
    gs.log(`[APP_SERVER] 💻 Running on => ${process.cwd()} 💘`, await app.getUrl());
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  bootstrap().catch(err => gs.log('[APP-BOOTSTRAP] 💢', err, 'error'));
}

