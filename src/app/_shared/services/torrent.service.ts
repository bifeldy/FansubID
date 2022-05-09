import idbChunkStore from 'idb-chunk-store';
import webTorrent from 'webtorrent';

import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Options, Instance, Torrent, TorrentOptions } from 'webtorrent';
import { Wire } from 'bittorrent-protocol';
import { openDB } from 'idb';
import { Buffer } from 'buffer'; 

import { environment } from '../../../environments/app/environment';

import { GlobalService } from './global.service';
import { LocalStorageService } from './local-storage.service';
import { ApiService } from './api.service';

declare const WebTorrent: typeof webTorrent;

@Injectable({
  providedIn: 'root'
})
export class TorrentService {

  trackerAnnounce = environment.trackerAnnounce;

  clientOptions: Options = {
    maxConns: 64,
    tracker: {
      announce: this.trackerAnnounce,
      rtcConfig: {
        iceServers: environment.iceServers
      }
    }
  };

  torrentsQueue: any = {
    // 'magnet:!@#123...zxc': {
    //   completed?: boolean;
    //   indexedDb?: string;
    //   infoHash?: string;
    //   name?: string;
    //   files?: any[];
    // }
  };

  torrentOptions: TorrentOptions = {
    announce: this.trackerAnnounce,
    maxWebConns: 16,
    store: idbChunkStore
  };

  webClient: Instance = null;
  expandedRow: Torrent = null;

  tableDataRowSubject: BehaviorSubject<Torrent[]> = new BehaviorSubject<Torrent[]>([]);
  tableDataRow: Observable<Torrent[]> = this.tableDataRowSubject.asObservable();

  error = null;
  refCallback = null;

  flagResurrected = false;

  constructor(
    private gs: GlobalService,
    private api: ApiService,
    private toast: ToastrService,
    private ls: LocalStorageService
  ) {
    if (this.gs.isBrowser) {
      this.torrentsQueue = this.ls.getItem(this.gs.localStorageKeys.Torrents, true) || this.torrentsQueue;
      if (WebTorrent.WEBRTC_SUPPORT) {
        this.webClient = new WebTorrent(this.clientOptions);
        this.gs.log('[TORRENT_CLIENT_WEB_MODE_INITIALIZED]', this.webClient);
        this.handleWebClient();
      } else {
        this.toast.error('WebRTC Not Supported!', 'Whoops! Error.');
      }
    }
  }

  private get tableDataRowValue(): Torrent[] {
    return this.tableDataRowSubject?.value || [];
  }

  checkHealthOnHikkiTracker(torrentInfo: any): Observable<any> {
    return this.api.postData(`/torrent`, torrentInfo);
  }

  handleWebClient(): void {
    this.webClient.on('torrent', torrent => {
      this.gs.log('[TORRENT_CLIENT_ADD_TORRENT_FILE]', torrent);
      this.toast.info(torrent.infoHash, 'Woaw, Antrian Baru!');
      this.tableDataRowValue.push(torrent);
      this.tableDataRowSubject.next(this.tableDataRowValue);
      if (this.refCallback) {
        this.refCallback(null, torrent);
      }
    });
    this.webClient.on('error', err => {
      this.gs.log('[TORRENT_CLIENT_ERROR]', err);
      this.toast.error(err.toString(), 'Whoops! Error.');
      this.error = err;
      if (this.refCallback) {
        this.refCallback(this.error, null);
      }
    });
  }

  handleWebTorrent(torrent: Torrent, callback): void {
    torrent.on('done', () => {
      this.gs.log('[TORRENT_FILE_DONE]', torrent);
      this.toast.success(`Ada Torrent Yang Sudah Selesai Di Download`, 'Yeay, Selesai!');
      this.torrentsQueue[torrent.infoHash].completed = true;
      this.ls.setItem(this.gs.localStorageKeys.Torrents, this.torrentsQueue);
      if (callback) {
        callback(null, null);
      }
    });
    torrent.on('warning', warn => {
      this.gs.log('[TORRENT_FILE_WARNING]', warn);
      this.toast.warning(warn.toString(), 'Yuhuu! Warning.');
      if (callback) {
        callback(warn, null);
      }
    });
    torrent.on('error', err => {
      this.gs.log('[TORRENT_FILE_ERROR]', err);
      this.toast.error(err.toString(), 'Whoops! Error.');
      if (callback) {
        callback(err, null);
      }
    });
  }

  handleWebWire(wire: Wire, callback): any {
    this.gs.log('[TORRENT_WIRE_CONNECT]', wire);
    let wireName = wire.peerId || 'Unknown!';
    if (wire['remoteAddress'] && wire['remotePort']) {
      wireName = `${wire['remoteAddress']}:${wire['remotePort']}`;
    }
    wire.once('close', () => {
      this.gs.log('[TORRENT_WIRE_DISCONNECT]', wireName);
      if (callback) {
        callback(null, wire);
      }
    });
    if (callback) {
      callback(null, wire);
    }
  }

