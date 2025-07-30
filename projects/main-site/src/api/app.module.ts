// 3rd Party Library
import { Chalk } from 'chalk';
import throttle from 'express-throttle-bandwidth';

// NodeJS Library
import { join } from 'node:path';

import { CacheModule, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { uploadx } from '@uploadx/core';
import { S3File, S3Storage } from '@uploadx/s3';

import { CONSTANTS } from '../constants';

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
import { BerkasTrustedController } from './controllers/berkas-/berkas-trusted.controller';
import { CommentController } from './controllers/comment.controller';
import { CrawlController } from './controllers/crawl.controller';
import { DdlGenerateController, DdlPartController, DdlSeekController } from './controllers/ddl-file.controller';
import { DoramaController } from './controllers/dorama.controller';
import { DoramaBerkasController } from './controllers/dorama-/dorama-berkas.controller';
import { DoramaFansubController } from './controllers/dorama-/dorama-fansub.controller';
import { DoramaSeasonalController } from './controllers/dorama-/dorama-seasonal.controller';
import { FanshareController } from './controllers/fanshare.controller';
import { FansubController } from './controllers/fansub.controller';
import { FansubAllController } from './controllers/fansub-/fansub-all.controller';
import { FansubAnimeController } from './controllers/fansub-/fansub-anime.controller';
import { FansubBerkasController } from './controllers/fansub-/fansub-berkas.controller';
import { FansubDnsController } from './controllers/fansub-/fansub-dns.controller';
import { FansubDoramaController } from './controllers/fansub-/fansub-dorama.controller';
import { FansubInternetPositifController } from './controllers/fansub-/fansub-internet-positif.controller';
import { FansubMemberController } from './controllers/fansub-/fansub-member.controller';
import { FansubRssFeedController } from './controllers/fansub-/fansub-rss-feed.controller';
import { FansubSlugController } from './controllers/fansub-/fansub-slug.controller';
import { ImageController } from './controllers/image.controller';
import { InformationController } from './controllers/information.controller';
import { LikedislikeController } from './controllers/likedislike.controller';
import { LoginController } from './controllers/login.controller';
import { LogoutController } from './controllers/logout.controller';
import { LostAccountFindController } from './controllers/lost-account-/lost-account-find.controller';
import { LostAccountResetController } from './controllers/lost-account-/lost-account-reset.controller';
import { MailController } from './controllers/mail.controller';
import { MailInboxController } from './controllers/mail-/mail-inbox.controller';
import { MailOutboxController } from './controllers/mail-/mail-outbox.controller';
import { MailWebhookController } from './controllers/mail-/mail-webhook.controller';
import { NewsController } from './controllers/news.controller';
import { NihongoController } from './controllers/nihongo.controller';
import { NihongoEdictController } from './controllers/nihongo-/nihongo-edict.controller';
import { NihongoHirakataController } from './controllers/nihongo-/nihongo-hirakata.controller';
import { NihongoHirakataAllController } from './controllers/nihongo-/nihongo-hirakata-/nihongo-hirakata-all.controller';
import { NihongoKanjiController } from './controllers/nihongo-/nihongo-kanji.controller';
import { NihongoKanjivgController } from './controllers/nihongo-/nihongo-kanjivg.controller';
import { NihongoTatoebaController } from './controllers/nihongo-/nihongo-tatoeba.controller';
import { NotificationController } from './controllers/notification.controller';
import { ProjectTypeController } from './controllers/project-type.controller';
import { PromoteController } from './controllers/promote.controller';
import { QuizLeaderboardController } from './controllers/quiz-/quiz-leaderboard.controller';
import { RegisterController } from './controllers/register.controller';
import { TaskCronJobController } from './controllers/task-cron-job.controller';
import { TicketController } from './controllers/ticket.controller';
import { UserController } from './controllers/user.controller';
import { VerifyController } from './controllers/verify.controller';
import { VerifySosmedController } from './controllers/verify-/verify-sosmed.controller';

import { UrlPathMiddleware } from './middlewares/url-path.middleware';
import { ApiKeyMiddleware } from './middlewares/api-key.middleware';
import { BannedMiddleware } from './middlewares/banned.middleware';
import { LoginMiddleware } from './middlewares/login.middleware';
import { RegisterMiddleware } from './middlewares/register.middleware';
import { LogoutMiddleware } from './middlewares/logout.middleware';
import { CacheMiddleware } from './middlewares/cache.middleware';

import { HttpExceptionFilter } from './filters/http-exception.filter';

import { RateLimitGuard } from './guards/rate-limit.guard';
import { FilterApiKeyAccessGuard } from './guards/filter-api-key-access.guard';
import { VerifiedOnlyGuard } from './guards/verified-only.guard';
import { RolesGuard } from './guards/roles.guard';

import { ExcludeFieldInterceptor } from './interceptors/exclude-field.interceptor';
import { ReqResInterceptor } from './interceptors/req-res.interceptor';

import { SocketIoGateway } from './gateways/socket-io.gateway';

import { AmazonWebService } from './services/amazon-web.service';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { CloudflareService } from './services/cloudflare.service';
import { ClusterMasterSlaveService } from './services/cluster-master-slave.service';
import { ConfigService } from './services/config.service';
import { CryptoService } from './services/crypto.service';
import { DiscordService } from './services/discord.service';
import { GlobalService } from './services/global.service';
import { GoogleCloudService } from './services/google-cloud.service';
import { IdCloudHostService } from './services/idcloudhost.service';
import { IpoChanService } from './services/ipo-chan.service';
import { MailService } from './services/mail.service';
import { MkvExtractService } from './services/mkv-extract.service';
import { QuizService } from './services/quiz.service';
import { SocketIoService } from './services/socket-io.service';
import { TaskCronJobService } from './services/task-cron-job.service';

import { CfWafService } from './scheduler/cf-waf-task.service';
import { RssFeedTasksService } from './scheduler/rss-feed-tasks.service';
import { SitemapService } from './scheduler/sitemap-tasks.service';
import { TrackerStatisticsService } from './scheduler/tracker-statistics-tasks.service';
import { UploadService } from './scheduler/upload-task.service';
import { VpsBillingService } from './scheduler/vps-billing-task.service';

import { AnimeService } from './repository/anime.service';
import { ApiKeyService } from './repository/api-key.service';
import { AttachmentService } from './repository/attachment.service';
import { AttachmentFanshareService } from './repository/attachment-fanshare.service';
import { BannedService } from './repository/banned.service';
import { BerkasService } from './repository/berkas.service';
import { DdlFileService } from './repository/ddl-file.service';
import { DoramaService } from './repository/dorama.service';
import { EdictService } from './repository/edict.service';
import { FailToBanService } from './repository/fail-to-ban.service';
import { FansubService } from './repository/fansub.service';
import { FansubMemberService } from './repository/fansub-member.service';
import { HirakataService } from './repository/hirakata.service';
import { InformationService } from './repository/information.service';
import { KanjiService } from './repository/kanji.service';
import { KanjivgService } from './repository/kanjivg.service';
import { KartuTandaPendudukService } from './repository/kartu-tanda-penduduk.service';
import { KomentarService } from './repository/komentar.service';
import { LikedislikeService } from './repository/likedislike.service';
import { MailboxService } from './repository/mailbox.service';
import { NewsService } from './repository/news.service';
import { NihongoService } from './repository/nihongo.service';
import { NotificationService } from './repository/notification.service';
import { ProfileService } from './repository/profile.service';
import { ProjectTypeService } from './repository/project-type.service';
import { RssFeedService } from './repository/rss-feed.service';
import { RegistrationService } from './repository/registration.service';
import { SocialMediaService } from './repository/social-media.service';
import { TatoebaService } from './repository/tatoeba.service';
import { TempAttachmentService } from './repository/temp-attachment.service';
import { TicketService } from './repository/ticket.service';
import { TrackService } from './repository/track.service';
import { UserService } from './repository/user.service';
import { UserPremiumService } from './repository/user-premium.service';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), environment.viewFolder)
    }),
    TypeOrmModule.forRoot(environment.typeorm as TypeOrmModuleOptions),
    TypeOrmModule.forFeature(environment.typeorm.entities),
    ThrottlerModule.forRoot({ ttl: 60, limit: 15 }),
    MorganModule,
    CacheModule.register(),
    ScheduleModule.forRoot()
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
    BerkasTrustedController,
    CommentController,
    CrawlController,
    DdlGenerateController,
    DdlPartController,
    DdlSeekController,
    DoramaController,
    DoramaBerkasController,
    DoramaFansubController,
    DoramaSeasonalController,
    FanshareController,
    FansubController,
    FansubAllController,
    FansubAnimeController,
    FansubBerkasController,
    FansubDnsController,
    FansubDoramaController,
    FansubInternetPositifController,
    FansubMemberController,
    FansubRssFeedController,
    FansubSlugController,
    ImageController,
    InformationController,
    LikedislikeController,
    LoginController,
    LogoutController,
    LostAccountFindController,
    LostAccountResetController,
    MailController,
    MailInboxController,
    MailOutboxController,
    MailWebhookController,
    NewsController,
    NihongoController,
    NihongoEdictController,
    NihongoHirakataController,
    NihongoHirakataAllController,
    NihongoKanjiController,
    NihongoKanjivgController,
    NihongoTatoebaController,
    NotificationController,
    ProjectTypeController,
    PromoteController,
    QuizLeaderboardController,
    RegisterController,
    TaskCronJobController,
    TicketController,
    UserController,
    VerifyController,
    VerifySosmedController
  ],
  providers: [
    // Global Lifecycle :: Filter => Middleware => Guards => Interceptors => Controller
    // https://docs.nestjs.com/faq/request-lifecycle
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_GUARD, useClass: RateLimitGuard },
    { provide: APP_GUARD, useClass: FilterApiKeyAccessGuard },
    { provide: APP_GUARD, useClass: VerifiedOnlyGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_INTERCEPTOR, useClass: ExcludeFieldInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ReqResInterceptor },
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor((tokens, req, res) => {
        const chlk = new Chalk({ level: 3 });
        return [
          chlk.yellow(tokens['remote-addr'](req, res)),
          chlk.cyan(new Date(tokens['date'](req, res)).toString()),
          chlk.greenBright(tokens['method'](req, res)),
          chlk.redBright(tokens['status'](req, res)),
          chlk.white(tokens['url'](req, res)),
          chlk.yellowBright(tokens['response-time'](req, res) + ' ms'),
        ].join(' ~ ');
      })
    },
    // Gateway - Socket.IO
    SocketIoGateway,
    // Services - Service(s) Aren't Available Globally Like Angular
    // https://docs.nestjs.com/modules#global-modules
    AmazonWebService,
    ApiService,
    AuthService,
    CloudflareService,
    ClusterMasterSlaveService,
    ConfigService,
    CryptoService,
    DiscordService,
    GlobalService,
    GoogleCloudService,
    IdCloudHostService,
    IpoChanService,
    MkvExtractService,
    MailService,
    QuizService,
    SocketIoService,
    TaskCronJobService,
    // Service Task Schedulers
    CfWafService,
    RssFeedTasksService,
    SitemapService,
    TrackerStatisticsService,
    UploadService,
    VpsBillingService,
    // Repository Entities
    AnimeService,
    ApiKeyService,
    AttachmentService,
    AttachmentFanshareService,
    BannedService,
    BerkasService,
    DdlFileService,
    DoramaService,
    EdictService,
    FailToBanService,
    FansubService,
    FansubMemberService,
    HirakataService,
    InformationService,
    KanjiService,
    KanjivgService,
    KartuTandaPendudukService,
    KomentarService,
    LikedislikeService,
    MailboxService,
    NewsService,
    NihongoService,
    NotificationService,
    ProfileService,
    ProjectTypeService,
    RssFeedService,
    RegistrationService,
    SocialMediaService,
    TatoebaService,
    TempAttachmentService,
    TicketService,
    TrackService,
    UserService,
    UserPremiumService
  ]
})
export class AppModule {

