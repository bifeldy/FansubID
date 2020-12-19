import fetch from 'node-fetch';

import logger from './logger';

import { environment } from '../../environments/environment';

import { google } from 'googleapis';

// tslint:disable-next-line: variable-name
const refresh_url = 'https://oauth2.googleapis.com/token';
// tslint:disable-next-line: variable-name
const client_id = environment.driveClientId;
// tslint:disable-next-line: variable-name
const client_secret = environment.driveClientSecret;
// tslint:disable-next-line: variable-name
const refresh_token = environment.driveRefreshToken;

// tslint:disable-next-line: typedef
export async function gDrive(callback) {
  const googleClient = new google.auth.OAuth2(client_id, client_secret);
  const res = await fetch(refresh_url, {
    method: 'POST',
    body: `grant_type=refresh_token&client_id=${encodeURIComponent(client_id)}&client_secret=${encodeURIComponent(client_secret)}&refresh_token=${encodeURIComponent(refresh_token)}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  // tslint:disable-next-line: variable-name
  const res_json = await res.json();
  logger.log(`[gDrive] 📎`, res_json);
  googleClient.setCredentials(res_json);
  const gsApi = google.drive({
    version: 'v3',
    auth: googleClient
  });
  callback(gsApi);
}
