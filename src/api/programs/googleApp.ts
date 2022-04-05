import fetch from 'node-fetch';
import nodemailer from 'nodemailer';
import request from 'postman-request';

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
      secure: gcp.gMail.secure,
      auth: {
        type: 'OAuth2',
        user: gcp.gMail.senderAddress,
        accessToken: auth.credentials.access_token
      },
      debug: environment.production,
      logger: environment.production
    });
    const mail = await transporter.sendMail({
      from: {
        name: gcp.gMail.senderName,
        address: gcp.gMail.senderAddress
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

export async function yMailSend(mailOpt, callback): Promise<void> {
  try {
    const transporter = nodemailer.createTransport({
      host: environment.yMail.host,
      port: environment.yMail.port,
      secure: environment.yMail.secure,
      auth: {
        user: environment.yMail.senderAddress,
        pass: environment.yMail.senderPassword
      },
      debug: environment.production,
      logger: environment.production
    });
    const mail = await transporter.sendMail({
      from: {
        name: environment.yMail.senderName,
        address: environment.yMail.senderAddress
      },
      to: mailOpt.to,
      subject: mailOpt.subject,
      html: mailOpt.html,
      text: mailOpt.text
    });
    log(`[yMail] 💌`, mail);
    callback(null, mail);
  } catch (err) {
    console.error(err);
    callback(err, null);
  }
}

export async function mgSend(mailBody, callback): Promise<void> {
  try {
    const headerAuth = Buffer.from(`${environment.mailGun.clientOptions.username}:${environment.mailGun.clientOptions.key}`).toString('base64');
    return request({
      method: 'POST',
      uri: `${environment.mailGun.clientOptions.url}/v3/${environment.mailGun.domain}/messages`,
      formData: {
        from: `${environment.mailGun.fullName} <${environment.mailGun.clientOptions.username}@${environment.mailGun.domain}>`,
        ...mailBody
      },
        headers: {
          ...environment.nodeJsXhrHeader,
          Authorization: `Basic ${headerAuth}`,
          'Content-Type': 'multipart/form-data'
        }
    }, async (error, result, body) => {
      if (!error) {
        const mail = JSON.parse(body);
        log(`[mailGun] 💌`, mail);
        callback(null, mail);
      } else {
        callback(error, null);
      }
    });
  } catch (err) {
    console.error(err);
    callback(err, null);
  }
}

export function composeRegister(id: string, email:string, username: string, fullName: string, acToken: string): any {
  return {
    to: email,
    subject: `${environment.siteName} - Aktivasi Akun`,
    html: `
      <h1>${fullName} (<i>${username}</i>).</h1>
      <h2>
        <a href="${environment.baseUrl}">
          ${environment.baseUrl}
        </a>
      </h2>
      <p>(づ￣ ³￣)づ</p>
      <p>
        Hai, terima kasih telah mendaftar di ${environment.siteName}. <br />
        Untuk mengaktifkan akun, silahkan klik link berikut ini.
      </p>
      <p>
        <a href="${environment.baseUrl}/api/aktivasi?token=${acToken}">
          ${environment.baseUrl}/api/aktivasi?token=${acToken}
        </a>
      </p>
      <p>Jika link di atas tidak berfungsi, silahkan salin link tersebut dan buka di tab baru browser anda.</p>
      <p>(つ≧▽≦)つ</p>
      <p>Terima kasih dan selamat datang.</p>
      <p>(っ.❛ ᴗ ❛.)っ</p>
      <p>.: ${id} :.</p>
    `,
    text: `
      ${fullName} (${username}).
      ${environment.baseUrl}
      (づ￣ ³￣)づ
      Hai, terima kasih telah mendaftar di ${environment.siteName}.
      Untuk mengaktifkan akun, silahkan klik link berikut ini.
      ${environment.baseUrl}/api/aktivasi?token=${acToken}
      Jika link di atas tidak berfungsi, silahkan salin link tersebut dan buka di tab baru browser anda.
      (つ≧▽≦)つ
      Terima kasih dan selamat datang.
      (っ.❛ ᴗ ❛.)っ
      .: ${id} :.
    `
  };
}