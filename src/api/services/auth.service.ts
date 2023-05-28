import { Injectable } from '@nestjs/common';
import { Equal } from 'typeorm';

import { SosMedModel } from '../../models/req-res.model';

import { Banned } from '../entities/Banned';
import { Registration } from '../entities/Registration';
import { User } from '../entities/User';

import { BannedService } from '../repository/banned.service';
import { KartuTandaPendudukService } from '../repository/kartu-tanda-penduduk.service';
import { ProfileService } from '../repository/profile.service';
import { RegistrationService } from '../repository/registration.service';
import { SocialMediaService } from '../repository/social-media.service';
import { UserService } from '../repository/user.service';

import { CryptoService } from './crypto.service';

@Injectable()
export class AuthService {

  constructor(
    private cs: CryptoService,
    private bannedRepo: BannedService,
    private kartuTandaPendudukRepo: KartuTandaPendudukService,
    private profileRepo: ProfileService,
    private registrationRepo: RegistrationService,
    private userRepo: UserService,
    private sosmedRepo: SocialMediaService
  ) {
    //
  }

  async getUserRequestJwt(userId: number, token: string): Promise<User> {
    try {
      const user = await this.userRepo.findOneOrFail({
        where: [
          {
            id: Equal(userId), 
            session_token: Equal(token)
          }
        ],
        relations: ['kartu_tanda_penduduk_', 'profile_']
      });
      return user;
    } catch (err) {
      return null;
    }
  }

  async isAccountBanned(userId: number): Promise<Banned> {
    try {
      const banned = await this.bannedRepo.findOneOrFail({
        where: [
          {
            user_: {
              id: Equal(userId)
            }
          }
        ],
        relations: ['user_']
      });
      return banned;
    } catch (error) {
      return null;
    }
  }

  async activateAccount(token: string): Promise<User> {
    try {
      const decoded = this.cs.jwtDecrypt(token);
      const selectedRegistration = await this.registrationRepo.findOneOrFail({
        where: [
          { id: Equal(decoded.user.id) }
        ]
      });
      const newUserKtp = this.kartuTandaPendudukRepo.new();
      newUserKtp.nama = selectedRegistration.nama;
      const resKtpSave = await this.kartuTandaPendudukRepo.save(newUserKtp);
      const newUserProfile = this.profileRepo.new();
      const resProfileSave = await this.profileRepo.save(newUserProfile);
      const newUser = this.userRepo.new();
      newUser.username = selectedRegistration.username;
      newUser.email = selectedRegistration.email;
      newUser.password = selectedRegistration.password;
      newUser.kartu_tanda_penduduk_ = resKtpSave;
      newUser.profile_ = resProfileSave;
      const resUserSave = await this.userRepo.save(newUser);
      const { password, session_token, session_origin, ...noPwdSes } = resUserSave;
      delete noPwdSes.kartu_tanda_penduduk_;
      delete noPwdSes.profile_;
      newUser.session_token = this.cs.credentialEncode({ user: noPwdSes });
      const user = await this.userRepo.save(newUser);
      return user;
    } catch (err) {
      return null;
    }
  }

  async reSendActivation(reqBody: any): Promise<Registration> {
    try {
      const registration = await this.registrationRepo.findOneOrFail({
        where: [
          { id: Equal(reqBody.id) }
        ]
      });
      return registration;
    } catch (err) {
      return null;
    }
  }

  async verifySosmedAccount(token: string, sosMedModel: SosMedModel): Promise<User> {
    try {
      const decoded = this.cs.jwtDecrypt(token);
      const sosmed = await this.sosmedRepo.findOneOrFail({
        where: [
          {
            id: Equal(decoded[sosMedModel.toLowerCase()].id),
            type: sosMedModel,
            user_: {
              id: Equal(decoded.user.id)
            }
          }
        ],
        relations: ['user_']
      });
      const user = await this.userRepo.findOneOrFail({
        where: [
          { id: Equal(sosmed.user_.id) }
        ],
        relations: ['kartu_tanda_penduduk_', 'profile_']
      });
      user.verified = true;
      const resUserSave = await this.userRepo.save(user);
      const { password, session_token, session_origin, ...noPwdSes } = resUserSave;
      delete noPwdSes.kartu_tanda_penduduk_;
      delete noPwdSes.profile_;
      user.session_token = this.cs.credentialEncode({ user: noPwdSes });
      return await this.userRepo.save(user);
    } catch (err) {
      return null;
    }
  }

}
