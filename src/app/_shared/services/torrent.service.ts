import { Injectable } from '@angular/core';

declare var WebTorrent: any;

import { Options, Instance, Torrent, TorrentOptions } from 'webtorrent';
// import { Wire } from 'bittorrent-protocol';

import { environment } from '../../../environments/client/environment';

import { ToastrService } from 'ngx-toastr';

import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class TorrentService {

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

  torrentOptions: TorrentOptions = {
    announce: this.trackerAnnounce,
    maxWebConns: 8
  };

  public client: Instance = null;
  public expandedRow: Torrent = null;

  public tableDataRow: any[] = [];

  error = null;
  refCallback = null;

  constructor(
    public gs: GlobalService,
    private toast: ToastrService
  ) {
    if (this.gs.isBrowser) {
      this.client = new WebTorrent(this.clientOptions);
      this.handleClient();
    }
  }

  handleClient(): void {
    this.client.on('torrent', torrent => {
      this.gs.log('[TORRENT_CLIENT_ADD_TORRENT_FILE]', torrent);
      this.toast.info(torrent.infoHash, 'Woaw, Antrian Baru!');
      this.tableDataRow.push(torrent);
      this.refCallback(null, torrent);
    });
    this.client.on('error', err => {
      this.gs.log('[TORRENT_CLIENT_ERROR]', err);
      this.toast.error(err.toString(), 'Whoops! Error.');
      this.error = err;
      this.refCallback(this.error, null);
    });
  }

  handleTorent(torrent: Torrent, callback): void {
    torrent.on('done', () => {
      this.toast.success(`Ada Torrent Yang Sudah Selesai Di Download`, 'Yeay, Selesai!');
    });
    torrent.on('warning', err => {
      this.gs.log('[TORRENT_FILE_WARNING]', err);
      this.toast.warning(err.toString(), 'Whoops! Warning.');
    });
    torrent.on('error', err => {
      this.gs.log('[TORRENT_FILE_ERROR]', err);
      this.toast.error(err.toString(), 'Whoops! Error.');
      callback(err, null);
    });
    //
    // TODO :: Network Graph Peer Connections
    // https://github.com/webtorrent/bittorrent-protocol
    //
    torrent.on('wire', (wire) => {
      this.gs.log('[TORRENT_WIRE_CONNECT]', wire.peerId);
      wire.once('close', () => {
        this.gs.log('[TORRENT_WIRE_DISCONNECT]', wire.peerId);
      });
    });
  }

  downloadFiles(magnetHash: string, callback): void {
    this.gs.log('[TORRENT_CLIENT_QUEUE_DOWNLOAD]', magnetHash);
    this.refCallback = callback;
    this.client.add(magnetHash, this.torrentOptions, torrent => {
      this.gs.log('[TORRENT_FILE_DOWNLOAD_READY]', torrent);
      this.handleTorent(torrent, callback);
    });
  }

  uploadFiles(userInput: any, files: Array<any>, callback): void {
    this.gs.log('[TORRENT_CLIENT_QUEUE_UPLOAD]', files);
    this.refCallback = callback;
    this.client.seed(files, ({
      ...this.torrentOptions,
      name: userInput.torrentBerkasName.inputText,
      comment: userInput.torrentKomentar.inputText,
      createdBy: `${environment.siteName} WebTorrent (｡>﹏<｡)`
    } as any), torrent => {
      this.gs.log('[TORRENT_FILE_SEED_READY]', torrent);
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
        callback(err);
      });
    }
  }

}
