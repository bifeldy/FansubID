import fetch from 'node-fetch';
import nodemailer from 'nodemailer';

import childProcess from 'child_process';

import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

import { environment } from '../../environments/api/environment';

import { log } from '../helpers/logger';

import { serverGetMailProvider } from '../settings';

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
    log(`[GDRIVE] ⛅`, drive);
    callback(null, drive);
  } catch (err) {
    console.error(err);
    callback(err, null);
  }
}

export function isRegisterOpened(): boolean {
  const mailProvider = serverGetMailProvider();
  for (const key in mailProvider) {
    if (mailProvider[key]) return true;
  }
  return false;
}

// {
//   to: '',
//   subject: '',
//   text: '',
//   html: ''
// }
export async function mailSend(userData) {
  const mailProvider = serverGetMailProvider();
  if(mailProvider.mlgun) return mlGunSend(userData);
  if(mailProvider.yahoo) return yMailSend(userData);
  if(mailProvider.gmail) return gMailSend(userData);
};

async function gMailSend(userData) {
  try {
    const mailOpt = composeRegisterMail(userData);
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
    log(`[GMAIL] 💌`, mail);
  } catch (err) {
    console.error(err);
  }
}

async function yMailSend(userData) {
  try {
    const mailOpt = composeRegisterMail(userData);
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
    log(`[YMAIL] 💌`, mail);
  } catch (err) {
    console.error(err);
  }
}

async function mlGunSend(userData) {
  try {
    const mailOpt = composeRegisterMail(userData);
    const shellCommand = `
      curl ${environment.mailGun.clientOptions.url}/v3/${environment.mailGun.domain}/messages -s
      --user '${environment.mailGun.clientOptions.username}:${environment.mailGun.clientOptions.key}'
      -F from='${environment.mailGun.fullName} <${environment.mailGun.clientOptions.username}@${environment.mailGun.domain}>'
      -F to='${mailOpt.to}'
      -F subject='${mailOpt.subject}'
      -F html='${mailOpt.html}'
    `.replace(/\s\s+/g, ' ').trim();
    console.log(`[EXECUTE_CURL] ⚡`, shellCommand);
    const stdOut = childProcess.execSync(shellCommand).toString();
    console.log(`[MAILGUN_SUCCESS] 💌`, stdOut);
  } catch (err) {
    console.error(err);
  }
}

function composeRegisterMail(user: any): any {
  const result = {
    to: user.email,
    subject: `${environment.siteName} - Aktivasi Akun`,
    html: `
      <h1>${user.nama} (<i>${user.username}</i>).</h1>
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
        <a href="${environment.baseUrl}/api/aktivasi?token=${user.activation_token}">
          ${environment.baseUrl}/api/aktivasi?token=${user.activation_token}
        </a>
      </p>
      <p>Jika link di atas tidak berfungsi, silahkan salin link tersebut dan buka di tab baru browser anda.</p>
      <p>(つ≧▽≦)つ</p>
      <p>Terima kasih dan selamat datang.</p>
      <p>(っ.❛ ᴗ ❛.)っ</p>
      <p>.: ${user.id} :.</p>
    `,
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
  result.html = result.html.replace(/\s\s+/g, ' ').trim();
  // result.text = result.text.replace(/\s\s+/g, ' ');
  return result;
}