import fetch from 'node-fetch';

import { google } from 'googleapis';

import { environment } from '../../environments/api/environment';

import { log } from '../helpers/logger';

const refresh_url = environment.googleAuth;
const client_id = environment.driveClientId;
const client_secret = environment.driveClientSecret;
const refresh_token = environment.driveRefreshToken;

export async function gDrive(callback) {
  const googleClient = new google.auth.OAuth2(client_id, client_secret);
  const res = await fetch(refresh_url, {
    method: 'POST',
    body: `grant_type=refresh_token&client_id=${encodeURIComponent(client_id)}&client_secret=${encodeURIComponent(client_secret)}&refresh_token=${encodeURIComponent(refresh_token)}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  const res_json = await res.json();
  log(`[gDrive] 📎`, res_json);
  googleClient.setCredentials(res_json);
  const gsApi = google.drive({
    version: 'v3',
    auth: googleClient
  });
  callback(gsApi);
}
