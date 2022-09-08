// NodeJS Library
import { URL, URLSearchParams } from 'node:url';

import { Injectable } from '@nestjs/common';

import { environment } from '../../environments/api/environment';

import { MailModel, RegistrationModel } from '../../models/req-res.model';

import { ApiService } from './api.service';
import { CryptoService } from './crypto.service';
import { GlobalService } from './global.service';

@Injectable()
export class MailService {

  constructor(
    private api: ApiService,
    private cs: CryptoService,
    private gs: GlobalService
  ) {
    //** MailGun Need To Allow / Whitelist From Public IP Server Origin */
    // https://app.mailgun.com/app/account/security/api_keys
  }

  async mailGunGetAllForwarding(): Promise<any> {
    try {
      const url = new URL(`${environment.mailGun.clientOptions.url}/routes`);
      const res_raw = await this.api.getData(url, {
        'Authorization': `Basic ${this.cs.convertToBase64(`${environment.mailGun.clientOptions.username}:${environment.mailGun.clientOptions.key}`)}`,
        ...environment.nodeJsXhrHeader
      });
      if (res_raw.ok) {
        const res_json: any = await res_raw.json();
        this.gs.log(`[MAILGUN_SERVICE-GET_ALL_FORWARDING_SUCCESS] 💌 ${res_raw.status}`, res_json);
        return res_json;
      }
      throw new Error('Mailgun API Error');
    } catch (err) {
      this.gs.log('[MAILGUN_SERVICE-GET_ALL_FORWARDING_ERROR] 💌', err, 'error');
      return null;
    }
  }

  async mailGunGetUserForwarding(username): Promise<any> {
    try {
      const res = await this.mailGunGetAllForwarding();
      const user = res.items.find(item => item.description === username);
      this.gs.log('[MAILGUN_SERVICE-GET_USER_FORWARDING_SUCCESS] 💌', user);
      return user;
    } catch (err) {
      this.gs.log('[MAILGUN_SERVICE-GET_USER_FORWARDING_ERROR] 💌', err, 'error');
      return null;
    }
  }

  async mailGunDeleteForwarding(username: string): Promise<any> {
    try {
      const userMail = await this.mailGunGetUserForwarding(username);
      if (userMail) {
        const url = new URL(`${environment.mailGun.clientOptions.url}/routes/${userMail.id}`);
        const res_raw = await this.api.deleteData(url, {
          'Authorization': `Basic ${this.cs.convertToBase64(`${environment.mailGun.clientOptions.username}:${environment.mailGun.clientOptions.key}`)}`,
          ...environment.nodeJsXhrHeader
        });
        if (res_raw.ok) {
          const res_json: any = await res_raw.json();
          this.gs.log(`[MAILGUN_SERVICE-DELETE_FORWARDING_SUCCESS] 💌 ${res_raw.status}`, res_json);
          return res_json;
        }
      }
      throw new Error('Mailgun API Error');
    } catch (err) {
      this.gs.log('[MAILGUN_SERVICE-DELETE_FORWARDING_ERROR] 💌', err, 'error');
      return null;
    }
  }

  async mailGunAddForwarding(username, emailTarget): Promise<any> {
    try {
      if (!(await this.mailGunGetUserForwarding(username))) {
        const url = new URL(`${environment.mailGun.clientOptions.url}/routes`);
        const form = new URLSearchParams();
        form.append('priority', '0');
        form.append('description', username);
        form.append('expression', `match_recipient("${username}@${environment.mailGun.domain}")`);
        form.append('action', `forward("${emailTarget}")`);
        // form.append('action', 'stop()');
        const res_raw = await this.api.postData(url, form, {
          'Authorization': `Basic ${this.cs.convertToBase64(`${environment.mailGun.clientOptions.username}:${environment.mailGun.clientOptions.key}`)}`,
          ...environment.nodeJsXhrHeader
        });
        if (res_raw.ok) {
          const res_json: any = await res_raw.json();
          this.gs.log(`[MAILGUN_SERVICE-ADD_FORWARDING_SUCCESS] 💌 ${res_raw.status}`, res_json);
          return res_json;
        }
      }
      throw new Error('Mailgun API Error');
    } catch (err) {
      this.gs.log('[MAILGUN_SERVICE-ADD_FORWARDING_ERROR] 💌', err, 'error');
      return null;
    }
  }

  async mailGunSend(mailBody: MailModel): Promise<any> {
    try {
      const url = new URL(`${environment.mailGun.clientOptions.url}/${environment.mailGun.domain}/messages`);
      const form = new URLSearchParams();
      form.append('from', mailBody.from);
      form.append('subject', mailBody.subject);
      form.append('to', mailBody.to);
      if (mailBody.cc) {
        form.append('cc', mailBody.cc);
      }
      if (mailBody.bcc) {
        form.append('cc', mailBody.bcc);
      }
      if (mailBody.template && mailBody.variables) {
        form.append('template', mailBody.template);
        form.append('h:x-mailgun-variables', JSON.stringify(mailBody.variables));
      } else if (mailBody.html) {
        form.append('html', mailBody.html);
      } else {
        form.append('text', mailBody.text);
      }
      const res_raw = await this.api.postData(url, form, {
        'Authorization': `Basic ${this.cs.convertToBase64(`${environment.mailGun.clientOptions.username}:${environment.mailGun.clientOptions.key}`)}`,
        ...environment.nodeJsXhrHeader
      });
      if (res_raw.ok) {
        const res_json: any = await res_raw.json();
        this.gs.log(`[MAILGUN_SERVICE-SEND_EMAIL_SUCCESS] 💌 ${res_raw.status}`, res_json);
        return res_json;
      }
      throw new Error('Mailgun API Error');
    } catch (err) {
      this.gs.log('[MAILGUN_SERVICE-SEND_EMAIL_ERROR] 💌', err, 'error');
      return null;
    }
  }

  async sendRegisterActivationMail(user: RegistrationModel): Promise<any> {
    const content: MailModel = {
      from: `${environment.mailGun.fullName} <${environment.mailGun.clientOptions.username}@${environment.mailGun.domain}>`,
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
    return await this.mailGunSend(content);
  }

}
