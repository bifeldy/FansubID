import fetch from 'node-fetch';
import nodemailer from 'nodemailer';

import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

import { environment } from '../../environments/api/environment';

import { log } from '../helpers/logger';

const googleAuthUrl = environment.googleAuthUrl;
const gcp = environment.gCloudPlatform;

// {
//   access_token: '',
//   expires_in: 3599,
//   scope: ['https://www.googleapis.com/auth/drive', 'https://mail.google.com'],
//   token_type: 'Bearer'
// }
async function gAuth(refreshToken): Promise<OAuth2Client> {
  try {
    const googleClient = new google.auth.OAuth2(gcp.clientId, gcp.clientSecret);
    const res = await fetch(googleAuthUrl, {
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

export async function gDrive(callback): Promise<void> {
  try {
    const auth = await gAuth(gcp.gDrive.refreshToken);
    const drive = google.drive({ version: 'v3', auth });
    log(`[gDrive] ⛅`, drive);
    callback(null, drive);
  } catch (err) {
    console.error(err);
    callback(err, null);
  }
}

// {
//   to: '',
//   subject: '',
//   text: '',
//   html: ''
// }
export async function gMailSend(mailOpt, callback): Promise<void> {
  try {
    const auth = await gAuth(gcp.gMail.refreshToken);
    const transporter = nodemailer.createTransport({
      host: gcp.gMail.host,
      port: gcp.gMail.port,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: gcp.gMail.address,
        accessToken: auth.credentials.access_token
      }
    });
    const mail = await transporter.sendMail({
      from: {
        name: `${environment.siteName} | No-Reply`,
        address: gcp.gMail.address
      },
      to: mailOpt.to,
      subject: mailOpt.subject,
      html: mailOpt.html,
      text: mailOpt.text
    });
    log(`[gMail] 💌`, mail);
    callback(null, mail);
  } catch (err) {
    console.error(err);
    callback(err, null);
  }
}

export function composeRegister(id: string, email:string, username: string, fullName: string, acToken: string): any {
  return {
    to: email,
    subject: 'Hikki - Aktivasi Akun',
    html: `
      <h1>Hikki - Aktivasi Akun</h1>
      <p>Halo ${fullName} (${username}).</p>
      <p>
        Terima kasih telah mendaftar di Hikki. <br />
        Untuk mengaktifkan akun, silahkan klik link berikut ini.
      </p>
      <p>
        <a href="${environment.baseUrl}/api/aktivasi?token=${acToken}">
          ${environment.baseUrl}/api/aktivasi?token=${acToken}
        </a>
      </p>
      <p>Jika link di atas tidak berfungsi, silahkan salin link tersebut dan buka di tab baru browser anda.</p>
      <p>Terima kasih dan selamat datang ^_^</p>
      <p>.: ${id} :.</p>
    `,
    text: `
      Halo ${fullName} (${username}).
      Terima kasih telah mendaftar di Hikki.
      Untuk mengaktifkan akun, silahkan klik link berikut ini.
      ${environment.baseUrl}/api/aktivasi?token=${acToken}
      Jika link di atas tidak berfungsi, silahkan salin link tersebut dan buka di tab baru browser anda
      Terima kasih dan selamat datang ^_^
      .: ${id} :.
    `
  };
}