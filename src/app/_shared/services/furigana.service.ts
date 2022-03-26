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
  observer = null;
  ignoreNodes = [];

  constructor(
    public gs: GlobalService,
    private bs: BusyService
  ) {
    if (this.gs.isBrowser) {
      this.kuroshiro = new Kuroshiro();
      this.kuroshiro.init(new KuromojiAnalyzer({
        dictPath: '/assets/furigana/'
      }));
    }
  }

  convert(message): any {
    this.gs.log('[KUROSHIRO_CONVERT]', message);
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
    if (node.parentNode.nodeName === 'RUBY') return;
    if (!node.nodeValue.match(/[\u3400-\u9FBF]/)) return;
    const result = await this.convert(node.nodeValue);
    this.ignoreNodes.push(...this.replace(node, result));
  }

  watch(mutation): void {
    if (mutation.type == 'childList') {
      for (const node of mutation.addedNodes) {
        this.gs.log('[KUROSHIRO_NODE_WATCHER]', node);
        if (this.ignoreNodes.includes(node)) {
          this.ignoreNodes.splice(this.ignoreNodes.indexOf(node), 1);
          continue;
        } else if (node instanceof Text) {
          this.convertAndReplace(node);
        } else {
          const nodeList = [];
          const walk = document.createTreeWalker(node,NodeFilter.SHOW_TEXT,null);
          while(walk.nextNode()) nodeList.push(walk.currentNode);
          this.gs.log('[KUROSHIRO_NODE_WATCHER_LIST]', nodeList);
          for (const node of nodeList) {
            this.convertAndReplace(node)
          }
        }
      }
    } else if (mutation.type == 'characterData') {
      this.convertAndReplace(mutation.target);
    }
  }

}
