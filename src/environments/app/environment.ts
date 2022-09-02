export const environment = {
  production: false,
  siteName: 'FansubID',
  siteDescription: 'Di Kamar Saja!',
  author: 'Bifeldy',
  domain: 'localhost',
  baseUrl: 'http://localhost:4200',
  apiUrl: '/api',
  apiKey: 'fansubid_api_key',
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
        'stun:tracker.fansub.id:3478',
        'stun:tracker.fansub.id:5349'
      ]
    }
  ]
};
