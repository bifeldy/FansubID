import { Buffer } from 'buffer'; 
import { AES, enc, lib, mode, pad, PBKDF2, SHA512 } from 'crypto-js';

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

  msgEncrypt(message, keyPass = environment.apiKey): string {
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

  msgDecrypt(encryptedMessage, keyPass = environment.apiKey): string {
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

  hashPassword(password): string {
    return SHA512(password).toString();
  }

  jwtView(jwt: string): any {
    const base64Url = jwt.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      this.universalAtob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join('')
    );
    return JSON.parse(jsonPayload);
  }

}