  resurrectFiles(callback): void {
    if (!this.flagResurrected) {
      this.flagResurrected = true;
      for (const key in this.torrentsQueue) {
        this.gs.log('[TORRENT_CLIENT_QUEUE_RESURRECT]', this.torrentsQueue[key]);
        if (!this.torrentsQueue[key].completed) {
          this.downloadFiles(this.torrentsQueue[key].infoHash, callback, ({
            ...this.torrentOptions,
            name: this.torrentsQueue[key].name
          } as any));
        } else {
          openDB(this.torrentsQueue[key].indexedDb, 1).then(async db => {
            const trx = db.transaction('chunks', 'readonly');
            const store = trx.objectStore('chunks');
            const uint8Array: Uint8Array[] = await store.getAll();
            const buffer: Buffer = Buffer.concat(uint8Array);
            const files: File[] = [];
            for (const file of this.torrentsQueue[key].files) {
              const tf: any = file;
              files.push(
                new File(
                  [buffer.slice(tf.offset, tf.offset + tf.length)],
                  tf.name
                )
              );
            }
            this.uploadFiles({
              torrentBerkasName: {
                inputText: this.torrentsQueue[key].name
              }
            }, files, callback);
          });
        }
      }
    }
    callback(null, null);
  }

  processTorrent(torrent: Torrent, completed: boolean, callback): void {
    torrent.on('wire', wire => this.handleWebWire(wire, callback));
    this.torrentsQueue[torrent.infoHash] = {
      completed: completed,
      indexedDb: torrent.name + ' - ' + torrent.infoHash.slice(0, 8),
      infoHash: torrent.infoHash,
      name: torrent.name,
      files: []
    };
    for (const file of torrent.files) {
      const tf: any = file;
      this.torrentsQueue[torrent.infoHash].files.push({
        name: tf.name,
        offset: tf.offset,
        length: tf.length
      });
    }
    this.ls.setItem(this.gs.localStorageKeys.Torrents, this.torrentsQueue);
    this.handleWebTorrent(torrent, callback);
  }

  downloadFiles(magnetHash: string, callback, opts = this.torrentOptions): void {
    this.gs.log('[TORRENT_CLIENT_QUEUE_DOWNLOAD]', magnetHash);
    this.refCallback = callback;
    this.checkHealthOnHikkiTracker({
      magnetHash,
      trackTimeout: 1234
    }).subscribe({
      next: (res: any) => {
        this.gs.log('[TORRENT_CLIENT_HEALTH_SUCCESS]', res.result);
        if (res.result.seeds <= 0) {
          this.toast.warning('Tidak Ada Seeder!', 'Whoops! Error.');
          if (callback) {
            callback(null, res.result);
          }
        } else {
          this.webClient.add(magnetHash, opts, torrent => {
            this.gs.log('[TORRENT_FILE_DOWNLOAD_READY]', torrent);
            this.toast.info('Memulai Download ...', 'Download!');
            this.processTorrent(torrent, false, callback);
          });
        }
      },
      error: (err: any) => {
        this.gs.log('[TORRENT_CLIENT_HEALTH_ERROR]', err);
        if (callback) {
          callback(err, null);
        }
      }
    });
  }

  uploadFiles(userInput: any, files: Array<File>, callback): void {
    this.gs.log('[TORRENT_CLIENT_QUEUE_UPLOAD]', files);
    this.gs.log('[TORRENT_CLIENT_QUEUE_UPLOAD]', userInput);
    this.refCallback = callback;
    this.webClient.seed(files, ({
      ...this.torrentOptions,
      name: userInput.torrentBerkasName.inputText
    } as any), torrent => {
      this.gs.log('[TORRENT_FILE_SEED_READY]', torrent);
      this.toast.info('Memulai Seeding ...', 'Seeding');
      this.processTorrent(torrent, true, callback);
    });
  }

  removeTorrent(torrentId, callback, saveLocalStorage = true): void {
    this.tableDataRowSubject.next(this.tableDataRowValue.filter(el => el.infoHash !== torrentId));
    this.webClient.remove(torrentId, {
      destroyStore: true
    }, err => {
      if (err) {
        this.gs.log('[TORRENT_FILE_REMOVE_ERROR]', err);
      }
      delete this.torrentsQueue[torrentId];
      if (saveLocalStorage) {
        this.ls.setItem(this.gs.localStorageKeys.Torrents, this.torrentsQueue);
      }
      if (callback) {
        callback(err);
      }
    });
  }

  pauseTorrent(torrentId, callback): void {
    const torrent = this.webClient.get(torrentId);
    if (torrent) {
      torrent.pause();
      if (callback) {
        callback(torrent);
      }
    }
  }

  resumeTorrent(torrentId, callback): void {
    const torrent = this.webClient.get(torrentId);
    if (torrent) {
      torrent.resume();
      if (callback) {
        callback(torrent);
      }
    }
  }

  removeAll(): void {
    for (const t of this.webClient.torrents) {
      this.removeTorrent(t.infoHash, error => {
        if (!error) {
          this.gs.log('[TORRENT_FILE_REMOVE_SUCCESS]', t.infoHash);
        }
      }, false);
    }
  }

}
