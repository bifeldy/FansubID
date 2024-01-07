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

  clearAllCacheAndRestart() {
    this.clearAllCacheOrByName();
    this.gs.window.location.reload();
  }

  async clearAllCacheOrByName(cacheName: string = null): Promise<void> {
    try {
      const keys = await this.gs.window.caches.keys();
      const kName = keys.filter((c) => !cacheName || cacheName == c);
      await Promise.all(kName.map(k => this.gs.window.caches.delete(k)));
    } catch (ex) {
      this.gs.log('[BROWSER_CLEAR_CACHE_ERROR]', ex, 'error');
    }
  }

  async clearCacheByUrl(cacheName: string, url: string): Promise<void> {
    try {
      const cache = await this.gs.window.caches.open(cacheName);
      const keys = await cache.keys();
      const kUrl = keys.filter((p) => p.url.includes(url));
      await Promise.all(kUrl.map(k => cache.delete(k.url)));
    } catch (ex) {
      this.gs.log('[BROWSER_CLEAR_CACHE_ERROR]', ex, 'error');
    }
  }

}