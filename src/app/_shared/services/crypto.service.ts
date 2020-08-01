import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  keySize = 256;
  ivSize = 128;
  iterations = 100;

  constructor() {
  }

  encrypt(msg, pass): any {
    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    const key = CryptoJS.PBKDF2(pass, salt, {
      keySize: this.keySize / 32,
      iterations: this.iterations
    });
    const iv = CryptoJS.lib.WordArray.random(128 / 8);
    const encrypted = CryptoJS.AES.encrypt(msg, key, {
      iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });
    const transitmessage = salt.toString() + iv.toString() + encrypted.toString();
    return transitmessage;
  }

  decrypt(transitmessage, pass): any {
    const salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32));
    const iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32));
    const encrypted = transitmessage.substring(64);
    const key = CryptoJS.PBKDF2(pass, salt, {
      keySize: this.keySize / 32,
      iterations: this.iterations
    });
    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    }).toString(CryptoJS.enc.Utf8);
    return decrypted;
  }

}
