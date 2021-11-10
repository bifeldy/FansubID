import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

declare var WebTorrent: any;

import { Options, Instance, Torrent, TorrentOptions } from 'webtorrent';
import { Wire } from 'bittorrent-protocol';

import idbChunkStore from 'idb-chunk-store';
import * as idb from 'idb';

import { environment } from '../../../environments/client/environment';

import { ToastrService } from 'ngx-toastr';

import { GlobalService } from './global.service';
import { LocalStorageService } from './local-storage.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TorrentService {

  localStorageTorrentKeyName = `${environment.siteName}_Torrents`;

  trackerAnnounce = [
    'wss://tracker.hikki.id',
    'wss://tracker.btorrent.xyz',
    'wss://tracker.openwebtorrent.com'
  ];

  clientOptions: Options = {
    maxConns: 64,
    tracker: {
      announce: this.trackerAnnounce,
      rtcConfig: {
        iceServers: [
          {
            urls: [
              'stun:stun-turn.hikki.id:5349',
              'stun:relay.socket.dev:443'
            ]
          },
          {
            urls: [
              'turn:stun-turn.hikki.id:5349'
            ],
            username: "turn",
            credential: "hikki.id"
          },
          {
            urls: [
              'turn:relay.socket.dev:443'
            ],
            username: "relay.socket.dev",
            credential: "tears-whiplash-overall-diction"
          }
        ]
      }
    }
  };

  torrentsQueue: any = {
    // 'magnet:!@#123...zxc': {
    //   completed?: boolean;
    //   indexedDb?: string;
    //   infoHash?: string;
    //   isDownloadAndSeed?: boolean,
    //   name?: string;
    //   files?: any[];
    // }
  };

  torrentOptions: TorrentOptions = {
    announce: this.trackerAnnounce,
    maxWebConns: 16,
    store: idbChunkStore
  };

  public client: Instance = null;
  public expandedRow: Torrent = null;

  public tableDataRow: Torrent[] = [];

  error = null;
  refCallback = null;

  flagResurrected = false;

  constructor(
    public gs: GlobalService,
    private api: ApiService,
    private toast: ToastrService,
    private ls: LocalStorageService
  ) {
    if (this.gs.isBrowser) {
      this.torrentsQueue = this.ls.getItem(this.localStorageTorrentKeyName, true) || this.torrentsQueue;
      this.client = new WebTorrent(this.clientOptions);
      this.gs.log('[TORRENT_CLIENT_INITIALIZED]', this.client);
      this.handleClient();
    }
  }

  checkHealthOnHikkiTracker(torrentInfo: any): Observable<any> {
    return this.api.postData(`/torrent`, torrentInfo);
  }

  handleClient(): void {
    this.client.on('torrent', torrent => {
      this.gs.log('[TORRENT_CLIENT_ADD_TORRENT_FILE]', torrent);
      this.toast.info(torrent.infoHash, 'Woaw, Antrian Baru!');
      this.tableDataRow.push(torrent);
      if (this.refCallback) {
        this.refCallback(null, torrent);
      }
    });
    this.client.on('error', err => {
      this.gs.log('[TORRENT_CLIENT_ERROR]', err);
      this.toast.error(err.toString(), 'Whoops! Error.');
      this.error = err;
      if (this.refCallback) {
        this.refCallback(this.error, null);
      }
    });
  }

  handleTorent(torrent: Torrent, callback): void {
    torrent.on('done', () => {
      this.toast.success(`Ada Torrent Yang Sudah Selesai Di Download`, 'Yeay, Selesai!');
      this.torrentsQueue[torrent.infoHash].completed = true;
      this.ls.setItem(this.localStorageTorrentKeyName, this.torrentsQueue);
    });
    torrent.on('warning', err => {
      this.gs.log('[TORRENT_FILE_WARNING]', err);
      this.toast.warning(err.toString(), 'Whoops! Warning.');
    });
    torrent.on('error', err => {
      this.gs.log('[TORRENT_FILE_ERROR]', err);
      this.toast.error(err.toString(), 'Whoops! Error.');
      if (callback) {
        callback(err, null);
      }
    });
    if (!this.torrentsQueue[torrent.infoHash].isDownloadAndSeed) {
      this.pauseTorrent(torrent.infoHash, null);
    }
  }

  handleWire(wire: Wire, callback): any {
    this.gs.log('[TORRENT_WIRE_CONNECT]', wire);
    let wireName = wire.peerId || 'Unknown!';
    if (wire.remoteAddress && wire.remotePort) {
      wireName = `${wire.remoteAddress}:${wire.remotePort}`;
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
          idb.openDB(this.torrentsQueue[key].indexedDb, 1).then(async db => {
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
    torrent.on('wire', wire => this.handleWire(wire, callback));
    this.torrentsQueue[torrent.infoHash] = {
      completed: completed,
      indexedDb: torrent.name + ' - ' + torrent.infoHash.slice(0, 8),
      infoHash: torrent.infoHash,
      isDownloadAndSeed: true,
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
    this.ls.setItem(this.localStorageTorrentKeyName, this.torrentsQueue);
    this.handleTorent(torrent, callback);
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
          this.client.add(magnetHash, opts, torrent => {
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
    this.client.seed(files, ({
      ...this.torrentOptions,
      name: userInput.torrentBerkasName.inputText
    } as any), torrent => {
      this.gs.log('[TORRENT_FILE_SEED_READY]', torrent);
      this.toast.info('Memulai Seeding ...', 'Seeding');
      this.processTorrent(torrent, true, callback);
    });
  }

  removeTorrent(torrentId, callback, saveLocalStorage = true): void {
    this.tableDataRow = this.tableDataRow.filter(el => el.infoHash !== torrentId);
    this.client.remove(torrentId, {
      destroyStore: true
    }, err => {
      if (err) {
        this.gs.log('[TORRENT_FILE_REMOVE_ERROR]', err);
      }
      delete this.torrentsQueue[torrentId];
      if (saveLocalStorage) {
        this.ls.setItem(this.localStorageTorrentKeyName, this.torrentsQueue);
      }
      if (callback) {
        callback(err);
      }
    });
  }

  pauseTorrent(torrentId, callback): void {
    if (torrentId) {
      const torrent = this.client.get(torrentId);
      if (torrent) {
        torrent.pause();
        this.torrentsQueue[torrentId].isDownloadAndSeed = false;
        this.ls.setItem(this.localStorageTorrentKeyName, this.torrentsQueue);
        if (callback) {
          callback(torrent);
        }
      }
    }
  }

  resumeTorrent(torrentId, callback): void {
    if (torrentId) {
      const torrent = this.client.get(torrentId);
      if (torrent) {
        torrent.resume();
        this.torrentsQueue[torrentId].isDownloadAndSeed = true;
        this.ls.setItem(this.localStorageTorrentKeyName, this.torrentsQueue);
        if (callback) {
          callback(torrent);
        }
      }
    }
  }

  removeAll(): void {
    for (const t of this.client.torrents) {
      this.removeTorrent(t.infoHash, error => {
        if (!error) {
          this.gs.log('[TORRENT_FILE_REMOVE_SUCCESS]', t.infoHash);
        }
      }, false);
    }
  }

}