  // Exclude route referring exact route path
  // https://stackoverflow.com/questions/61152975/nestjs-middleware-for-all-routes-except-auth
  configure(mc: MiddlewareConsumer) {

    mc.apply(UrlPathMiddleware).forRoutes(
      { path: '*', method: RequestMethod.ALL }
    );

    mc.apply(ApiKeyMiddleware).exclude(
      { path: '/api/discord-verifikasi', method: RequestMethod.GET },
      { path: '/api/google-verifikasi', method: RequestMethod.GET },
      { path: '/api/line-verifikasi', method: RequestMethod.GET },
      { path: '/api/aktivasi', method: RequestMethod.GET },
      { path: '/api/verify-sosmed', method: RequestMethod.GET },
      { path: '/api/fanshare/u0', method: RequestMethod.ALL }
    ).forRoutes(
      { path: '*', method: RequestMethod.ALL }
    );

    mc.apply(BannedMiddleware).exclude(
      { path: '/api/aktivasi', method: RequestMethod.GET },
      { path: '/api/verify-sosmed', method: RequestMethod.GET },
      { path: '/api/login', method: RequestMethod.POST },
      { path: '/api/register', method: RequestMethod.POST },
      { path: '/api/lost-account-*', method: RequestMethod.POST },
      { path: '/api/fanshare/u0', method: RequestMethod.ALL }
    ).forRoutes(
      { path: '*', method: RequestMethod.ALL }
    );

    mc.apply(LoginMiddleware).forRoutes(
      { path: '/login', method: RequestMethod.POST }
    );

    mc.apply(RegisterMiddleware).forRoutes(
      { path: '/register', method: RequestMethod.POST }
    );

    mc.apply(LogoutMiddleware).forRoutes(
      { path: '/logout', method: RequestMethod.DELETE }
    );

    mc.apply(CacheMiddleware).forRoutes(
      { path: '*', method: RequestMethod.GET }
    );

    mc.apply(throttle(CONSTANTS.attachmentSpeedLimiterBps)).forRoutes(
      { path: '/attachment', method: RequestMethod.GET },
      { path: '/ddl-part', method: RequestMethod.GET },
      { path: '/ddl-seek', method: RequestMethod.GET }
    );

    mc.apply(
      uploadx.upload({
        path: '/attachment',
        allowMIME: CONSTANTS.fileTypeAttachmentAllowed,
        directory: environment.uploadFolder,
        maxUploadSize: CONSTANTS.fileSizeAttachmentTotalLimit,
        useRelativeLocation: true,
        expiration: {
          maxAge: '3d',
          purgeInterval: '20min',
          rolling: true
        },
        metaStorageConfig: {
          directory: environment.tempFolder
        },
        logLevel: environment.production ? 'error' : 'debug'
      })
    ).forRoutes(
      { path: '/attachment', method: RequestMethod.POST },
      { path: '/attachment', method: RequestMethod.PUT }
    );

    mc.apply(
      uploadx.upload({
        storage: new S3Storage({
          path: '/fanshare',
          region: 'auto',
          // allowMIME: CONSTANTS.fileTypeAttachmentAllowed,
          bucket: environment.cloudflare.r2.bucket,
          endpoint: `https://${environment.cloudflare.r2.endpoint}`,
          credentials: {
            accessKeyId: environment.cloudflare.r2.accessKeyId,
            secretAccessKey: environment.cloudflare.r2.secretAccessKey
          },
          requestChecksumCalculation: 'WHEN_REQUIRED',
          responseChecksumValidation: 'WHEN_REQUIRED',
          filename: (file: S3File, req) => {
            console.log('filename',);
            console.log( file);
            const fileName = file.originalName
              .replace(CONSTANTS.regexIllegalFileName, '-')
              .replace(/\s/g, '_')
              .replace(/^[-.~]+|[-.~]+$/g, '')
              .substring(0, 255);
            return `u0/${new Date().getTime()}_${fileName}`;
          },
          forcePathStyle: false,
          // clientDirectUpload: true,
          partSize: CONSTANTS.fileSizeAttachmentChunkLimit,
          maxUploadSize: CONSTANTS.fileSizeAttachmentAutoDdl,
          expiration: {
            maxAge: '3d',
            purgeInterval: '20min',
            rolling: true
          },
          metaStorageConfig: {
            directory: 'dist/alt-site/temp'
          },
          logLevel: environment.production ? 'error' : 'debug'
        })
      })
    ).forRoutes(
      { path: '/fanshare', method: RequestMethod.POST },
      { path: '/fanshare', method: RequestMethod.PUT }
    );

  }

}
