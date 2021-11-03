import { Injectable } from '@angular/core';

declare var WebTorrent: any;

import { Options, Instance, Torrent, TorrentOptions } from 'webtorrent';
import { Wire } from 'bittorrent-protocol';

import idbChunkStore from 'idb-chunk-store';
import * as idb from 'idb';

import { environment } from '../../../environments/client/environment';

import { ToastrService } from 'ngx-toastr';

import { GlobalService } from './global.service';
import { LocalStorageService } from './local-storage.service';

interface Queue {
  completed?: boolean;
  indexedDb?: string;
  infoHash?: string;
  isDownloadAndSeed?: boolean,
  name?: string;
  files?: any[];
};

@Injectable({
  providedIn: 'root'
})
export class TorrentService {

  localStorageSearchKeyName = `${environment.siteName}_Torrents`;

  trackerAnnounce = [
    'wss://tracker.openwebtorrent.com',
    'wss://tracker.btorrent.xyz',
    'wss://tracker.hikki.id'
  ];

  clientOptions: Options = {
    maxConns: 64,
    tracker: {
      announce: this.trackerAnnounce,
      rtcConfig: {
        iceServers: [
          {
            urls: [
              'stun:relay.socket.dev:443',
              'stun:stun.l.google.com:19302',
              'stun:stun.l.google.com:19305',
            ]
          },
          {
            urls: [
              'turn:relay.socket.dev:443?transport=udp',
              'turn:relay.socket.dev:443?transport=tcp',
              'turns:relay.socket.dev:443?transport=udp',
              'turns:relay.socket.dev:443?transport=tcp',
            ],
            username: "relay.socket.dev",
            credential: "tears-whiplash-overall-diction"
          }
        ]
      }
    }
  };

  torrentsQueue: Queue = {};

  torrentOptions: TorrentOptions = {
    announce: this.trackerAnnounce,
    maxWebConns: 8,
    store: idbChunkStore
  };

  public client: Instance = null;
  public expandedRow: Torrent = null;

  public tableDataRow: any[] = [];

  error = null;
  refCallback = null;

  constructor(
    public gs: GlobalService,
    private toast: ToastrService,
    private ls: LocalStorageService
  ) {
    if (this.gs.isBrowser) {
      this.torrentsQueue = this.ls.getItem(this.localStorageSearchKeyName, true) || this.torrentsQueue;
      this.client = new WebTorrent(this.clientOptions);
      this.handleClient();
    }
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
      this.ls.setItem(this.localStorageSearchKeyName, this.torrentsQueue);
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

  handleWire(wire: Wire): any {
    //
    // TODO :: Buat Graph Sambungan Peer
    //
    this.gs.log('[TORRENT_WIRE_CONNECT]', wire.peerId);
    wire.once('close', () => {
      this.gs.log('[TORRENT_WIRE_DISCONNECT]', wire.peerId);
    });
  }

  resurrectFiles(callback): void {
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
          }
        );
      }
    }
  }

  downloadFiles(magnetHash: string, callback, opts = this.torrentOptions): void {
    this.gs.log('[TORRENT_CLIENT_QUEUE_DOWNLOAD]', magnetHash);
    this.refCallback = callback;
    this.client.add(magnetHash, opts, torrent => {
      this.gs.log('[TORRENT_FILE_DOWNLOAD_READY]', torrent);
      this.toast.info('Memulai Download ...', 'Download!');
      torrent.on('wire', wire => this.handleWire(wire));
      this.torrentsQueue[torrent.infoHash] = {
        completed: false,
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
      this.ls.setItem(this.localStorageSearchKeyName, this.torrentsQueue);
      this.handleTorent(torrent, callback);
      this.gs.log('[TORRENT_CLIENT_QUEUE]', this.torrentsQueue);
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
      torrent.on('wire', wire => this.handleWire(wire));
      this.torrentsQueue[torrent.infoHash] = {
        completed: true,
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
      this.ls.setItem(this.localStorageSearchKeyName, this.torrentsQueue);
      this.handleTorent(torrent, callback);
      this.gs.log('[TORRENT_CLIENT_QUEUE]', this.torrentsQueue);
    });
  }

  removeTorrent(torrentId, callback): void {
    if (torrentId && this.client.get(torrentId)) {
      this.tableDataRow = this.tableDataRow.filter(el => el.infoHash !== torrentId);
      this.client.remove(torrentId, {
        destroyStore: true
      }, err => {
        if (err) {
          this.gs.log('[TORRENT_FILE_REMOVE_ERROR]', err);
        }
        delete this.torrentsQueue[torrentId];
        this.ls.setItem(this.localStorageSearchKeyName, this.torrentsQueue);
        if (callback) {
          callback(err);
        }
      });
    }
  }

  pauseTorrent(torrentId, callback): void {
    if (torrentId) {
      const torrent = this.client.get(torrentId);
      if (torrent) {
        torrent.pause();
        this.torrentsQueue[torrentId].isDownloadAndSeed = false;
        this.ls.setItem(this.localStorageSearchKeyName, this.torrentsQueue);
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
        this.ls.setItem(this.localStorageSearchKeyName, this.torrentsQueue);
        if (callback) {
          callback(torrent);
        }
      }
    }
  }

}
