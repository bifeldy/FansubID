import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { ipcRenderer, webFrame } from 'electron';

import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {

  public ipcRndr: typeof ipcRenderer;
  public webFrm: typeof webFrame;

  constructor(
    public gs: GlobalService,
    private toast: ToastrService
  ) {
    if (this.gs.isBrowser) {
      if (this.isElectron) {
        this.ipcRndr = window.require('electron').ipcRenderer;
        this.webFrm = window.require('electron').webFrame;
      }
    }
  }

  public get isElectron(): boolean {
    if (this.gs.isBrowser) {
      return !!(window && window.process && window.process.type);
    }
  }

  send(channel: string, data = null): void {
    this.ipcRndr?.send('torrent-client-init', data);
  }

  handleElectronTorrent(refCallback, torrentsQueue): void {
    this.ipcRndr.on('client-init', (event, data) => {
      this.gs.log('[TORRENT_CLIENT_HYBRID_MODE_INITIALIZED]', data);
    });
    this.ipcRndr.on('client-error', (event, data) => {
      this.toast.error(data.error.toString(), 'Whoops! Error.');
      if (refCallback) {
        refCallback(data.error, null);
      }
    });
    this.ipcRndr.on('torrent-init', (event, data) => {
      this.gs.log('[TORRENT_FILE]', data);
      this.toast.info(data.infoHash, 'Woaw, Antrian Baru!');
    });
    this.ipcRndr.on('torrent-file-done', (event, data) => {
      this.gs.log('[TORRENT_FILE_DONE]', data);
      torrentsQueue[data.infoHash].completed = true;
      if (refCallback) {
        refCallback(null, torrentsQueue);
      }
    });
    this.ipcRndr.on('torrent-file-warning', (event, data) => {
      this.gs.log('[TORRENT_FILE_WARNING]', data);
      this.toast.warning(data.toString(), 'Yuhuu! Warning.');
    });
    this.ipcRndr.on('torrent-file-error', (event, data) => {
      this.gs.log('[TORRENT_FILE_ERROR]', data);
      this.toast.error(data.toString(), 'Whoops! Error.');
      if (refCallback) {
        refCallback(data.error, null);
      }
    });
    this.ipcRndr.on('torrent-queue', (event, data) => {
      this.gs.log('[TORRENT_QUEUE]', data);
      torrentsQueue[data.infoHash] = data;
      if (refCallback) {
        refCallback(null, torrentsQueue);
      }
    });
  }

}
