// NodeJS Library
import { join } from 'node:path';

// 3rd Party Library
import { Chalk } from 'chalk';

import { CacheModule, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { ThrottlerModule } from '@nestjs/throttler';

import { environment } from '../environments/api/environment';

import { AppServerModule } from '../main.server';

import { AppController } from './app.controller';

import { AktivasiController } from './controllers/aktivasi.controller';
import { AnimeController } from './controllers/anime.controller';
import { AnimeBerkasController } from './controllers/anime-/anime-berkas.controller';
import { AnimeFansubController } from './controllers/anime-/anime-fansub.controller';
import { AnimeSeasonalController } from './controllers/anime-/anime-seasonal.controller';
import { ApiKeyController } from './controllers/api-key.controller';
import { AttachmentController } from './controllers/attachment.controller';
import { BannedController } from './controllers/banned.controller';
import { BerkasController } from './controllers/berkas.controller';
import { CommentController } from './controllers/comment.controller';
import { DoramaController } from './controllers/dorama.controller';
import { DoramaBerkasController } from './controllers/dorama-/dorama-berkas.controller';
import { DoramaFansubController } from './controllers/dorama-/dorama-fansub.controller';
import { DoramaSeasonalController } from './controllers/dorama-/dorama-seasonal.controller';
import { FansubController } from './controllers/fansub.controller';
import { FansubAllController } from './controllers/fansub-/fansub-all.controller';
import { FansubAnimeController } from './controllers/fansub-/fansub-anime.controller';
import { FansubBerkasController } from './controllers/fansub-/fansub-berkas.controller';
import { FansubDoramaController } from './controllers/fansub-/fansub-dorama.controller';
import { FansubSlugController } from './controllers/fansub-/fansub-slug.controller';
import { ImageController } from './controllers/image.controller';
import { LikedislikeController } from './controllers/likedislike.controller';
import { LoginController } from './controllers/login.controller';
import { LogoutController } from './controllers/logout.controller';
import { NewsController } from './controllers/news.controller';
import { NihongoController } from './controllers/nihongo.controller';
import { NihongoEdictController } from './controllers/nihongo-/nihongo-edict.controller';
import { NihongoHirakataController } from './controllers/nihongo-/nihongo-hirakata.controller';
import { NihongoHirakataAllController } from './controllers/nihongo-/nihongo-hirakata-/nihongo-hirakata-all.controller';
import { NihongoKanjiController } from './controllers/nihongo-/nihongo-kanji.controller';
import { NihongoKanjivgController } from './controllers/nihongo-/nihongo-kanjivg.controller';
import { NihongoLessonController } from './controllers/nihongo-/nihongo-lesson.controller';
import { NihongoTatoebaController } from './controllers/nihongo-/nihongo-tatoeba.controller';
import { NotificationController } from './controllers/notification.controller';
import { ProjectTypeController } from './controllers/project-type.controller';
import { PromoteController } from './controllers/promote.controller';
import { RegisterController } from './controllers/register.controller';
import { TorrentController } from './controllers/torrent.controller';
import { UserController } from './controllers/user.controller';
import { VerifyController } from './controllers/verify.controller';
import { VerifyKtpController } from './controllers/verify-/verify-ktp.controller';
import { VerifyNikController } from './controllers/verify-/verify-nik.controller';
import { VerifySosmedController } from './controllers/verify-/verify-sosmed.controller';

import { ApiKeyMiddleware } from './middlewares/api-key.middleware';
import { BannedMiddleware } from './middlewares/banned.middleware';
import { LoginMiddleware } from './middlewares/login.middleware';
import { RegisterMiddleware } from './middlewares/register.middleware';
import { LogoutMiddleware } from './middlewares/logout.middleware';

import { RateLimitGuard } from './guards/rate-limit.guard';
import { RolesGuard } from './guards/roles.guard';
import { VerifiedGuard } from './guards/verified.guard';

import { ReqResInterceptor } from './interceptors/req-res.interceptor';

import { HttpExceptionFilter } from './filters/http-exception.filter';

import { SocketIoGateway } from './gateways/socket-io.gateway';

import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { ConfigService } from './services/config.service';
import { CryptoService } from './services/crypto.service';
import { DiscordService } from './services/discord.service';
import { GdriveService } from './services/gdrive.service';
import { GlobalService } from './services/global.service';
import { MailService } from './services/mail.service';
import { MkvExtractService } from './services/mkv-extract.service';
import { QuizService } from './services/quiz.service';
import { SocketIoService } from './services/socket-io.service';

import { AnimeService } from './repository/anime.service';
import { ApiKeyService } from './repository/api-key.service';
import { AttachmentService } from './repository/attachment.service';
import { BannedService } from './repository/banned.service';
import { BerkasService } from './repository/berkas.service';
import { DoramaService } from './repository/dorama.service';
import { EdictService } from './repository/edict.service';
import { FansubService } from './repository/fansub.service';
import { HirakataService } from './repository/hirakata.service';
import { KanjiService } from './repository/kanji.service';
import { KanjivgService } from './repository/kanjivg.service';
import { KartuTandaPendudukService } from './repository/kartu-tanda-penduduk.service';
import { KomentarService } from './repository/komentar.service';
import { LessonService } from './repository/lesson.service';
import { LikedislikeService } from './repository/likedislike.service';
import { NewsService } from './repository/news.service';
import { NihongoService } from './repository/nihongo.service';
import { NotificationService } from './repository/notification.service';
import { ProfileService } from './repository/profile.service';
import { ProjectTypeService } from './repository/project-type.service';
import { RegistrationService } from './repository/registration.service';
import { SocialMediaService } from './repository/social-media.service';
import { TatoebaService } from './repository/tatoeba.service';
import { TempAttachmentService } from './repository/temp-attachment.service';
import { TrackService } from './repository/track.service';
import { UserService } from './repository/user.service';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/hikki/browser')
    }),
    TypeOrmModule.forRoot(environment.typeorm as TypeOrmModuleOptions),
    TypeOrmModule.forFeature(environment.typeorm.entities),
    ThrottlerModule.forRoot({ ttl: 60, limit: 15 }),
    MorganModule,
    CacheModule.register()
  ],
  controllers: [
    AppController,
    //
    AktivasiController,
    AnimeController,
    AnimeBerkasController,
    AnimeFansubController,
    AnimeSeasonalController,
    ApiKeyController,
    AttachmentController,
    BannedController,
    BerkasController,
    CommentController,
    DoramaController,
    DoramaBerkasController,
    DoramaFansubController,
    DoramaSeasonalController,
    FansubController,
    FansubAllController,
    FansubAnimeController,
    FansubBerkasController,
    FansubDoramaController,
    FansubSlugController,
    ImageController,
    LikedislikeController,
    LoginController,
    LogoutController,
    NewsController,
    NihongoController,
    NihongoEdictController,
    NihongoHirakataController,
    NihongoHirakataAllController,
    NihongoKanjiController,
    NihongoKanjivgController,
    NihongoLessonController,
    NihongoTatoebaController,
    NotificationController,
    ProjectTypeController,
    PromoteController,
    RegisterController,
    TorrentController,
    UserController,
    VerifyController,
    VerifyKtpController,
    VerifyNikController,
    VerifySosmedController
  ],
  providers: [
    // Global Lifecycle - Middleware => Guards => Interceptors => Controller
    // https://docs.nestjs.com/faq/request-lifecycle
    { provide: APP_GUARD, useClass: RateLimitGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_GUARD, useClass: VerifiedGuard },
    { provide: APP_INTERCEPTOR, useClass: ReqResInterceptor },
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor((tokens, req, res) => {
        const chlk = new Chalk({ level: 3 });
        return [
          chlk.yellow(tokens['remote-addr'](req, res)),
          chlk.cyan(tokens['date'](req, res)),
          chlk.greenBright(tokens['method'](req, res)),
          chlk.redBright(tokens['status'](req, res)),
          chlk.white(tokens['url'](req, res)),
          chlk.yellowBright(tokens['response-time'](req, res) + ' ms'),
        ].join(' ~ ');
      })
    },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    // Gateway - Socket.IO
    SocketIoGateway,
    // Services - Service(s) Aren't Available Globally Like Angular
    // https://docs.nestjs.com/modules#global-modules
    ApiService,
    AuthService,
    ConfigService,
    CryptoService,
    DiscordService,
    GdriveService,
    GlobalService,
    MkvExtractService,
    MailService,
    QuizService,
    SocketIoService,
    // Services Entities
    AnimeService,
    ApiKeyService,
    AttachmentService,
    BannedService,
    BerkasService,
    DoramaService,
    EdictService,
    FansubService,
    HirakataService,
    KanjiService,
    KanjivgService,
    KartuTandaPendudukService,
    KomentarService,
    LessonService,
    LikedislikeService,
    NewsService,
    NihongoService,
    NotificationService,
    ProfileService,
    ProjectTypeService,
    RegistrationService,
    SocialMediaService,
    TatoebaService,
    TempAttachmentService,
    TrackService,
    UserService
  ]
})
export class AppModule {

  configure(mc: MiddlewareConsumer) {
    mc.apply(ApiKeyMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
    mc.apply(BannedMiddleware).exclude(
      { path:'/login', method: RequestMethod.POST },
      { path:'/register', method: RequestMethod.POST }
    ).forRoutes({ path: '*', method: RequestMethod.ALL });
    mc.apply(LoginMiddleware).forRoutes({ path:'/login', method: RequestMethod.POST });
    mc.apply(RegisterMiddleware).forRoutes({ path:'/register', method: RequestMethod.POST });
    mc.apply(LogoutMiddleware).forRoutes({ path:'/logout', method: RequestMethod.DELETE });
  }

}