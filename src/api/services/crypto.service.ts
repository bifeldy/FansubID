// NodeJS Library
import { Buffer } from 'node:buffer';

// 3rd Party Library
import { SHA512 } from 'crypto-js';
import { sign, verify, decode, Algorithm } from 'jsonwebtoken';

import { Injectable } from '@nestjs/common';
import { Request } from 'express';

import { environment } from '../../environments/api/environment';

import { GlobalService } from './global.service';

@Injectable()
export class CryptoService {

  jwtAlgorithm: Algorithm = 'HS512';
  jwtIssuer = environment.author;
  jwtAudience = environment.siteName;
  jwtSecretKey = this.hashPassword(environment.jwtSecretKey);
  jwtExpiredIn = 24 * 60 * 60;

  constructor(
    private gs: GlobalService
  ) {
    //
  }

  universalBtoa(str: string) {
    return this.convertToBase64(str);
  };

  universalAtob(b64Encoded: string) {
    return this.convertFromBase64(b64Encoded);
  };

  convertToBase64(str: string | Uint8Array) {
    return Buffer.from(str).toString('base64');
  };

  convertFromBase64(b64Encoded: string) {
    return Buffer.from(b64Encoded, 'base64').toString();
  };

  hashPassword(password: string): string {
    return SHA512(password).toString();
  }

  credentialEncode(data: any, rememberMe = false, expiresIn = null): string {
    return sign(
      data,
      this.jwtSecretKey, 
      {
        algorithm: this.jwtAlgorithm,
        issuer: this.jwtIssuer,
        audience: this.jwtAudience,
        expiresIn: rememberMe ? (7 * 24 * 60 * 60) : (expiresIn || this.jwtExpiredIn),
      }
    );
  }

  credentialDecode(req: Request): any {
    try {
      let token = req.cookies[environment.tokenName] || req.header('Authorization') || req.header('X-Access-Token') || req.body.token || req.query['token'] || '';
      if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
      }
      const decoded: {} = this.jwtDecrypt(token);
      this.gs.log('[CRYPTO_SERVICE-CREDENTIAL_DECODE_SUCCESS] 🍪', decoded);
      return { ...decoded, token };
    } catch (error) {
      throw error;
    }
  }

  jwtEncrypt(data, expTimeSecond = 3 * 60): string {
    return this.credentialEncode(data, false, expTimeSecond);
  }
  
  jwtDecrypt(token: string): any {
    return verify(token, this.jwtSecretKey);
  }
  
  jwtView(token: string): any {
    return decode(token);
  }

}
