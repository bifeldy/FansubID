import { SECRETS } from '../../secrets';

import { CONSTANTS } from '../../constants';

import { Anime } from '../../api/entities/Anime';
import { Attachment } from '../../api/entities/Attachment';
import { ApiKey } from '../../api/entities/ApiKey';
import { Banned } from '../../api/entities/Banned';
import { Berkas } from '../../api/entities/Berkas';
import { DdlFile } from '../../api/entities/DdlFile';
import { Dorama } from '../../api/entities/Dorama';
import { Edict } from '../../api/entities/Edict';
import { FailToBan } from '../../api/entities/FailToBan';
import { Fansub } from '../../api/entities/Fansub';
import { FansubMember } from '../../api/entities/FansubMember';
import { Hirakata } from '../../api/entities/Hirakata';
import { HirakataStats } from '../../api/entities/HirakataStats';
import { Information } from '../../api/entities/Information';
import { Kanji } from '../../api/entities/Kanji';
import { Kanjivg } from '../../api/entities/Kanjivg';
import { KanjiStats } from '../../api/entities/KanjiStats';
import { KartuTandaPenduduk } from '../../api/entities/KartuTandaPenduduk';
import { Komentar } from '../../api/entities/Komentar';
import { LikeDislike } from '../../api/entities/LikeDislike';
import { Mailbox } from '../../api/entities/Mailbox';
import { News } from '../../api/entities/News';
import { Nihongo } from '../../api/entities/Nihongo';
import { Notification } from '../../api/entities/Notification';
import { Profile } from '../../api/entities/Profile';
import { ProjectType } from '../../api/entities/ProjectType';
import { Registration } from '../../api/entities/Registration';
import { RssFeed } from '../../api/entities/RssFeed';
import { SocialMedia } from '../../api/entities/SocialMedia';
import { Tatoeba } from '../../api/entities/Tatoeba';
import { TempAttachment } from '../../api/entities/TempAttachment';
import { Ticket } from '../../api/entities/Ticket';
import { Track } from '../../api/entities/Track';
import { User } from '../../api/entities/User';
import { UserPremium } from '../../api/entities/UserPremium';

