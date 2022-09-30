import viewerjs from 'viewerjs';

import { Injectable } from '@angular/core';

import { GlobalService } from './global.service';

declare const Viewer: typeof viewerjs;

@Injectable({
  providedIn: 'root'
})
export class ViewerService {

  currentViewer = null;

  constructor(
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  viewImage(htmlElement: HTMLElement): void {
    this.currentViewer = new Viewer(
      htmlElement,
      {
        url: 'src',
        navbar: false,
        title: true,
        toolbar: {
          zoomIn: true,
          zoomOut: true,
          oneToOne: true,
          reset: true,
          prev: false,
          play: {
            show: false,
            size: 'large'
          },
          next: false,
          rotateLeft: true,
          rotateRight: true,
          flipHorizontal: true,
          flipVertical: true
        },
        ready: (e) => {
          this.gs.log('[VIEWERJS]', e.type);
          this.currentViewer.show();
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
          this.currentViewer.destroy();
          this.currentViewer = null;
        },
      }
    );
  }

}
