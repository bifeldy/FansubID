// NodeJS Library
import { URL, URLSearchParams } from 'node:url';

import { Injectable } from '@nestjs/common';

import { environment } from '../../environments/api/environment';

import { MailModel, RegistrationModel } from '../../models/req-res.model';

import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { CryptoService } from './crypto.service';
import { GlobalService } from './global.service';

@Injectable()
export class MailService {

  constructor(
    private api: ApiService,
    private cfg: ConfigService,
    private cs: CryptoService,
    private gs: GlobalService
  ) {
    //
  }

  async mailGunSend(mailBody: MailModel): Promise<boolean> {
    try {
      const url = new URL(`${environment.mailGun.clientOptions.url}/v3/${environment.mailGun.domain}/messages`);
      const form = new URLSearchParams();
      form.append('from', `${environment.mailGun.fullName} <${environment.mailGun.clientOptions.username}@${environment.mailGun.domain}>`);
      form.append('to', mailBody.to);
      form.append('subject', mailBody.subject);
      form.append('template', mailBody.template);
      form.append('h:x-mailgun-variables', JSON.stringify(mailBody.variables));
      const res_raw = await this.api.post(url, form, {
        'Authorization': `Basic ${this.cs.convertToBase64(`${environment.mailGun.clientOptions.username}:${environment.mailGun.clientOptions.key}`)}`,
        ...environment.nodeJsXhrHeader
      });
      if (res_raw.ok) {
        const res_json: any = await res_raw.json();
        this.gs.log(`[MAILGUN_SERVICE-SUCCESS] 💌 ${res_raw.status}`, res_json);
      } else {
        throw new Error('Mailgun API Error');
      }
      return true;
    } catch (err) {
      this.gs.log('[MAILGUN_SERVICE-ERROR] 💌', err, 'error');
      return false;
    }
  }

  // async yMailSend(mailBody: any): Promise<boolean> {
  //   this.gs.log('[MAIL_SERVICE-ERROR] 💌', 'No Mail Service Configured!', 'error');
  //   return false;
  // }

  // async gMailSend(mailBody: any): Promise<boolean> {
  //   this.gs.log('[MAIL_SERVICE-ERROR] 💌', 'No Mail Service Configured!', 'error');
  //   return false;
  // }

  async sendMail(mailBody: any): Promise<void> {
    let mailStatus = false;
    if (!mailStatus && this.cfg.mailSMTP.mailgun) {
      mailStatus = await this.mailGunSend(mailBody);
    }
    // if (!mailStatus && this.cfg.mailSMTP.ymail) {
    //   mailStatus = await this.yMailSend(mailBody);
    // }
    // if (!mailStatus && this.cfg.mailSMTP.gmail) {
    //   mailStatus = await this.gMailSend(mailBody);
    // }
  }

  sendRegisterActivationMail(user: RegistrationModel): void {
    const content: MailModel = {
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
      },
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
      `.replace(/\s\s+/g, ' ').trim(),
      text: `
        ${user.nama} (${user.username}).
        ${environment.baseUrl}
        (づ￣ ³￣)づ
        Hai, terima kasih telah mendaftar di ${environment.siteName}.
        Untuk mengaktifkan akun, silahkan klik link berikut ini.
        ${environment.baseUrl}/api/aktivasi?token=${user.activation_token}
        Jika link di atas tidak berfungsi, silahkan salin link tersebut dan buka di tab baru browser anda.
        (つ≧▽≦)つ
        Terima kasih dan selamat datang.
        (っ.❛ ᴗ ❛.)っ
        .: ${user.id} :.
      `.replace(/\s\s+/g, ' ').trim()
    };
    this.sendMail(content);
  }

}