export const environment = {
  production: SECRETS().IS_PRODUCTION,                                                                            // false,
  siteName: 'FansubID',
  siteDescription: 'Di Kamar Saja!',
  author: 'Bifeldy',
  jwtSecretKey: SECRETS().JWT_SECRET_KEY,                                                                         // '',
  apiKeyName: 'FansubID_ApiKey',
  tokenName: 'FansubID_Token',
  domain: SECRETS().DOMAIN,                                                                                       // 'localhost',
  domain_alt: SECRETS().DOMAIN_ALT,                                                                               // 'localhost',
  ip: SECRETS().IP,                                                                                               // '127.0.0.1',
  baseUrl: SECRETS().BASE_URL,                                                                                    // 'http://localhost:4200',
  typeorm: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'fansubid',
    username: 'postgres',
    password: SECRETS().DB_PASSWORD,                                                                              // 'postgres',
    synchronize: true,
    keepConnectionAlive: true,
    logging: !SECRETS().IS_PRODUCTION,                                                                            // true,
    entities: [
      Anime,
      Attachment,
      ApiKey,
      Banned,
      Berkas,
      DdlFile,
      Dorama,
      Edict,
      FailToBan,
      Fansub,
      FansubMember,
      Hirakata,
      HirakataStats,
      Information,
      Kanji,
      Kanjivg,
      KanjiStats,
      KartuTandaPenduduk,
      Komentar,
      LikeDislike,
      Mailbox,
      News,
      Nihongo,
      Notification,
      Profile,
      ProjectType,
      Registration,
      RssFeed,
      SocialMedia,
      Tatoeba,
      TempAttachment,
      Ticket,
      Track,
      User,
      UserPremium
    ],
  },
  viewFolder: 'dist/main-site/browser',
  tempFolder: 'dist/main-site/temp',
  uploadFolder: 'dist/main-site/uploads',
  jsonCacheFolder: 'dist/main-site/caches',
  apiPemerintahKTPUrl: SECRETS().API_PEMERINTAH_KTP_URL,                                                          // '',
  apiPemerintahKTPSecretKey: SECRETS().API_PEMERINTAH_KTP_SECRET_KEY,                                             // '',
  imgbbKey: SECRETS().IMGBB_KEY,                                                                                  // '',
  reCaptcha: {
    api_url: 'https://www.google.com/recaptcha/api/siteverify',
    secret_key: SECRETS().RECAPTCHA_SECRET_KEY,                                                                   // '',
  },
  gCloudPlatform: {
    token_uri: 'https://oauth2.googleapis.com/token',
    app: {
      auth_uri: 'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount',
      client_id: '955612959719-q9i4dtl0qp5icvc341q0cef6ul7ujov0.apps.googleusercontent.com',
      client_secret: SECRETS().GCP_APP_CLIENT_SECRET,                                                             // '',
      profile_uri: 'https://www.googleapis.com/oauth2/v1/userinfo',
      scopes: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
      ]
    },
    gDrive: {
      client_id: SECRETS().GCP_PERSONAL_ACCOUNT_CLIENT_ID,                                                        // '',
      client_secret: SECRETS().GCP_PERSONAL_ACCOUNT_CLIENT_SECRET,                                                // '',
      client_email: SECRETS().GCP_PERSONAL_ACCOUNT_CLIENT_EMAIL,                                                  // '',
      folder_id: '1DEiBMKDMZzSzhnlRi92tuyL2dh56tZLa',
      refresh_token: SECRETS().GCP_PERSONAL_ACCOUNT_REFRESH_TOKEN,                                                // '',
      scopes: ['https://www.googleapis.com/auth/drive']
    },
    serviceAccount: {
      client_email: SECRETS().GCP_SERVICE_ACCOUNT_CLIENT_EMAIL,                                                   // '',
      private_key: SECRETS().GCP_SERVICE_ACCOUNT_PRIVATE_KEY                                                      // ''
    }
  },
  mailTrap: {
    clientOptions: {
      username: 'noreply',
      key: SECRETS().MAILTRAP_KEY,                                                                                 // '',
      url: 'https://send.api.mailtrap.io',
    },
    fullName: `FansubID | No-Reply`,
    domain: 'fansub.id',
  },
  cloudflare: {
    url: 'https://api.cloudflare.com/client/v4',
    key: SECRETS().CLOUDFLARE_KEY,                                                                                // '',
    zoneId: '804863012d6a7700333d781170c4dd95',
    domain: 'fansub.id',
    comment: 'DOMAIN_KLAIM'
  },
  discord: {
    api_uri: 'https://discord.com/api',
    client_id: '789831990433153034',
    guild_id: '342220398022098944',
    client_secret: SECRETS().DISCORD_CLIENT_SECRET,                                                               // '',
    channelEventId: '790158935045701652',
    channelBotId: '426384107795251206',
    laboratoryRatsRoleId: '479208130534703108',
    loginToken: SECRETS().DISCORD_BOT_LOGIN_TOKEN,                                                                // '',
    channelDdlId: '1087668627718803557',
  },
  nodeJsXhrHeader: {
    Accept: 'application/json',
    Connection: 'keep-alive',
    'User-Agent': 'node.js'
  },
  externalApiAnime: 'https://api.myanimelist.net/v2',
  externalApiDorama: 'https://kuryana.vercel.app',
  externalApiImage: 'https://api.imgbb.com/1/upload',
  externalApiInternetPositif: 'https://trustpositif.kominfo.go.id/rest_server/getrecordsname',
  torrent: {
    trackerAnnounce: CONSTANTS.torrentTracker
  },
  malClientId: SECRETS().MAL_CLIENT_ID,                                                                          // '',
  idCloudHost: {
    apiUrl: 'https://api.idcloudhost.com/v1',
    wsUrl: 'wss://api.idcloudhost.com/v1',
    apiKey: SECRETS().ID_CLOUD_HOST_API_KEY,                                                                     // '',
    mainSite: "01b00d5a-905d-4328-bc8d-bf748f1fc3dc"                                                             // '',
  }
};
