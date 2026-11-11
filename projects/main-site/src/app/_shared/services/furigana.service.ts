import { Injectable } from '@angular/core';
import { BusyService } from './busy.service';

import { GlobalService } from './global.service';

declare const Kuroshiro: any;
declare const KuromojiAnalyzer: any;

@Injectable({
  providedIn: 'root'
})
export class FuriganaService {

  enabled = true;

  kuroshiro = null;
  initPromise: Promise<any> = null;
  observer = null;
  ignoreNodes = new WeakSet<Node>();

  constructor(
    private gs: GlobalService,
    private bs: BusyService
  ) {
    if (this.gs.isBrowser) {
      this.kuroshiro = new Kuroshiro();
    }
  }

  async ensureInit(): Promise<void> {
    if (!this.initPromise && this.gs.isBrowser) {
      this.initPromise = this.kuroshiro.init(new KuromojiAnalyzer({
        dictPath: '/assets/furigana/'
      }));
    }
    return this.initPromise;
  }

  async convert(message): Promise<any> {
    this.gs.log('[KUROSHIRO_CONVERT]', message);
    await this.ensureInit();
    return this.kuroshiro.convert(message, { mode: 'furigana', to: 'hiragana' });
  }

  replace(node, html): any[] {
    const e = this.gs.document.createRange().createContextualFragment(html);
    const newNodes = [];
    e.childNodes.forEach((node) => newNodes.push(node));
    node.parentNode?.replaceChild(e, node);
    return newNodes;
  }

  async convertAndReplace(node): Promise<any> {
    if (!this.enabled) return;
    if (this.bs.busyRequestCount > 0) return;
    if (!node.nodeValue.trim()) return;
    if (node.parentNode?.nodeName === 'RUBY') return;
    if (!node.nodeValue.match(/[\u3400-\u9FBF]/)) return;
    const result = await this.convert(node.nodeValue);
    for (const newNode of this.replace(node, result)) {
      this.ignoreNodes.add(newNode);
    }
  }

  watch(mutation): void {
    if (mutation.type === 'childList') {
      for (const node of mutation.addedNodes) {
        this.gs.log('[KUROSHIRO_NODE_WATCHER]', node);
        if (this.ignoreNodes.has(node)) {
          this.ignoreNodes.delete(node);
          continue;
        } else if (node instanceof Text) {
          this.convertAndReplace(node);
        } else {
          const nodeList = [];
          const walk = this.gs.document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null);
          while(walk.nextNode()) nodeList.push(walk.currentNode);
          this.gs.log('[KUROSHIRO_NODE_WATCHER_LIST]', nodeList);
          for (const node of nodeList) {
            this.convertAndReplace(node)
          }
        }
      }
    } else if (mutation.type === 'characterData') {
      this.convertAndReplace(mutation.target);
    }
  }

}
