import fetch from 'node-fetch';

import { URLSearchParams } from 'url';
import { OAuth2Client } from 'google-auth-library';
import { drive_v3, google } from 'googleapis';

import { environment } from '../../environments/api/environment';

import { log } from '../helpers/logger';

const gcp = environment.gCloudPlatform;

// {
//   access_token: '',
//   expires_in: 3599,
//   scope: ['https://www.googleapis.com/auth/drive', 'https://mail.google.com'],
//   token_type: 'Bearer'
// }
async function gAuthPersonalAccount(refreshToken): Promise<OAuth2Client> {
  try {
    const url = new URL(gcp.serviceAccount.token_uri);
    const form = new URLSearchParams();
    form.append('grant_type', 'refresh_token');
    form.append('client_id', gcp.clientId);
    form.append('client_secret', gcp.clientSecret);
    form.append('refresh_token', refreshToken);
    const googleClient = new google.auth.OAuth2(gcp.clientId, gcp.clientSecret);
    const res_raw = await fetch(url.toString(), {
      method: 'POST',
      body: form,
      headers: environment.nodeJsXhrHeader
    });
    const res_json: any = await res_raw.json();
    log(`[gApp] 🔑 ${res_raw.status}`, res_json);
    googleClient.setCredentials(res_json);
    return googleClient;
  } catch (err) {
    throw err;
  }
}

export async function gDrive(isUpload = false): Promise<drive_v3.Drive> {
  try {
    let auth = null;
    if (isUpload) {
      auth = await gAuthPersonalAccount(gcp.gDrive.refreshToken);
    } else {
      auth = new google.auth.JWT(
        gcp.serviceAccount.client_email,
        null,
        gcp.serviceAccount.private_key,
        gcp.gDrive.scopes,
        null
      );
    }
    // const auth = await gAuthPersonalAccount(gcp.gDrive.refreshToken);
    const drive = google.drive({ version: 'v3', auth });
    log(`[GDRIVE] ⛅`, drive);
    // callback(null, drive);
    return drive;
  } catch (err) {
    throw err;
  }
}

//
// https://app.eu.mailgun.com/app/sending/domains/hikki.id/templates
// https://app.eu.mailgun.com/app/sending/domains/hikki.id/logs > Actions > Details > MIME
//
export async function mailSend(mailBody) {
  try {
    const url = new URL(`${environment.mailGun.clientOptions.url}/v3/${environment.mailGun.domain}/messages`);
    const form = new URLSearchParams();
    form.append('from', `${environment.mailGun.fullName} <${environment.mailGun.clientOptions.username}@${environment.mailGun.domain}>`);
    form.append('to', mailBody.to);
    form.append('subject', mailBody.subject);
    form.append('template', mailBody.template);
    form.append('h:X-Mailgun-Variables', JSON.stringify(mailBody.variables));
    const res_raw = await fetch(url.toString(), {
      method: 'POST',
      body: form,
      headers: {
        'Authorization': `Basic ${Buffer.from(`${environment.mailGun.clientOptions.username}:${environment.mailGun.clientOptions.key}`).toString('base64')}`,
        ...environment.nodeJsXhrHeader
      }
    });
    const res_json: any = await res_raw.json();
    log(`[MAILGUN_SUCCESS] 💌 ${res_raw.status}`, res_json);
  } catch (err) {
    console.error(err);
  }
}

//
// MailGun Template Name :: register
// https://app.eu.mailgun.com/app/sending/domains/hikki.id/templates/details/register
//
export function composeRegisterMail(user: any): any {
  const result = {
    to: user.email,
    subject: `${environment.siteName} | Aktivasi Akun`,
    template: 'register',
    variables: {
      nama: user.nama,
      username: user.username,
      baseUrl: environment.baseUrl,
      siteName: environment.siteName,
      activationToken: user.activation_token,
      id: user.id,
    }
    // html: `
    //   <h1>${user.nama} (<i>${user.username}</i>).</h1>
    //   <h2>
    //     <a href="${environment.baseUrl}">
    //       ${environment.baseUrl}
    //     </a>
    //   </h2>
    //   <p>(づ￣ ³￣)づ</p>
    //   <p>
    //     Hai, terima kasih telah mendaftar di ${environment.siteName}. <br />
    //     Untuk mengaktifkan akun, silahkan klik link berikut ini.
    //   </p>
    //   <p>
    //     <a href="${environment.baseUrl}/api/aktivasi?token=${user.activation_token}">
    //       ${environment.baseUrl}/api/aktivasi?token=${user.activation_token}
    //     </a>
    //   </p>
    //   <p>Jika link di atas tidak berfungsi, silahkan salin link tersebut dan buka di tab baru browser anda.</p>
    //   <p>(つ≧▽≦)つ</p>
    //   <p>Terima kasih dan selamat datang.</p>
    //   <p>(っ.❛ ᴗ ❛.)っ</p>
    //   <p>.: ${user.id} :.</p>
    // `,
    // text: `
    //   ${user.nama} (${user.username}).
    //   ${environment.baseUrl}
    //   (づ￣ ³￣)づ
    //   Hai, terima kasih telah mendaftar di ${environment.siteName}.
    //   Untuk mengaktifkan akun, silahkan klik link berikut ini.
    //   ${environment.baseUrl}/api/aktivasi?token=${user.activation_token}
    //   Jika link di atas tidak berfungsi, silahkan salin link tersebut dan buka di tab baru browser anda.
    //   (つ≧▽≦)つ
    //   Terima kasih dan selamat datang.
    //   (っ.❛ ᴗ ❛.)っ
    //   .: ${user.id} :.
    // `
  };
  // result.html = result.html.replace(/\s\s+/g, ' ').trim();
  // result.text = result.text.replace(/\s\s+/g, ' ').trim();
  return result;
}