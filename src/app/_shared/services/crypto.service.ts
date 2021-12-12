import cryptojs from 'crypto-js';

import { Injectable } from '@angular/core';

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

  encrypt(msg, pass): any {
    const salt = cryptojs.lib.WordArray.random(128 / 8);
    const key = cryptojs.PBKDF2(pass, salt, {
      keySize: this.keySize / 32,
      iterations: this.iterations
    });
    const iv = cryptojs.lib.WordArray.random(128 / 8);
    const encrypted = cryptojs.AES.encrypt(msg, key, {
      iv,
      padding: cryptojs.pad.Pkcs7,
      mode: cryptojs.mode.CBC
    });
    const transitmessage = salt.toString() + iv.toString() + encrypted.toString();
    return transitmessage;
  }

  decrypt(transitmessage, pass): any {
    const salt = cryptojs.enc.Hex.parse(transitmessage.substr(0, 32));
    const iv = cryptojs.enc.Hex.parse(transitmessage.substr(32, 32));
    const encrypted = transitmessage.substring(64);
    const key = cryptojs.PBKDF2(pass, salt, {
      keySize: this.keySize / 32,
      iterations: this.iterations
    });
    const decrypted = cryptojs.AES.decrypt(encrypted, key, {
      iv,
      padding: cryptojs.pad.Pkcs7,
      mode: cryptojs.mode.CBC
    }).toString(cryptojs.enc.Utf8);
    return decrypted;
  }

  hashPassword(password): any {
    return cryptojs.SHA512(password).toString();
  }

}
