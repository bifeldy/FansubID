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

  rtcIceServers = [
    { urls: 'stun:23.21.150.121' },                 // PeerJS default stun server
    { urls: 'stun:stun.l.google.com:19305' },       // Google public stun server
    { urls: 'stun:stun1.l.google.com:19305' }       // Google public stun server
  ];

  clientOptions: Options = {
    tracker: {
      announce: this.trackerAnnounce,
      rtcConfig: {
        iceServers: this.rtcIceServers
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
  errorTimeoutId = null;
  errorTimeoutCooldown = 12345;

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
    });
    this.client.on('error', err => {
      this.gs.log('[TORRENT_CLIENT_ERROR]', err);
      this.toast.error(err.toString(), 'Whoops! Error.');
      this.error = err;
    });
  }

  handleTorent(torrent: Torrent, callback): void {
    torrent.on('infoHash', () => {
      this.gs.log('[TORRENT_FILE_INFOHASH]', torrent.infoHash);
    });
    torrent.on('metadata', () => {
      this.gs.log('[TORRENT_FILE_METADATA]');
    });
    torrent.on('ready', () => {
      this.gs.log('[TORRENT_FILE_READY]');
    });
    torrent.on('done', () => {
      this.gs.log('[TORRENT_FILE_DONE]');
      this.toast.success(`Ada Torrent Yang Sudah Selesai Di Download`, 'Yeay, Selesai!');
    });
    torrent.on('download', bytes => {
      this.gs.log('[TORRENT_FILE_DOWNLOAD]', bytes);
    });
    torrent.on('upload', bytes => {
      this.gs.log('[TORRENT_FILE_UPLOAD]', bytes);
    });
    torrent.on('noPeers', announceType => {
      this.gs.log('[TORRENT_FILE_NOPEERS]', announceType);
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
    torrent.on('wire', (wire, addr) => {
      this.gs.log('[TORRENT_FILE_WIRE_ADDR]', addr);
      this.handleWire(wire);
    });
  }

  handleWire(wire): void {
    //
    // TODO :: Network Graph Peer Connections
    // https://github.com/webtorrent/bittorrent-protocol
    //
    this.gs.log('[TORRENT_WIRE_CONNECT]', wire.peerId);
    wire.once('close', () => {
      this.gs.log('[TORRENT_WIRE_DISCONNECT]', wire.peerId);
    })
  }

  downloadFiles(magnetHash: string, callback): void {
    this.gs.log('[TORRENT_CLIENT_QUEUE_DOWNLOAD]', magnetHash);
    this.client.add(magnetHash, this.torrentOptions, torrent => {
      this.tableDataRow.push(torrent);
      this.handleTorent(torrent, callback);
      clearTimeout(this.errorTimeoutId);
      callback(null, torrent);
    });
    this.checkError(magnetHash, callback);
  }

  uploadFiles(userInput: any, files: Array<any>, callback): void {
    this.gs.log('[TORRENT_CLIENT_QUEUE_UPLOAD]', files);
    this.client.seed(files, ({
      ...this.torrentOptions,
      name: userInput.torrentBerkasName.inputText,
      comment: userInput.torrentKomentar.inputText,
      createdBy: `${environment.siteName} WebTorrent (｡>﹏<｡)`
    } as any), torrent => {
      this.gs.log('[TORRENT_FILE_SEED_SUCCESS]', torrent);
      this.tableDataRow.push(torrent);
      clearTimeout(this.errorTimeoutId);
      callback(null, torrent);
    });
    this.checkError(null, callback);
  }

  checkError(torrentId = null, callback): void {
    this.errorTimeoutId = setTimeout(() => {
      this.gs.log('[TORRENT_FILE_TIMEOUT]');
      callback(this.error, null);
      if (this.error) {
        this.error = null;
        this.removeTorrent(torrentId, err => {
          if (!err) {
            this.gs.log('[TORRENT_FILE_REMOVE_SUCCESS]', torrentId);
          }
        });
      }
    }, this.errorTimeoutCooldown);
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
