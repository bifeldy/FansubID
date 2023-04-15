// 3rd Party Library
import { Mail, MailtrapClient, SendResponse } from 'mailtrap';

import { Injectable } from '@nestjs/common';

import { environment } from '../../environments/api/environment';

import { RegistrationModel } from '../../models/req-res.model';

import { GlobalService } from './global.service';

@Injectable()
export class MailService {

  client = new MailtrapClient({
    endpoint: environment.mailTrap.clientOptions.url, 
    token: environment.mailTrap.clientOptions.key
  });

  constructor(
    private gs: GlobalService
  ) {
    // https://mailtrap.io/api-tokens
  }

  async mailTrapSend(mailBody: Mail): Promise<SendResponse> {
    try {
      const resp = await this.client.send(mailBody);
      if (resp.success) {
        this.gs.log(`[MAILTRAP_SERVICE-SEND_EMAIL_SUCCESS] 💌`, resp.message_ids);
        return resp;
      }
      throw new Error('MailTrap API Error');
    } catch (err) {
      this.gs.log('[MAILTRAP_SERVICE-SEND_EMAIL_ERROR] 💌', err, 'error');
      return null;
    }
  }

  async sendRegisterActivationMail(user: RegistrationModel): Promise<any> {
    const content: Mail = {
      from: {
        name: environment.mailTrap.fullName,
        email: `${environment.mailTrap.clientOptions.username}@${environment.mailTrap.domain}`
      },
      to: [
        { 
          name: user.nama,
          email: user.email
        }
      ],
      subject: `${environment.siteName} | Aktivasi Akun`,
      category: 'Aktivasi',
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
        <p>Jika link di atas tidak berfungsi, silahkan salin link tersebut dan buka di tab baru browser.</p>
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
        Jika link di atas tidak berfungsi, silahkan salin link tersebut dan buka di tab baru browser.
        (つ≧▽≦)つ
        Terima kasih dan selamat datang.
        (っ.❛ ᴗ ❛.)っ
        .: ${user.id} :.
      `.replace(/\s\s+/g, ' ').trim()
    };
    return await this.mailTrapSend(content);
  }

}
