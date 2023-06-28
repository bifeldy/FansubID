import { AES, enc, lib, mode, pad, PBKDF2, SHA512 } from 'crypto-js';
import { decode } from 'jsonwebtoken';

import { Injectable } from '@angular/core';

import { environment } from '../../../environments/app/environment';

import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  keySize = 256;
  ivSize = 128;
  iterations = 100;

  constructor(
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  msgEncrypt(message, keyPass = environment.apiKey): any {
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

  msgDecrypt(encryptedMessage, keyPass = environment.apiKey): any {
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

  hashPassword(password): any {
    return SHA512(password).toString();
  }

  jwtView(jwt: string): any {
    return decode(jwt);
  }

}
