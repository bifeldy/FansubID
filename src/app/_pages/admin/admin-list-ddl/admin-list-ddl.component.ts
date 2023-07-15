import { Component, OnInit, OnDestroy } from '@angular/core';

import { environment } from '../../../../environments/app/environment';

import { DdlLampiranService } from '../../../_shared/services/ddl-lampiran.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { DialogService } from '../../../_shared/services/dialog.service';
import { GlobalService } from '../../../_shared/services/global.service';

@Component({
  selector: 'app-admin-list-ddl',
  templateUrl: './admin-list-ddl.component.html',
  styleUrls: ['./admin-list-ddl.component.css']
})
export class AdminListDdlComponent implements OnInit, OnDestroy {

  subsAttachmentGet = null;
  subsAttachmentReUpload = null;
  subsDialog = null;

  count = 0;
  page = 1;
  row = 10;

  q = '';
  sort = '';
  order = '';

  attachmentData = {
    column: ['Nama Lampiran', 'Ext', 'Size', 'Mime', 'Tanggal', 'Pemilik', 'Aksi'],
    row: []
  };

  constructor(
    private dls: DdlLampiranService,
    private bs: BusyService,
    private ds: DialogService,
    private gs: GlobalService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.getAttachmentNotUploaded();
    }
  }

  ngOnDestroy(): void {
    this.subsAttachmentGet?.unsubscribe();
    this.subsAttachmentReUpload?.unsubscribe();
    this.subsDialog?.unsubscribe();
  }

  getAttachmentNotUploaded(): void {
    this.bs.busy();
    if (this.subsAttachmentGet) {
      this.subsAttachmentGet.unsubscribe();
      this.bs.idle();
    }
    this.subsAttachmentGet = this.dls.getAttachmentNotUploaded(this.q, this.page, this.row, this.sort, this.order).subscribe({
      next: res => {
        this.gs.log('[LAMPIRAN_PENDING_LIST_SUCCESS]', res);
        this.count = res.count;
        const attachmentDataRow = [];
        for (const r of res.results) {
          attachmentDataRow.push({
            foto: (r.user_?.image_url || r.parent_attachment_?.user_?.image_url || `${environment.baseUrl}/assets/img/favicon.png`),
            pending: r.pending,
            'Nama Lampiran': r.name,
            Ext: r.ext,
            Size: r.size,
            Mime: r.mime,
            Tanggal: r.created_at,
            Pemilik: (r.user_?.username || r.parent_attachment_?.user_?.username || 'SYSTEM'),
            Aksi: (r.pending || r.discord || r.google_drive) ? [] : [
              { type: 'button', icon: 'cloud_upload', name: 'ReUpload', row: r }
            ]
          });
        }
        this.attachmentData.row = attachmentDataRow;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[LAMPIRAN_PENDING_LIST_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  action(data): void {
    this.gs.log('[LAMPIRAN_LIST_CLICK_AKSI]', data);
    if (data.name === 'ReUpload') {
      this.reUpload(data.row);
    }
    // TODO :: Other Action
  }

  async reUpload(data): Promise<void> {
    this.gs.log('[LAMPIRAN_PENDING_LIST_CLICK_REUPLOAD]', data);
    this.subsDialog = (await this.ds.openKonfirmasiDialog(
      'Upload Ulang ?',
      `
        Id: ${data.id} <br />
        Filename: ${data.name}.${data.ext} <br />
        Size: ${data.size} Bytes <br />
        Mime: ${data.mime} <br />
        Pemilik: ${data.user_.username}
      `
    )).afterClosed().subscribe({
      next: re => {
        this.gs.log('[INFO_DIALOG_CLOSED]', re);
        if (re === true) {
          this.bs.busy();
          this.subsAttachmentReUpload = this.dls.reUpload({
            id: data.id
          }).subscribe({
            next: res => {
              this.gs.log('[LAMPIRAN_PENDING_LIST_CLICK_REUPLOAD_SUCCESS]', res);
              this.bs.idle();
              this.getAttachmentNotUploaded();
            },
            error: err => {
              this.gs.log('[LAMPIRAN_PENDING_LIST_CLICK_REUPLOAD_ERROR]', err, 'error');
              this.bs.idle();
              this.getAttachmentNotUploaded();
            }
          });
        } else if (re === false) {
          this.getAttachmentNotUploaded();
        }
        this.subsDialog.unsubscribe();
      }
    });
  }

  onPaginatorClicked(data): void {
    this.gs.log('[LAMPIRAN_PENDING_LIST_CLICK_PAGINATOR]', data);
    this.page = data.pageIndex + 1;
    this.row = data.pageSize;
    this.getAttachmentNotUploaded();
  }

  onServerSideFilter(data: any): void {
    this.gs.log('[LAMPIRAN_PENDING_LIST_ENTER_FILTER]', data);
    this.q = data;
    this.getAttachmentNotUploaded();
  }

  onServerSideOrder(data: any): void {
    this.gs.log('[LAMPIRAN_PENDING_LIST_CLICK_ORDER]', data);
    this.q = data.q;
    this.sort = data.active;
    this.order = data.direction;
    this.getAttachmentNotUploaded();
  }

}
