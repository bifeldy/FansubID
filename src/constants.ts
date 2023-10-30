export const CONSTANTS = {
  apiTagAnime: 'Anime',
  apiTagApiKey: 'API Key',
  apiTagAttachment: 'Attachment',
  apiTagBanned: 'Banned',
  apiTagBerkas: 'Berkas',
  apiTagDorama: 'Dorama',
  apiTagDdlFile: 'DDL File',
  apiTagFansub: 'Fansub',
  apiTagMail: 'Surat Elektronik',
  apiTagNews: 'News',
  apiTagNihongo: 'Nihongo',
  apiTagQuiz: 'Quiz',
  apiTagSession: 'Session',
  apiTagUser: 'User',
  attachmentSpeedLimiterBps: 256 * 1000, // 256 KB/s
  blacklistedWords: [
    '*', 'www', 'fansub', 'fansub.id', 'fansubid', 'fansub-id', 'crawl', 'crawler',
    'localhost', 'mail', 'email', 'e-mail', 'tracker', 'fansub', 'fansubber',
    'ferdion', 'bifeldy', 'dev', 'api', 'docs', 'cs', 'help', 'support', 'proxy',
    'admin', 'administrator', 'info', 'information', 'noreply', 'mod', 'moderator'
  ],
  cronFansubRssFeed: 'CRON_FANSUB_RSS_FEED',
  cronTrackerStatistics: 'CRON_TRACKER_STATISTICS',
  cronSitemap: 'CRON_SITEMAP',
  cronStatsServer: 'CRON_STATS_SERVER',
  cronUpload: 'CRON_UPLOAD',
  cronVpsBilling: 'CRON_VPS_BILLING',
  decoratorFilterApiKeyAccess: 'filter-api-key-access',
  decoratorRoles: 'roles',
  decoratorVerifiedOnly: 'verified-only',
  extAttachment: ['avi', 'flv', 'mkv', 'mp4', 'zip'],
  extFonts: ['ttf', 'otf', 'woff', 'woff2'],
  extSubs: ['ass', 'srt'],
  externalApiCacheTime: 15 * 60 * 1, // 15 Minutes [v4 seconds, v5 miliseconds]
  fileTypeAttachmentAllowed: [
    'video/flv',
    'video/x-flv',
    'video/x-msvideo',
    'video/x-matroska',
    'video/mp4',
    'application/zip',
    'application/zip-compressed',
    'application/x-zip',
    'application/x-zip-compressed'
  ],
  fileSizeAttachmentChunkCloudflareLimit: 64 * 1000 * 1000, // Cloudflare User Plan -- Free Is 100 MB ~ T.T
  fileSizeAttachmentChunkDiscordLimit: 8 * 1000 * 1000, // Discord -- Without Nitro Is 8 MB ~ T.T
  fileTypeAttachmentStreamable: [
    'mkv',
    'mp4'
  ],
  fileSizeAttachmentTotalLimit: 2 * 1000 * 1000 * 1000, // Max Upload Limits -- < 2 GB Streamable
  fileSizeImageLimit: 512 * 1000, // 512 KB
  freeTimeStart: '02:00:00',
  freeTimeEnd: '02:30:00',
  gCaptchaSiteKey: '6Ld4Bt4UAAAAAKJQ_jfqtWdsq9BuARLHag2DBvqK',
  jwtAlgorithm: 'HS512',
  jwtExpiredIn: 24 * 60 * 60, // 1 Day
  quizOptionsCountHirakata: 5,
  quizOptionsCountCategory: 6,
  quizOptionsCountKanji: 6,
  regexAllKeyboardKeys: /^[\P{Cc}\P{Cn}\P{Cs}]*$/,
  regexEmail: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
  regexEmailMulti: /^[^a-z0-9_]*([a-z0-9_+\-.%]+@[a-z0-9_\-.]+\.[a-z]+[^a-z0-9_]*,{1}[^a-z0-9_]*)*([a-z0-9_+\-.%]+@[a-z0-9_\-.]+\.[a-z]+)[^a-z0-9_]*$/,
  regexEnglishKeyboardKeys: /^[a-zA-Z0-9~`!@#\$%\^&\*\(\)_\-\+={\[\}\]\|\\:;"'<,>\.\?\/  \n]*$/,
  regexIllegalFileName: /[/\\?%*:|"<>]/g,
  regexIpAddress: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  regexJapaneseKeyboardKeys: /[一-龠ぁ-ゔァ-ヴーａ-ｚＡ-Ｚ０-９々〆〤、。]+/u,
  regexUrl: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
  retryDdlUploadMaxCount: 5,
  socketRoomNameGlobalPublic: 'GLOBAL_PUBLIK',
  socketRoomNameGlobalFansub: 'GLOBAL_FANSUB',
  socketRoomNameServerLogs: 'SERVER_LOGS',
  timeoutCancelRegisterKey: 'TIMEOUT_CANCEL_REGISTER',
  timeoutCancelRegisterTime: 5 * 60 * 1000, // 5 Minutes
  timeoutDeleteTempAttachmentKey: 'TIMEOUT_DELETE_TEMP_ATTACHMENT',
  timeoutDeleteTempAttachmentTime: 10 * 60 * 1000, // 10 Minutes
  timeoutMailWebhookTime: 1 * 60 * 1000, // 1 Minutes
  timeoutReconnectSocketKey: 'TIMEOUT_RECONNECT_SOCKET',
  timeoutReconnectSocketTime: 5 * 1000, // 5 Seconds
  timeJwtEncryption: 3 * 60, // 3 Minutes
  timeLoginRememberMe: 7 * 24 * 60 * 60, // 7 Days
  timeResetAccount: 5 * 60, // 5 Minutes
  timeMaxDaysNotification: 7 * 24 * 60 * 60 * 1000, // 7 Days
  verificationDomainCname: [
    'ghs.google.com'
  ],
  verificationDomainTxt: [
    '*.repl.co'
  ]
};
