import { CONSTANTS } from "../../constants";

export const environment = {
  production: true,
  siteName: 'FansubID',
  siteDescription: 'Database Fansub Indonesia!',
  author: 'Bifeldy',
  domain: 'fansub.id',
  baseUrl: 'https://www.fansub.id',
  apiUrl: '/api',
  apiKey: '00000000-0000-0000-0000-000000000000',
  discord: {
    client_id: '789831990433153034',
    join_url: 'https://discord.gg/xGWdExk',
    guild_id: '342220398022098944'
  },
  torrent: {
    trackerAnnounce: CONSTANTS.torrentTracker,
    iceServers: [
      { urls: CONSTANTS.torrentIceStunServer }
    ]
  }
};
