// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Anime } from '../../api/entities/Anime';
import { Attachment } from '../../api/entities/Attachment';
import { ApiKey } from '../../api/entities/ApiKey';
import { Banned } from '../../api/entities/Banned';
import { Berkas } from '../../api/entities/Berkas';
import { Dorama } from '../../api/entities/Dorama';
import { Edict } from '../../api/entities/Edict';
import { Fansub } from '../../api/entities/Fansub';
import { FansubMember } from '../../api/entities/FansubMember';
import { Hirakata } from '../../api/entities/Hirakata';
import { HirakataStats } from '../../api/entities/HirakataStats';
import { Information } from '../../api/entities/Information';
import { Kanji } from '../../api/entities/Kanji';
import { KanjiVg } from '../../api/entities/KanjiVg';
import { KanjiStats } from '../../api/entities/KanjiStats';
import { KartuTandaPenduduk } from '../../api/entities/KartuTandaPenduduk';
import { Komentar } from '../../api/entities/Komentar';
import { Lesson } from '../../api/entities/Lesson';
import { LikeDislike } from '../../api/entities/LikeDislike';
import { News } from '../../api/entities/News';
import { Nihongo } from '../../api/entities/Nihongo';
import { Notification } from '../../api/entities/Notification';
import { Profile } from '../../api/entities/Profile';
import { ProjectType } from '../../api/entities/ProjectType';
import { Registration } from '../../api/entities/Registration';
import { SocialMedia } from '../../api/entities/SocialMedia';
import { Tatoeba } from '../../api/entities/Tatoeba';
import { TempAttachment } from '../../api/entities/TempAttachment';
import { Track } from '../../api/entities/Track';
import { User } from '../../api/entities/User';

export const environment = {
  production: false,
  siteName: 'Hikki',
  siteDescription: 'Di Kamar Saja!',
  author: 'Bifeldy',
  jwtSecretKey: '',
  tokenName: 'Hikki_Token',
  domain: 'localhost',
  ip: '127.0.0.1',
  baseUrl: 'http://localhost:4200',
  typeorm: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'hikki',
    username: 'postgres',
    password: 'postgres',
    synchronize: true,
    logging: true,
    entities: [
      Anime,
      Attachment,
      ApiKey,
      Banned,
      Berkas,
      Dorama,
      Edict,
      Fansub,
      FansubMember,
      Hirakata,
      HirakataStats,
      Information,
      Kanji,
      KanjiVg,
      KanjiStats,
      KartuTandaPenduduk,
      Komentar,
      Lesson,
      LikeDislike,
      News,
      Nihongo,
      Notification,
      Profile,
      ProjectType,
      Registration,
      SocialMedia,
      Tatoeba,
      TempAttachment,
      Track,
      User
    ],
  },
  viewFolder: 'dist/hikki/browser',
  uploadFolder: 'dist/hikki/uploads',
  jsonCacheFolder: 'dist/hikki/caches',
  gdriveFolderId: '1VMuZLNaxFnDByLMJiu0EN1Adl8A9FlwZ',
  recaptchaApiUrl: 'https://www.google.com/recaptcha/api/siteverify',
  reCaptchaSecretKey: '',
  apiPemerintahKTPUrl: '',
  apiPemerintahKTPSecretKey: '',
  imgbbKey: '',
  gCloudPlatform: {
    clientId: '',
    clientSecret: '',
    clientEmail: '',
    gDrive: {
      refreshToken: '',
      scopes: ['https://www.googleapis.com/auth/drive']
    },
    serviceAccount: {
      type: 'service_account',
      project_id: 'hikki-bifeldy',
      private_key_id: '',
      private_key: '',
      client_email: '',
      client_id: '',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: ''
    }
  },
  mailGun: {
    clientOptions: {
      username: 'noreply',
      key: '',
      url: 'https://api.mailgun.net',
    },
    fullName: `Hikki | No-Reply`,
    domain: 'hikki.id',
    password: ''
  },
  discordApiUrl: 'https://discord.com/api',
  discordGuildId: '342220398022098944',
  discordClientId: '789831990433153034',
  discordClientSecret: '',
  laboratoryRatsRoleId: '479208130534703108',
  discordBotChannelEventId: '790158935045701652',
  discordBotChannelBotId: '426384107795251206',
  discordBotLoginToken: '',
  nodeJsXhrHeader: {
    Accept: 'application/json',
    Connection: 'keep-alive',
    'User-Agent': 'node.js'
  },
  externalApiCacheTime: 30 * 60 * 1,
  externalApiAnime: 'http://api.jikan.moe/v4',
  externalApiDorama: 'https://bifeldy-kuryana.vercel.app',
  externalApiImage: 'https://api.imgbb.com/1/upload',
  trackerAnnounce: [
    'wss://tracker.hikki.id'
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */

// import 'zone.js/plugins/zone-error';
// Included with Angular CLI.
