import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';

import User from '../../_shared/models/User';

import { GlobalService } from '../../_shared/services/global.service';
import { TorrentService } from '../../_shared/services/torrent.service';
import { DialogService } from '../../_shared/services/dialog.service';
import { AuthService } from '../../_shared/services/auth.service';

@Component({
  selector: 'app-torrent',
  templateUrl: './torrent.component.html',
  styleUrls: ['./torrent.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TorrentComponent implements OnInit, OnDestroy {

  currentUser: User = null;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<any>;

  isProcessing = false;
  magnetHash = null;

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

  constructor(
    public gs: GlobalService,
    public as: AuthService,
    public torrent: TorrentService,
    private toast: ToastrService,
    private ds: DialogService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.torrent.tableDataRow);
    if (this.gs.isBrowser) {
      this.subsUser = this.as.currentUser.subscribe({ next: user => this.currentUser = user });
      this.dataSource.sort = this.sort;
      setTimeout(() => { this.refreshTable(); }, 10000);
      this.reviveTorrent();
    }
  }

  ngOnDestroy(): void {
    this.sort?.sortChange?.unsubscribe();
    this.subsDialog?.unsubscribe();
    this.subsUser?.unsubscribe();
  }

  refreshTable(): void {
    if (this.dataSource) {
      this.dataSource.data = this.torrent.tableDataRow;
    }
  }

  toggleExpanded(row: any): void {
    this.torrent.expandedRow = this.torrent.expandedRow === row ? null : row
    const selectedTorrent = this.torrent.client.get(row.infoHash);
    this.gs.log('[TORRENT_CLICKED]', selectedTorrent as any);
  }

  saveFile(file): void {
    if (file.downloaded / file.length >= 1) {
      file.getBlobURL((err, blobUrl: string) => {
        if (!err) {
          this.gs.log('[TORRENT_FILE_BLOBURL]', blobUrl);
          saveAs(blobUrl, file.name);
        }
      });
    } else {
      this.toast.info('Berkas Sedang Dalam Proses Unduhan!', 'Yah, File Belum Siap!');
    }
  }

  reviveTorrent(): void {
    this.torrent.resurrectFiles(() => {
      this.refreshTable();
    })
  }

  removeTorrent(torrentId): void {
    this.torrent.removeTorrent(torrentId, error => {
      if (!error) {
        this.gs.log('[TORRENT_FILE_REMOVE_SUCCESS]', torrentId);
      }
      this.refreshTable();
    });
  }

  downloadFiles(event: Event): void {
    this.isProcessing = true;
    this.torrent.downloadFiles(this.magnetHash, (error, torrent) => {
      this.refreshTable();
      this.magnetHash = null;
      this.isProcessing = false;
    });
  }

  uploadFiles(userInput: any): void {
    this.gs.log('[TORRENT_SEED_USER_INFORMATION]', userInput);
    this.isProcessing = true;
    this.torrent.uploadFiles(userInput, this.files, (error, torrent) => {
      this.refreshTable();
      this.isProcessing = false;
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
        inputText: `Torrent Dari ${this.currentUser.username}`,
      },
      torrentKomentar: {
        inputLabel: 'Komentar / Deskripsi',
        inputText: 'Didistribusikan menggunakan Hikki WebTorrent!',
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
          } else {
            this.refreshTable();
          }
          this.subsDialog.unsubscribe();
        }
      });
    }
  }

  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  fileBrowseHandler(berkas) {
    this.prepareFilesList(berkas);
  }

  refreshGraph(infoHash: string): void {
    this.torrent.refreshGraph(infoHash);
  }

}
