import { Injectable } from '@angular/core';

import { CryptoService } from './crypto.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    private cs: CryptoService,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  getItem(key, isObject = false): any {
    if (this.gs.isBrowser) {
      if (!isObject) {
        return localStorage.getItem(key);
      } else {
        try {
          const encryptedString = localStorage.getItem(key);
          const jsonString = this.cs.msgDecrypt(encryptedString);
          return JSON.parse(jsonString);
        } catch (error) {
          this.removeItem(key);
          return null;
        }
      }
    } else {
      return null;
    }
  }

  setItem(key, value): void {
    if (this.gs.isBrowser) {
      if (typeof value === 'string') {
        localStorage.setItem(key, value);
      } else {
        const jsonString = JSON.stringify(value);
        const encryptedString = this.cs.msgEncrypt(jsonString);
        localStorage.setItem(key, encryptedString);
      }
    }
  }

  removeItem(key): void {
    if (this.gs.isBrowser) {
      localStorage.removeItem(key);
    }
  }

  clear(): void {
    if (this.gs.isBrowser) {
      // localStorage.clear();
      for (const lsKey of Object.keys(this.gs.localStorageKeys)) {
        if (lsKey !== 'Torrents') {
          this.removeItem(this.gs.localStorageKeys[lsKey]);
        }
      }
    }
  }

}
