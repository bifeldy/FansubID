export const CONSTANTS = {
  blacklistedWords: [
    '*', 'www', 'fansub', 'fansub.id', 'fansubid', 'fansub-id',
    'localhost', 'mail', 'email', 'e-mail', 'tracker', 'fansub', 'fansubber',
    'ferdion', 'bifeldy', 'dev', 'api', 'docs', 'cs', 'help', 'support',
    'admin', 'administrator', 'info', 'information', 'noreply', 'mod', 'moderator'
  ],
  cronFansubRssFeed: 'CRON_FANSUB_RSS_FEED',
  decoratorRoles: 'roles',
  decoratorVerifiedOnly: 'verified-only',
  fileSizeAttachmentLimit: 100 * 1000 * 1000, // Cloudflare User Plan -- Free Is 100 MB ~ T.T
  fileSizeImageLimit: 256 * 1000,
  jwtAlgorithm: 'HS512',
  jwtExpiredIn: 24 * 60 * 60,
  quizOptionsCountHirakata: 5,
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
  timeoutCancelRegisterTime: 3 * 60 * 1000,
  timeoutDeleteTempAttachmentKey: 'TIMEOUT_DELETE_TEMP_ATTACHMENT',
  timeoutDeleteTempAttachmentTime: 3 * 60 * 1000,
  timeLoginRememberMe: 7 * 24 * 60 * 60,
  timeMaxDaysNotification: 7 * 24 * 60 * 60 * 1000,
  timeRegisterActivation: 5 * 60
};
