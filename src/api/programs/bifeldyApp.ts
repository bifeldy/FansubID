import fetch from 'node-fetch';

import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

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
    const googleClient = new google.auth.OAuth2(gcp.clientId, gcp.clientSecret);
    const res = await fetch(gcp.serviceAccount.token_uri, {
      method: 'POST',
      body: `grant_type=refresh_token&client_id=${encodeURIComponent(gcp.clientId)}&client_secret=${encodeURIComponent(gcp.clientSecret)}&refresh_token=${encodeURIComponent(refreshToken)}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const res_json = await res.json();
    log(`[gApp] 🔑`, res_json);
    googleClient.setCredentials(res_json);
    return googleClient;
  } catch (err) {
    throw err;
  }
}

export async function gDrive(callback, isUpload = false): Promise<void> {
  try {
    let auth = null;
    if (isUpload) {
      auth = await gAuthPersonalAccount(gcp.gDrive.refreshToken);
    } else {
      auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: gcp.serviceAccount.client_email,
          private_key: gcp.serviceAccount.private_key
        },
        scopes: ['https://www.googleapis.com/auth/drive']
      });
    }
    const drive = google.drive({ version: 'v3', auth });
    log(`[GDRIVE] ⛅`, drive);
    callback(null, drive);
  } catch (err) {
    console.error(err);
    callback(err, null);
  }
}

//
// https://app.eu.mailgun.com/app/sending/domains/hikki.id/templates
// https://app.eu.mailgun.com/app/sending/domains/hikki.id/logs > Actions > Details > MIME
//
export async function mailSend(mailBody) {
  try {
    const formData = new URLSearchParams();
    formData.append('from', `${environment.mailGun.fullName} <${environment.mailGun.clientOptions.username}@${environment.mailGun.domain}>`);
    formData.append('to', mailBody.to);
    formData.append('subject', mailBody.subject);
    formData.append('template', mailBody.template);
    formData.append('h:X-Mailgun-Variables', JSON.stringify(mailBody.variables));
    const res = await fetch(`${environment.mailGun.clientOptions.url}/v3/${environment.mailGun.domain}/messages`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Basic ${Buffer.from(`${environment.mailGun.clientOptions.username}:${environment.mailGun.clientOptions.key}`).toString('base64')}`,
      }
    });
    const result = await res.json();
    log(`[MAILGUN_SUCCESS] 💌`, result);
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