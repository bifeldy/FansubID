// NodeJS Library
import { Buffer } from 'node:buffer';

// 3rd Party Library
import { AES, enc, lib, mode, pad, PBKDF2, SHA512 } from 'crypto-js';
import { sign, verify, decode, Algorithm } from 'jsonwebtoken';

import { Injectable } from '@nestjs/common';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { GlobalService } from './global.service';

@Injectable()
export class CryptoService {

  jwtAlgorithm = (CONSTANTS.jwtAlgorithm as Algorithm);
  jwtIssuer = environment.author;
  jwtAudience = environment.siteName;
  jwtSecretKey = this.hashPassword(environment.jwtSecretKey);
  jwtExpiredIn = CONSTANTS.jwtExpiredIn;

  keySize = 256;
  ivSize = 128;
  iterations = 100;

  // Encrypt & Decrypt With User API Key
  apiKey = '00000000-0000-0000-0000-000000000000';

  constructor(
    private gs: GlobalService
  ) {
    //
  }

  universalBtoa(str: string): string {
    return this.convertToBase64(str);
  };

  universalAtob(b64Encoded: string): string {
    return this.convertFromBase64(b64Encoded);
  };

  convertToBase64(str: string | Uint8Array): string {
    return this.convertEncoding(str).toString('base64');
  };

  convertFromBase64(b64Encoded: string): string {
    return this.convertEncoding(b64Encoded, 'base64').toString();
  };

  convertEncoding(obj: any, enc: BufferEncoding = null): Buffer {
    if (enc) {
      return Buffer.from(obj, enc)
    }
    return Buffer.from(obj);
  }

  msgEncrypt(message, keyPass = this.apiKey): any {
    const salt = lib.WordArray.random(128 / 8);
    const key = PBKDF2(keyPass, salt, {
      keySize: this.keySize / 32,
      iterations: this.iterations
    });
    const iv = lib.WordArray.random(128 / 8);
    const transitMessage = AES.encrypt(message, key, {
      iv,
      padding: pad.Pkcs7,
      mode: mode.CBC
    });
    const encryptedMessage = salt.toString() + iv.toString() + transitMessage.toString();
    return encryptedMessage;
  }

  msgDecrypt(encryptedMessage, keyPass = this.apiKey): any {
    const salt = enc.Hex.parse(encryptedMessage.substr(0, 32));
    const iv = enc.Hex.parse(encryptedMessage.substr(32, 32));
    const transitMessage = encryptedMessage.substring(64);
    const key = PBKDF2(keyPass, salt, {
      keySize: this.keySize / 32,
      iterations: this.iterations
    });
    const decryptedMessage = AES.decrypt(transitMessage, key, {
      iv,
      padding: pad.Pkcs7,
      mode: mode.CBC
    }).toString(enc.Utf8);
    return decryptedMessage;
  }

  hashPassword(password: string): string {
    return SHA512(password).toString();
  }

  credentialEncode(data: any, rememberMe = false, expiresIn = null): string {
    return this.jwtEncode(data, rememberMe ? CONSTANTS.timeLoginRememberMe : (expiresIn || this.jwtExpiredIn));
  }

  credentialDecode(token: string): any {
    try {
      if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
      }
      const decoded = this.jwtDecode(token);
      this.gs.log('[CRYPTO_SERVICE-CREDENTIAL_DECODE_SUCCESS] 🍪', decoded);
      return decoded;
    } catch (error) {
      // this.gs.log('[CRYPTO_SERVICE-CREDENTIAL_DECODE_ERROR] 🍪', error, 'error');
      throw error;
    }
  }

  jwtEncode(data: any, exp: number): string {
    return sign(
      data,
      this.jwtSecretKey, 
      {
        algorithm: this.jwtAlgorithm,
        issuer: this.jwtIssuer,
        audience: this.jwtAudience,
        expiresIn: exp,
      }
    );
  }

  jwtDecode(token: string): any {
    return verify(token, this.jwtSecretKey);
  }

  jwtView(token: string): any {
    return decode(token);
  }

}
