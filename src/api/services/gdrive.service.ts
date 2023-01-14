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

  gcp = environment.gCloudPlatform;

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
    try {
      const url = new URL(this.gcp.serviceAccount.token_uri);
      const form = new URLSearchParams();
      form.append('grant_type', 'refresh_token');
      form.append('client_id', this.gcp.clientId);
      form.append('client_secret', this.gcp.clientSecret);
      form.append('refresh_token', refreshToken);
      const googleClient = new google.auth.OAuth2(this.gcp.clientId, this.gcp.clientSecret);
      const res_raw = await this.api.postData(url, form, environment.nodeJsXhrHeader);
      const res_json: any = await res_raw.json();
      this.gs.log(`[gApp] 🔑 ${res_raw.status}`, res_json);
      googleClient.setCredentials(res_json);
      return googleClient;
    } catch (err) {
      throw err;
    }
  }

  //
  // https://console.cloud.google.com/apis/credentials => OAuth 2.0 Client IDs
  // https://developers.google.com/oauthplayground => OAuth 2.0 Playground
  // userPersonalUserAccountInsteadOfServiceAccount = false (for upload)
  //
  async gDrive(userPersonalUserAccountInsteadOfServiceAccount = false): Promise<drive_v3.Drive> {
    try {
      let auth = null;
      if (userPersonalUserAccountInsteadOfServiceAccount) {
        auth = await this.gAuthPersonalAccount(this.gcp.gDrive.refreshToken);
      } else {
        auth = new google.auth.JWT(
          this.gcp.serviceAccount.client_email,
          null,
          this.gcp.serviceAccount.private_key,
          this.gcp.gDrive.scopes,
          null
        );
      }
      const drive = google.drive({ version: 'v3', auth });
      this.gs.log(`[GDRIVE] ⛅`, drive);
      return drive;
    } catch (err) {
      throw err;
    }
  }

}
