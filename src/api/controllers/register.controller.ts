import { Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { CONSTANTS } from '../../constants';

import { RegistrationModel } from '../../models/req-res.model';

import { MailService } from '../services/mail.service';

@ApiExcludeController()
@Controller('/register')
export class RegisterController {

  constructor(
    private ms: MailService
  ) {
    //
  }

  @Post('/')
  @HttpCode(201)
  async register(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const registration: RegistrationModel = res.locals['registration'];
    this.ms.sendRegisterActivationMail(registration);
    return {
      info: '😚 201 - Register API :: Berhasil Mendaftar Yeay 🤩',
      result: {
        id: registration.id,
        title: 'Aktivasi Akun',
        message: `
          Silahkan Periksa Email Untuk Menyelesaikan Pendaftaran. <br />
          Petunjuk Sudah Dikirimkan Ke '<span class="text-danger">${registration.email}</span>'. <br />
          Hanya berlaku selama ${CONSTANTS.timeoutCancelRegisterTime / 60 / 1000} menit. <br />
          Jika masih belum diaktifkan, siapapun dapat mendaftar ulang sebagai '${registration.username}'. <br />
          <br />
          .: ${registration.id} :.
        `
      }
    }
  }

}
