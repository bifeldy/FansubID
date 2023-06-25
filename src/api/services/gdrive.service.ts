// 3rd Party Library
import { OAuth2Client } from 'google-auth-library';
import { drive_v3, google } from 'googleapis';

// NodeJS Library
import { URL, URLSearchParams } from 'node:url';

import { Injectable } from '@nestjs/common';

import { environment } from '../../environments/api/environment';

import { ApiService } from './api.service';
import { GlobalService } from './global.service';

@Injectable()
export class GdriveService {

  constructor(
    private api: ApiService,
    private gs: GlobalService
  ) {
    //
  }

  // {
  //   access_token: '',
  //   expires_in: 3599,
  //   scope: ['https://www.googleapis.com/auth/drive', 'https://mail.google.com'],
  //   token_type: 'Bearer'
  // }
  async gAuthPersonalAccount(refreshToken): Promise<OAuth2Client> {
    const url = new URL(environment.gCloudPlatform.token_uri);
    const form = new URLSearchParams();
    form.append('grant_type', 'refresh_token');
    form.append('client_id', environment.gCloudPlatform.gDrive.client_id);
    form.append('client_secret', environment.gCloudPlatform.gDrive.client_secret);
    form.append('refresh_token', refreshToken);
    const googleClient = new google.auth.OAuth2(environment.gCloudPlatform.gDrive.client_id, environment.gCloudPlatform.gDrive.client_secret);
    const res_raw = await this.api.postData(url, form, environment.nodeJsXhrHeader);
    const res_json: any = await res_raw.json();
    this.gs.log(`[gApp] 🔑 ${res_raw.status}`, res_json);
    googleClient.setCredentials(res_json);
    return googleClient;
  }

  //
  // https://console.cloud.google.com/apis/credentials => OAuth 2.0 Client IDs
  // https://developers.google.com/oauthplayground => OAuth 2.0 Playground
  // userPersonalUserAccountInsteadOfServiceAccount = false (for upload)
  //
  async gDrive(userPersonalUserAccountInsteadOfServiceAccount = false): Promise<drive_v3.Drive> {
    let auth = null;
    if (userPersonalUserAccountInsteadOfServiceAccount) {
      auth = await this.gAuthPersonalAccount(environment.gCloudPlatform.gDrive.refresh_token);
    } else {
      auth = new google.auth.JWT(
        environment.gCloudPlatform.serviceAccount.client_email,
        null,
        environment.gCloudPlatform.serviceAccount.private_key,
        environment.gCloudPlatform.gDrive.scopes,
        null
      );
    }
    const drive = google.drive({ version: 'v3', auth });
    this.gs.log(`[GDRIVE] ⛅`, drive);
    return drive;
  }

}
