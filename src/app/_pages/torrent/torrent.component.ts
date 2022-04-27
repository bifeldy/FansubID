import Graph from 'p2p-graph';

import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';

import { GlobalService } from '../../_shared/services/global.service';
import { TorrentService } from '../../_shared/services/torrent.service';
import { DialogService } from '../../_shared/services/dialog.service';
import { StatsServerService } from '../../_shared/services/stats-server.service';
import { BusyService } from '../../_shared/services/busy.service';

@Component({
  selector: 'app-torrent',
  templateUrl: './torrent.component.html',
  styleUrls: ['./torrent.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TorrentComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<any>;

  isProcessing = false;
  magnetHash = null;

  torrentsGraph: any = {
    // 'magnet:!@#123...zxc': new Graph('magnet:!@#123...zxc')
  };

  tableDataColumn: string[] = [
    'name',
    'length',
    'downloaded',
    'uploaded',
    'progress',
    'downloadSpeed',
    'uploadSpeed',
    'timeRemaining',
    'numPeers',
    'ratio',
  ];

  files: any[] = [];

  subsDialog = null;
  subsUser = null;
  subsTableDataRow = null;

  constructor(
    private gs: GlobalService,
    private torrent: TorrentService,
    private toast: ToastrService,
    private ds: DialogService,
    private ss: StatsServerService,
    private bs: BusyService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  get TORRENT(): TorrentService {
    return this.torrent;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    if (this.gs.isBrowser) {
      this.dataSource.sort = this.sort;
      this.subsTableDataRow = this.torrent.tableDataRow.subscribe({
        next: tableDataRow => {
          this.dataSource.data = tableDataRow;
          this.refreshAllGraph();
        }
      });
      this.reviveTorrent();
    }
  }

  ngOnDestroy(): void {
    this.sort?.sortChange?.unsubscribe();
    this.subsDialog?.unsubscribe();
    this.subsUser?.unsubscribe();
    this.subsTableDataRow?.unsubscribe();
  }

  toggleExpanded(row: any): void {
    this.gs.log('[TORRENT_CLICKED]', row);
    this.torrent.expandedRow = this.torrent.expandedRow === row ? null : row;
    this.refreshGraph(row);
  }

  saveFile(file): void {
    if (file.downloaded / file.length >= 1) {
      this.bs.busy();
      file.getBlobURL((err, blobUrl: string) => {
        if (!err) {
          this.gs.log('[TORRENT_FILE_BLOBURL]', blobUrl);
          saveAs(blobUrl, file.name);
          this.bs.idle();
        }
      });
    } else {
      this.toast.info('Berkas Sedang Dalam Proses Unduhan!', 'Yah, File Belum Siap!');
    }
  }

  reviveTorrent(): void {
    this.torrent.resurrectFiles((error, result) => {
      this.refreshAllGraph();
    });
  }

  resumeTorrent(torrent: any): void {
    this.torrent.resumeTorrent(torrent.infoHash, error => {
      this.refreshAllGraph();
    });
  }

  pauseTorrent(torrent: any): void {
    this.torrent.pauseTorrent(torrent.infoHash, error => {
      if (!error) {
        this.gs.log('[TORRENT_FILE_PAUSE_SUCCESS]', torrent.infoHash);
      }
      this.refreshAllGraph();
    });
  }

  removeTorrent(torrent: any): void {
    this.torrent.removeTorrent(torrent.infoHash, error => {
      if (!error) {
        this.gs.log('[TORRENT_FILE_REMOVE_SUCCESS]', torrent.infoHash);
      }
      this.torrentsGraph[torrent.infoHash].destroy();
      delete this.torrentsGraph[torrent.infoHash];
      this.refreshAllGraph();
    });
  }

  downloadFiles(event: Event): void {
    this.isProcessing = true;
    this.torrent.downloadFiles(this.magnetHash, (error, result) => {
      this.magnetHash = null;
      this.isProcessing = false;
      this.refreshAllGraph();
    });
  }

  uploadFiles(userInput: any): void {
    this.gs.log('[TORRENT_SEED_USER_INFORMATION]', userInput);
    this.isProcessing = true;
    this.torrent.uploadFiles(userInput, this.files, (error, result) => {
      this.isProcessing = false;
      this.refreshAllGraph();
    });
  }

  prepareFilesList(berkas: Array<any>) {
    this.files = [];
    for (const b of berkas) {
      this.files.push(b);
    }
    const userInput = {
      torrentBerkasName: {
        inputLabel: 'Nama Torrent',
        inputText: `Torrent # ${this.ss.mySocket.id} @ ${new Date().toUTCString()}`,
      }
    };
    if (this.files.length == 1) {
      userInput.torrentBerkasName.inputText = this.files[0].name;
      this.uploadFiles(userInput);
    } else if (this.files.length > 1) {
      this.subsDialog = this.ds.openInputDialog({
        data: {
          title: `Silahkan Masukkan Nama Untuk Torrent Kamu!`,
          input: userInput,
          confirmText: 'Ya, Mulai SEED',
          cancelText: 'Tidak, Batal'
        },
        disableClose: true
      }).afterClosed().subscribe({
        next: re => {
          this.gs.log('[INPUT_DIALOG_CLOSED]', re);
          if (re) {
            this.uploadFiles(re);
          }
          this.subsDialog.unsubscribe();
        }
      });
    }
  }

  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  fileBrowseHandler($event) {
    this.prepareFilesList($event.target.files);
  }

  initGraph(torrent: any): void {
    if (!this.torrentsGraph[torrent.infoHash] && this.dataSource.data.length > 0) {
      this.gs.log('[TORRENT_WIRE_INIT_GRAPH]', torrent);
      this.torrentsGraph[torrent.infoHash] = new Graph(`.graphP2p-${torrent.infoHash}`);
      this.torrentsGraph[torrent.infoHash].add({
        id: (this.torrent.webClient as any).peerId,
        me: true,
        name: 'Kamu!'
      });
    }
  }

  addAllGraph(torrent: any): void {
    this.gs.log('[TORRENT_WIRE_RELOAD_GRAPH]', torrent);
    for (const w of torrent.wires) {
      let wireName = w.peerId || 'Anonim!';
      if (w.remoteAddress && w.remotePort) {
        wireName = `${w.remoteAddress}:${w.remotePort}`;
      }
      this.torrentsGraph[torrent.infoHash].add({ id: w.peerId, name: wireName });
      this.torrentsGraph[torrent.infoHash].connect((this.torrent.webClient as any).peerId, w.peerId);
    }
  }

  deleteAllGraph(torrent: any): void {
    this.gs.log('[TORRENT_WIRE_DELETE_GRAPH]', torrent);
    const torrentWireList = this.torrentsGraph[torrent.infoHash].list().filter(w => w.id !== (this.torrent.webClient as any).peerId);
    for (const w of torrentWireList) {
      this.torrentsGraph[torrent.infoHash].disconnect((this.torrent.webClient as any).peerId, w.id);
      this.torrentsGraph[torrent.infoHash].remove(w.id);
    }
  }

  refreshGraph(torrent: any): void {
    this.gs.log('[TORRENT_WIRE_REFRESH_GRAPH]', torrent);
    if (this.torrentsGraph[torrent.infoHash]) {
      this.deleteAllGraph(torrent);
      this.addAllGraph(torrent);
    } else {
      this.initGraph(torrent);
    }
  }

  refreshAllGraph(): void {
    for (const d of this.dataSource.data) {
      setTimeout(() => {
        this.refreshGraph(d);
      }, 1234);
    }
  }

}
