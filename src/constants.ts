export const CONSTANTS = {
  cronFansubRssFeed: 'CRON_FANSUB_RSS_FEED',
  cronFansubRssFeedAll: 'CRON_FANSUB_RSS_FEED_ALL',
  decoratorRoles: 'roles',
  decoratorVerifiedOnly: 'verified-only',
  fileSizeAttachmentLimit: 256 * 1000 * 1000,
  fileSizeImageLimit: 256 * 1000,
  jwtAlgorithm: 'HS512',
  jwtExpiredIn: 24 * 60 * 60,
  quizOptionsCountHirakata: 5,
  quizOptionsCountKanji: 6,
  regexAllKeyboardKeys: /^[\P{Cc}\P{Cn}\P{Cs}]*$/,
  regexEmail: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
  regexEnglishKeyboardKeys: /^[a-zA-Z0-9~`!@#\$%\^&\*\(\)_\-\+={\[\}\]\|\\:;"'<,>\.\?\/  \n]*$/,
  regexJapaneseKeyboardKeys: /[一-龠ぁ-ゔァ-ヴーａ-ｚＡ-Ｚ０-９々〆〤、。]+/u,
  regexUrl: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
  socketRoomNameGlobalPublic: 'GLOBAL_PUBLIK',
  socketRoomNameOrangPenting: 'ORANG_PENTING',
  timeoutCancelRegisterKey: 'TIMEOUT_CANCEL_REGISTER',
  timeoutCancelRegisterTime: 3 * 60 * 1000,
  timeoutDeleteTempAttachmentKey: 'TIMEOUT_DELETE_TEMP_ATTACHMENT',
  timeoutDeleteTempAttachmentTime: 3 * 60 * 1000,
  timeLoginRememberMe: 7 * 24 * 60 * 60,
  timeMaxDaysNotification: 7 * 24 * 60 * 60 * 1000,
  timeRegisterActivation: 5 * 60
};