// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Database Entities
import { Profile } from '../../api/entities/Profile';
import { KartuTandaPenduduk } from '../../api/entities/KartuTandaPenduduk';
import { User } from '../../api/entities/User';
import { ProjectType } from '../../api/entities/ProjectType';
import { Fansub } from '../../api/entities/Fansub';
import { Anime } from '../../api/entities/Anime';
import { Dorama } from '../../api/entities/Dorama';
import { Berkas } from '../../api/entities/Berkas';
import { Attachment } from '../../api/entities/Attachment';
import { TempAttachment } from '../../api/entities/TempAttachment';
import { ApiKey } from '../../api/entities/ApiKey';
import { News } from '../../api/entities/News';
import { SocialMedia } from '../../api/entities/SocialMedia';
import { Edict } from '../../api/entities/Edict';
import { Kanji } from '../../api/entities/Kanji';
import { KanjiVg } from '../../api/entities/KanjiVg';
import { KanjiStats } from '../../api/entities/KanjiStats';
import { Tatoeba } from '../../api/entities/Tatoeba';
import { Banned } from '../../api/entities/Banned';
import { Notification } from '../../api/entities/Notification';
import { Lesson } from '../../api/entities/Lesson';
import { Track } from '../../api/entities/Track';
import { LikeDislike } from '../../api/entities/LikeDislike';
import { Hirakata } from '../../api/entities/Hirakata';
import { HirakataStats } from '../../api/entities/HirakataStats';
import { Nihongo } from '../../api/entities/Nihongo';
import { Komentar } from '../../api/entities/Komentar';
import { Registration } from '../../api/entities/Registration';

export const environment = {
  production: false,
  siteName: 'Hikki',
  author: 'Bifeldy',
  jwtSecretKey: '',
  tokenName: 'Hikki_Token',
  domain: 'localhost',
  ip: '127.0.0.1',
  baseUrl: 'http://localhost:4000',
  dbType: 'postgres',
  dbHost: 'localhost',
  dbPort: 5432,
  dbName: 'hikki',
  dbUsername: 'postgres',
  dbPassword: 'postgres',
  dbSync: true,
  dbLog: true,
  dbEntities: [
    User,
    KartuTandaPenduduk,
    Profile,
    ProjectType,
    Fansub,
    Anime,
    Dorama,
    Berkas,
    Attachment,
    TempAttachment,
    ApiKey,
    News,
    Lesson,
    SocialMedia,
    Edict,
    Kanji,
    KanjiVg,
    KanjiStats,
    Tatoeba,
    Banned,
    Notification,
    Track,
    LikeDislike,
    Hirakata,
    HirakataStats,
    Nihongo,
    Komentar,
    Registration
  ],
  uploadFolder: 'dist/hikki/uploads',
  googleAuthUrl: 'https://oauth2.googleapis.com/token',
  gdriveFolderId: '1VMuZLNaxFnDByLMJiu0EN1Adl8A9FlwZ',
  recaptchaApiUrl: 'https://www.google.com/recaptcha/api/siteverify',
  reCaptchaSecretKey: '',
  apiPemerintahKTPUrl: '',
  apiPemerintahKTPSecretKey: '',
  imgbbKey: '',
  gCloudPlatform: {
    clientId: '',
    clientSecret: '',
    gDrive: {
      refreshToken: ''
    },
    gMail: {
      host: 'smtp.gmail.com',
      port: 465,
      address: 'noreply@hikki.id',
      refreshToken: ''
    },
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
    'accept': 'application/json',
    'user-agent': 'node.js'
  },
  externalApiCacheTime: 30 * 60 * 1000,
  externalApiAnime: 'http://api.jikan.moe/v4',
  externalApiDorama: 'https://bifeldy-kuryana.vercel.app',
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
