import { Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { RegistrationModel } from '../../models/req-res.model';

import { MailService } from '../services/mail.service';

@Controller('/register')
export class RegisterController {

  constructor(
    private ms: MailService
  ) {
    //
  }

  @Post('/')
  @HttpCode(201)
  register(@Req() req: Request, @Res({ passthrough: true }) res: Response): any {
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
          .: ${registration.id} :.
        `
      }
    }
  }

}