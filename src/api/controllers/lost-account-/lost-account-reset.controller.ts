import { Controller, HttpCode, HttpException, HttpStatus, Req, Res, Post } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Equal } from 'typeorm';
import { Request, Response } from 'express';

import { FilterApiKeyAccess } from '../../decorators/filter-api-key-access.decorator';

import { ApiKeyService } from '../../repository/api-key.service';
import { UserService } from '../../repository/user.service';

import { CryptoService } from '../../services/crypto.service';

@ApiExcludeController()
@Controller('/lost-account-reset')
export class LostAccountResetController {

  constructor(
    private cs: CryptoService,
    private aks: ApiKeyService,
    private userRepo: UserService
  ) {
    //
  }

  @Post('/')
  @HttpCode(201)
  @FilterApiKeyAccess()
  async reset(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if ('token' in req.body && 'password' in req.body ) {
        const decoded = this.cs.jwtDecode(req.body.token);
        const selectedUser = await this.userRepo.findOneOrFail({
          where: [
            { id: Equal(decoded.user.id) }
          ]
        });
        selectedUser.password = this.cs.hashPassword(req.body.password);
        let resUserSave = await this.userRepo.save(selectedUser);
        const { password, session_token, session_origin, ...noPwdSes } = resUserSave;
        const clientOriginIpCc = this.aks.getOriginIpCc(req, true);
        selectedUser.session_origin = clientOriginIpCc.origin_ip;
        selectedUser.session_token = this.cs.credentialEncode({ user: noPwdSes });
        resUserSave = await this.userRepo.save(selectedUser);
        return {
          info: '😚 201 - Lost Account API :: Berhasil Reset Akun 🤩',
          result: {
            token: resUserSave.session_token
          }
        };
      }
      throw new Error('Token Expired!');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: '🙄 400 - Lost Account API :: Pencarian Gagal 😪',
        result: {
          message: 'Token Expired!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
