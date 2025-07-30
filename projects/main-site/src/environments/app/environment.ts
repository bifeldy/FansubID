// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { CONSTANTS } from "../../constants";

export const environment = {
  production: false,
  siteName: 'FansubID',
  siteDescription: 'Database Fansub Indonesia!',
  author: 'Bifeldy',
  domain: 'localhost',
  baseUrl: 'http://localhost:4200',
  apiUrl: '/api',
  apiKey: '00000000-0000-0000-0000-000000000000',
  discord: {
    client_id: '789831990433153034',
    join_url: 'https://discord.gg/xGWdExk',
    guild_id: '342220398022098944'
  },
  line: {
    oa_id: 'https://line.me/ti/p/~@616nqkdg'
  },
  torrent: {
    trackerCheckerApi: 'https://checker.openwebtorrent.com/check',
    trackerAnnounce: CONSTANTS.torrentTracker,
    iceServers: [
      { urls: CONSTANTS.torrentIceStunServer }
    ]
  }
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
