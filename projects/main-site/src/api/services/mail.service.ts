// 3rd Party Library
import { Mail, MailtrapClient, SendResponse } from 'mailtrap';

import { Injectable } from '@nestjs/common';

import { environment } from '../../environments/api/environment';

import { RegistrationModel, SosMedModel, TicketModel, UserModel } from '../../models/req-res.model';

import { GlobalService } from './global.service';

@Injectable()
export class MailService {

  client = new MailtrapClient({
    endpoint: environment.mailTrap.clientOptions.url, 
    token: environment.mailTrap.clientOptions.key
  });

  webhook: any = {
    // mail_id: {
    //   col: {
    //     bcc: '',
    //     attachment_: [],
    //   },
    //   timeout: true
    // }
  };

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
      throw new Error('MailTrap API Error!');
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

  async sendVerifikasiMail(user: any, token: string, app: SosMedModel): Promise<any> {
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
      subject: `${environment.siteName} | Verifikasi Akun`,
      category: 'Verifikasi',
      html: `
        <h1>${user.nama} (<i>${user.username}</i>).</h1>
        <h2>
          <a href="${environment.baseUrl}">
            ${environment.baseUrl}
          </a>
        </h2>
        <p>(づ￣ ³￣)づ</p>
        <p>
          Hai, terima kasih telah menjadi anggota di ${environment.siteName}. <br />
          Untuk verifikasi akun, silahkan klik link berikut ini.
        </p>
        <p>
          <a href="${environment.baseUrl}/api/verify-sosmed?app=${app.toLowerCase()}&token=${token}">
            ${environment.baseUrl}/api/verify-sosmed?app=${app.toLowerCase()}&token=${token}
          </a>
        </p>
        <p>Jika link di atas tidak berfungsi, silahkan salin link tersebut dan buka di tab baru browser.</p>
        <p>(つ≧▽≦)つ</p>
        <p>Terima kasih.</p>
        <p>(っ.❛ ᴗ ❛.)っ</p>
      `.replace(/\s\s+/g, ' ').trim(),
      text: `
        ${user.nama} (${user.username}).
        ${environment.baseUrl}
        (づ￣ ³￣)づ
        Hai, terima kasih telah mendaftar di ${environment.siteName}.
        Untuk verifikasi akun, silahkan klik link berikut ini.
        ${environment.baseUrl}/api/verify-sosmed?app=${app.toLowerCase()}&token=${token}
        Jika link di atas tidak berfungsi, silahkan salin link tersebut dan buka di tab baru browser.
        (つ≧▽≦)つ
        Terima kasih.
        (っ.❛ ᴗ ❛.)っ
      `.replace(/\s\s+/g, ' ').trim()
    };
    return await this.mailTrapSend(content);
  }

  async sendResetAccountMail(user: UserModel, token: string): Promise<any> {
    const content: Mail = {
      from: {
        name: environment.mailTrap.fullName,
        email: `${environment.mailTrap.clientOptions.username}@${environment.mailTrap.domain}`
      },
      to: [
        {
          name: user.kartu_tanda_penduduk_.nama,
          email: user.email
        }
      ],
      subject: `${environment.siteName} | Reset Akun`,
      category: 'Reset',
      html: `
        <h1>${user.kartu_tanda_penduduk_.nama} (<i>${user.username}</i>).</h1>
        <h2>
          <a href="${environment.baseUrl}">
            ${environment.baseUrl}
          </a>
        </h2>
        <p>(づ￣ ³￣)づ</p>
        <p>
          Hai, selamat datang kembali di ${environment.siteName}. <br />
          Untuk mengatur ulang akun, silahkan gunakan informasi atau klik link berikut ini.
        </p>
        <p>Token :: ${token}</p>
        <p>
          <a href="${environment.baseUrl}/reset-password?token=${token}">
            ${environment.baseUrl}/reset-password?token=${token}
          </a>
        </p>
        <p>Jika link di atas tidak berfungsi, silahkan salin link tersebut dan buka di tab baru browser.</p>
        <p>(つ≧▽≦)つ</p>
        <p>Terima kasih.</p>
        <p>(っ.❛ ᴗ ❛.)っ</p>
      `.replace(/\s\s+/g, ' ').trim(),
      text: `
        ${user.kartu_tanda_penduduk_.nama} (${user.username}).
        ${environment.baseUrl}
        (づ￣ ³￣)づ
        Hai, selamat datang kembali di ${environment.siteName}.
        Untuk mengatur ulang akun, silahkan gunakan informasi atau klik link berikut ini.
        Token :: ${token}
        ${environment.baseUrl}/reset-password?token=${token}
        Jika link di atas tidak berfungsi, silahkan salin link tersebut dan buka di tab baru browser.
        (つ≧▽≦)つ
        Terima kasih.
        (っ.❛ ᴗ ❛.)っ
      `.replace(/\s\s+/g, ' ').trim()
    };
    return await this.mailTrapSend(content);
  }

  async sendReportLaporanMail(ticket: TicketModel): Promise<any> {
    const content: Mail = {
      from: {
        name: environment.mailTrap.fullName,
        email: `${environment.mailTrap.clientOptions.username}@${environment.mailTrap.domain}`
      },
      to: [
        { email: ticket.contact_email }
      ],
      subject: `${environment.siteName} | Laporan Kamu`,
      category: 'Laporan',
      html: `
        <h1>Laporan Sudah Selesai Diproses.</h1>
        <h2>
          <a href="${environment.baseUrl}">
            ${environment.baseUrl}
          </a>
        </h2>
        <p>(づ￣ ³￣)づ</p>
        <p>
          Hai, terima kasih telah turut ikut serta dalam menjaga dan mengawasi ${environment.siteName}. <br />
          ${environment.baseUrl}/ticket/${ticket.id}?secret=${ticket.secret} <br />
          Berikut ini rinciannya.
        </p>
        <p>Pelanggaran :: ${ticket.reported_issue}</p>
        ${ticket.expected_solution ? `<p>Ekspektasi :: ${ticket.expected_solution}</p>` : ''}
        <p>Keputusan :: ${ticket.final_decision}</p>
        <p>(つ≧▽≦)つ</p>
        <p>Terima kasih.</p>
        <p>(っ.❛ ᴗ ❛.)っ</p>
      `.replace(/\s\s+/g, ' ').trim(),
      text: `
        Laporan Sudah Selesai Diproses.
        ${environment.baseUrl}
        (づ￣ ³￣)づ
        Hai, terima kasih telah turut ikut serta dalam menjaga dan mengawasi ${environment.siteName}.
        ${environment.baseUrl}/ticket/${ticket.id}?secret=${ticket.secret}
        Berikut ini rinciannya.
        Pelanggaran :: ${ticket.reported_issue}
        ${ticket.expected_solution ? `Ekspektasi :: ${ticket.expected_solution}` : ''}
        Keputusan :: ${ticket.final_decision}
        (つ≧▽≦)つ
        Terima kasih.
        (っ.❛ ᴗ ❛.)っ
      `.replace(/\s\s+/g, ' ').trim()
    };
    return await this.mailTrapSend(content);
  }

}
