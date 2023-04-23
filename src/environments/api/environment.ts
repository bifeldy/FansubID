import { SECRETS } from '../../secrets';

import { Anime } from '../../api/entities/Anime';
import { Attachment } from '../../api/entities/Attachment';
import { ApiKey } from '../../api/entities/ApiKey';
import { Banned } from '../../api/entities/Banned';
import { Berkas } from '../../api/entities/Berkas';
import { DdlFile } from '../../api/entities/DdlFile';
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
import { LikeDislike } from '../../api/entities/LikeDislike';
import { Mailbox } from '../../api/entities/Mailbox';
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
  production: SECRETS().IS_PRODUCTION,                                            // false,
  siteName: 'FansubID',
  siteDescription: 'Di Kamar Saja!',
  author: 'Bifeldy',
  jwtSecretKey: SECRETS().JWT_SECRET_KEY,                                         // ''
  apiKeyName: 'FansubID_ApiKey',
  tokenName: 'FansubID_Token',
  domain: SECRETS().DOMAIN,                                                       // 'localhost',
  domain_alt: SECRETS().DOMAIN_ALT,                                               // 'localhost',
  ip: SECRETS().IP,                                                               // '127.0.0.1',
  baseUrl: SECRETS().BASE_URL,                                                    // 'http://localhost:4200',
  typeorm: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'fansubid',
    username: 'postgres',
    password: SECRETS().DB_PASSWORD,                                              // 'postgres',
    synchronize: true,
    logging: !SECRETS().IS_PRODUCTION,                                            // true,
    entities: [
      Anime,
      Attachment,
      ApiKey,
      Banned,
      Berkas,
      DdlFile,
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
      LikeDislike,
      Mailbox,
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
  viewFolder: 'dist/fansubid/browser',
  tempFolder: 'dist/fansubid/temp',
  uploadFolder: 'dist/fansubid/uploads',
  jsonCacheFolder: 'dist/fansubid/caches',
  gdriveFolderId: '1DEiBMKDMZzSzhnlRi92tuyL2dh56tZLa',
  recaptchaApiUrl: 'https://www.google.com/recaptcha/api/siteverify',
  reCaptchaSecretKey: SECRETS().RECAPTCHA_SECRET_KEY,                             // '',
  apiPemerintahKTPUrl: SECRETS().API_PEMERINTAH_KTP_URL,                          // '',
  apiPemerintahKTPSecretKey: SECRETS().API_PEMERINTAH_KTP_SECRET_KEY,             // '',
  imgbbKey: SECRETS().IMGBB_KEY,                                                  // '',
  gCloudPlatform: {
    clientId: SECRETS().GCP_PERSONAL_ACCOUNT_CLIENT_ID,                           // '',
    clientSecret: SECRETS().GCP_PERSONAL_ACCOUNT_CLIENT_SECRET,                   // '',
    clientEmail: SECRETS().GCP_PERSONAL_ACCOUNT_CLIENT_EMAIL,                     // '',
    gDrive: {
      refreshToken: SECRETS().GCP_PERSONAL_ACCOUNT_REFRESH_TOKEN,                 // '',
      scopes: ['https://www.googleapis.com/auth/drive']
    },
    serviceAccount: {
      type: 'service_account',
      project_id: 'hikki-bifeldy',
      private_key_id: SECRETS().GCP_SERVICE_ACCOUNT_PRIVATE_KEY_ID,               // '',
      private_key: SECRETS().GCP_SERVICE_ACCOUNT_PRIVATE_KEY,                     // '',
      client_email: SECRETS().GCP_SERVICE_ACCOUNT_CLIENT_EMAIL,                   // '',
      client_id: SECRETS().GCP_SERVICE_ACCOUNT_CLIENT_ID,                         // '',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: SECRETS().GCP_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL    // ''
    }
  },
  mailTrap: {
    clientOptions: {
      username: 'noreply',
      key: SECRETS().MAILTRAP_KEY,                                                 // '',
      url: 'https://send.api.mailtrap.io',
    },
    fullName: `FansubID | No-Reply`,
    domain: 'fansub.id'
  },
  cloudflare: {
    url: 'https://api.cloudflare.com/client/v4',
    key: SECRETS().CLOUDFLARE_KEY,                                                // '',
    zoneId: '804863012d6a7700333d781170c4dd95',
    domain: 'fansub.id',
    comment: 'DOMAIN_KLAIM'
  },
  discordApiUrl: 'https://discord.com/api',
  discordGuildId: '342220398022098944',
  discordClientId: '789831990433153034',
  discordClientSecret: SECRETS().DISCORD_CLIENT_SECRET,                           // '',
  laboratoryRatsRoleId: '479208130534703108',
  discordBotChannelEventId: '790158935045701652',
  discordBotChannelBotId: '426384107795251206',
  discordBotChannelDdlId: '1087668627718803557',
  discordBotLoginToken: SECRETS().DISCORD_BOT_LOGIN_TOKEN,                        // '',
  nodeJsXhrHeader: {
    Accept: 'application/json',
    Connection: 'keep-alive',
    'User-Agent': 'node.js'
  },
  externalApiCacheTime: 30 * 60 * 1,
  externalApiAnime: 'https://api.myanimelist.net/v2',
  externalApiDorama: 'https://kuryana.vercel.app',
  externalApiImage: 'https://api.imgbb.com/1/upload',
  trackerAnnounce: [
    'wss://tracker.fansub.id'
  ],
  malClientId: SECRETS().MAL_CLIENT_ID,                                          // '',
};
