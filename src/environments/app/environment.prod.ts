export const environment = {
  production: true,
  siteName: 'FansubID',
  siteDescription: 'Di Kamar Saja!',
  author: 'Bifeldy',
  domain: 'fansub.id',
  baseUrl: 'https://www.fansub.id',
  apiUrl: '/api',
  apiKey: '00000000-0000-0000-0000-000000000000',
  discordUrl: 'https://discord.gg/xGWdExk',
  discordGuildId: '342220398022098944',
  discordClientId: '789831990433153034',
  trackerAnnounce: [
    'wss://tracker.fansub.id',
    'wss://tracker.btorrent.xyz',
    'wss://tracker.openwebtorrent.com'
  ],
  iceServers: [
    {
      urls: [
        'stun:tracker.fansub.id:11111',
        'stun:openrelay.metered.ca:80',
        'stun:stun.l.google.com:19302'
      ]
    }
  ]
};
