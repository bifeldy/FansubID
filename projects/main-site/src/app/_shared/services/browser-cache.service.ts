import { Injectable } from '@angular/core';

import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class BrowserCacheService {

  constructor(
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  async clearAllCacheByName(cacheName: string): Promise<boolean[]> {
    const keys = await this.gs.window.caches.keys();
    const kName = keys.filter((c) => !cacheName || cacheName === c);
    return Promise.all(kName.map(k => this.gs.window.caches.delete(k)));
  }

  async clearCacheNameByUrl(cacheName: string, url: string): Promise<boolean[]> {
    const cache = await this.gs.window.caches.open(cacheName);
    const keys = await cache.keys();
    const kUrl = keys.filter((p) => p.url.includes(url));
    return Promise.all(kUrl.map(k => cache.delete(k.url)));
  }

  async clearAllCacheAndRestart(): Promise<void> {
    try {
      await this.clearAllCacheByName(null);
      this.gs.window.location.reload();
    } catch (ex) {
      this.gs.log('[BROWSER_CLEAR_CACHE_NAME_ERROR]', ex, 'error');
    }
  }

  async clearCacheByUrl(url: string = `${this.gs.window.origin}/api/`): Promise<void> {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => this.clearCacheNameByUrl(k, url)));
    } catch (ex) {
      this.gs.log('[BROWSER_CLEAR_CACHE_URL_ERROR]', ex, 'error');
    }
  }

}