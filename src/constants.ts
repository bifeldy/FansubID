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
    '*', 'www', 'fansub', 'fansub.id', 'fansubid', 'fansub-id',
    'localhost', 'mail', 'email', 'e-mail', 'tracker', 'fansub', 'fansubber',
    'ferdion', 'bifeldy', 'dev', 'api', 'docs', 'cs', 'help', 'support',
    'admin', 'administrator', 'info', 'information', 'noreply', 'mod', 'moderator'
  ],
  cronFansubRssFeed: 'CRON_FANSUB_RSS_FEED',
  cronTrackerStatistics: 'CRON_TRACKER_STATISTICS',
  decoratorFilterApiKeyAccess: 'filter-api-key-access',
  decoratorRoles: 'roles',
  decoratorVerifiedOnly: 'verified-only',
  extSubs: ['ass', 'srt'],
  extFonts: ['ttf', 'otf', 'woff', 'woff2'],
  fileTypeAttachmentAllowed: [
    'video/x-matroska',
    'video/mp4'
  ],
  fileSizeAttachmentChunkCloudflareLimit: 64 * 1000 * 1000, // Cloudflare User Plan -- Free Is 100 MB ~ T.T
  fileSizeAttachmentChunkDiscordLimit: 8 * 1000 * 1000, // Discord -- Without Nitro Is 8 MB ~ T.T
  fileSizeAttachmentTotalLimit: 256 * 1000 * 1000, // Max Upload Limits -- < 256 MB Streamable
  fileSizeImageLimit: 256 * 1000, // 256 KB
  gCaptchaSiteKey: '6Ld4Bt4UAAAAAKJQ_jfqtWdsq9BuARLHag2DBvqK',
  jwtAlgorithm: 'HS512',
  jwtExpiredIn: 24 * 60 * 60, // 1 Day
  quizOptionsCountHirakata: 5,
  quizOptionsCountCategory: 6,
  quizOptionsCountKanji: 6,
  regexIpAddress: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  regexAllKeyboardKeys: /^[\P{Cc}\P{Cn}\P{Cs}]*$/,
  regexEmail: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
  regexEmailMulti: /^[^a-z0-9_]*([a-z0-9_+\-.%]+@[a-z0-9_\-.]+\.[a-z]+[^a-z0-9_]*,{1}[^a-z0-9_]*)*([a-z0-9_+\-.%]+@[a-z0-9_\-.]+\.[a-z]+)[^a-z0-9_]*$/,
  regexEnglishKeyboardKeys: /^[a-zA-Z0-9~`!@#\$%\^&\*\(\)_\-\+={\[\}\]\|\\:;"'<,>\.\?\/  \n]*$/,
  regexJapaneseKeyboardKeys: /[一-龠ぁ-ゔァ-ヴーａ-ｚＡ-Ｚ０-９々〆〤、。]+/u,
  regexUrl: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
  socketRoomNameGlobalPublic: 'GLOBAL_PUBLIK',
  socketRoomNameGlobalFansub: 'GLOBAL_FANSUB',
  socketRoomNameServerLogs: 'SERVER_LOGS',
  timeoutCancelRegisterKey: 'TIMEOUT_CANCEL_REGISTER',
  timeoutCancelRegisterTime: 5 * 60 * 1000, // 3 Minutes
  timeoutDeleteTempAttachmentKey: 'TIMEOUT_DELETE_TEMP_ATTACHMENT',
  timeoutDeleteTempAttachmentTime: 3 * 60 * 1000, // 3 Minutes
  timeJwtEncryption: 3 * 60, // 3 Minutes
  timeLoginRememberMe: 7 * 24 * 60 * 60, // 7 Days
  timeMaxDaysNotification: 7 * 24 * 60 * 60 * 1000, // 7 Days
  verificationDomain: [
    'ghs.google.com'
  ]
};
