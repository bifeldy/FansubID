import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { ipcRenderer } from 'electron';

import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {

  public ipcRndr: typeof ipcRenderer;

  constructor(
    public gs: GlobalService,
    private toast: ToastrService
  ) {
    if (this.gs.isBrowser) {
      if (this.isElectron) {
        this.ipcRndr = (window as any).electron.ipcRenderer;
      }
    }
  }

  public get isElectron(): boolean {
    if (this.gs.isBrowser) {
      return (window as any).electron !== undefined;
    }
  }

  send(topic: string, data = null): void {
    this.ipcRndr.send(topic, data);
  }

  sendSync(refCallback: any, topic: string, data = null): void {
    try {
      const result = this.ipcRndr.sendSync(topic, data);
      refCallback(null, result);
    } catch (error) {
      refCallback(error, null);
    }
  }

  handleElectronTorrent(refCallback, torrentsQueue): void {
    this.ipcRndr.on('client-init', (data: any) => {
      this.gs.log('[TORRENT_CLIENT_HYBRID_MODE_INITIALIZED]', data);
    });
    this.ipcRndr.on('client-error', (data: any) => {
      this.toast.error(data.error.toString(), 'Whoops! Error.');
      if (refCallback) {
        refCallback(data.error, null);
      }
    });
    this.ipcRndr.on('torrent-init', (data: any) => {
      this.gs.log('[TORRENT_FILE]', data);
      this.toast.info(data.infoHash, 'Woaw, Antrian Baru!');
    });
    this.ipcRndr.on('torrent-file-done', (data: any) => {
      this.gs.log('[TORRENT_FILE_DONE]', data);
      torrentsQueue[data.infoHash].completed = true;
      if (refCallback) {
        refCallback(null, torrentsQueue);
      }
    });
    this.ipcRndr.on('torrent-file-warning', (data: any) => {
      this.gs.log('[TORRENT_FILE_WARNING]', data);
      this.toast.warning(data.toString(), 'Yuhuu! Warning.');
    });
    this.ipcRndr.on('torrent-file-error', (data: any) => {
      this.gs.log('[TORRENT_FILE_ERROR]', data);
      this.toast.error(data.toString(), 'Whoops! Error.');
      if (refCallback) {
        refCallback(data.error, null);
      }
    });
    this.ipcRndr.on('torrent-queue', (data: any) => {
      this.gs.log('[TORRENT_QUEUE]', data);
      torrentsQueue[data.infoHash] = data;
      if (refCallback) {
        refCallback(null, torrentsQueue);
      }
    });
  }

}
