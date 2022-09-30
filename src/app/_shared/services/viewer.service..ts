import viewerjs from 'viewerjs';

import { Injectable } from '@angular/core';

import { GlobalService } from './global.service';

declare const Viewer: typeof viewerjs;

@Injectable({
  providedIn: 'root'
})
export class ViewerService {

  constructor(
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  viewImage(htmlElement: HTMLElement): void {
    new Viewer(
      htmlElement,
      {
        url: 'src',
        navbar: true,
        title: true,
        toolbar: {
          zoomIn: 1,
          zoomOut: 1,
          oneToOne: 1,
          reset: 1,
          prev: 1,
          play: {
            show: 1,
            size: 'large'
          },
          next: 1,
          rotateLeft: 1,
          rotateRight: 1,
          flipHorizontal: 1,
          flipVertical: 1
        },
        ready: (e) => {
          this.gs.log('[VIEWERJS]', e.type);
        },
        show: (e) => {
          this.gs.log('[VIEWERJS]', e.type);
        },
        shown: (e) => {
          this.gs.log('[VIEWERJS]', e.type);
        },
        view: (e) => {
          this.gs.log('[VIEWERJS]', e.type);
        },
        viewed: (e) => {
          this.gs.log('[VIEWERJS]', e.type);
        },
        move: (e) => {
          this.gs.log('[VIEWERJS]', e.type);
        },
        moved: (e) => {
          this.gs.log('[VIEWERJS]', e.type);
        },
        rotate: (e) => {
          this.gs.log('[VIEWERJS]', e.type);
        },
        rotated: (e) => {
          this.gs.log('[VIEWERJS]', e.type);
        },
        scale: (e) => {
          this.gs.log('[VIEWERJS]', e.type);
        },
        scaled: (e) => {
          this.gs.log('[VIEWERJS]', e.type);
        },
        play: (e) => {
          this.gs.log('[VIEWERJS]', e.type);
        },
        stop: (e) => {
          this.gs.log('[VIEWERJS]', e.type);
        },
        hide: (e) => {
          this.gs.log('[VIEWERJS]', e.type);
        },
        zoom: (e) => {
          this.gs.log('[VIEWERJS]', e.type);
        },
        zoomed: (e) => {
          this.gs.log('[VIEWERJS]', e.type);
        },
        hidden: (e) => {
          this.gs.log('[VIEWERJS]', e.type);
        },
      }
    );
  }

}
