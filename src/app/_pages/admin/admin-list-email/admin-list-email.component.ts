import { Component, OnDestroy, OnInit } from '@angular/core';

import { BusyService } from '../../../_shared/services/busy.service';
import { DialogService } from '../../../_shared/services/dialog.service';
import { GlobalService } from '../../../_shared/services/global.service';
import { MailService } from '../../../_shared/services/mail.service';

@Component({
  selector: 'app-admin-list-email',
  templateUrl: './admin-list-email.component.html',
  styleUrls: ['./admin-list-email.component.css']
})
export class AdminListEmailComponent implements OnInit, OnDestroy {

  subsAllMail = null;
  subsDialog = null;
  subsMail = null;

  count = 0;
  page = 1;
  row = 10;

  q = '';
  sort = '';
  order = '';

  mailData = {
    column: ['Tanggal', 'Pengirim', 'Penerima', 'Topik', 'Lampiran'],
    row: []
  };

  constructor(
    private bs: BusyService,
    private gs: GlobalService,
    private ms: MailService,
    private ds: DialogService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.getAllMail();
    }
  }

  ngOnDestroy(): void {
    this.subsAllMail?.unsubscribe();
    this.subsDialog?.unsubscribe();
    this.subsMail?.unsubscribe();
  }

  getFromTo(fromRaw: any, toRaw: any): any {
    let from = '';
    for (const fr of fromRaw.split(',')) {
      if (from) {
        from += ', ';
      }
      if (fr.includes('<') && fr.includes('>')) {
        from += fr.split('<')[1].split('>')[0].trim();
      } else {
        from += fr.trim();
      }
    }
    let to = '';
    for (const tr of toRaw.split(',')) {
      if (to) {
        to += ', ';
      }
      if (tr.includes('<') && tr.includes('>')) {
        to += tr.split('<')[1].split('>')[0].trim();
      } else {
        to += tr.trim();
      }
    }
    return { from, to };
  }

  getAllMail(): void {
    this.bs.busy();
    if (this.subsMail) {
      this.subsMail.unsubscribe();
      this.bs.idle();
    }
    this.subsAllMail = this.ms.getAllMail(this.q, this.page, this.row, this.sort, this.order).subscribe({
      next: res => {
        this.gs.log('[MAIL_LIST_SUCCESS]', res);
        this.count = res.count;
        this.mailData.row = [];
        for (const r of res.results) {
          const fromTo = this.getFromTo(r.from, r.to);
          this.mailData.row.push({
            id: r.id,
            Tanggal: r.date,
            Pengirim: fromTo.from,
            Penerima: fromTo.to,
            Topik: r.subject,
            Lampiran: `${r.attachment_count} Berkas`
          });
        }
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[MAIL_LIST_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  getMail(mailId: string): void {
    this.subsMail = this.ms.getMail(mailId).subscribe({
      next: res => {
        this.gs.log('[MAIL_DETAIL_SUCCESS]', res);
        this.bs.idle();
        const fromTo = this.getFromTo(res.result.from, res.result.to);
        this.subsDialog = this.ds.openInfoDialog({
          data: {
            title: res.result.id,
            htmlMessage: `
              From: ${fromTo.from}
              <br />
              To: ${fromTo.to}
              <br /> <br />
              Subject: ${res.result.subject}
              <br />
              Date: ${new Date(res.result.date)}
              <hr class="my-3">
              ${res.result.html || res.result.text}
            `,
            confirmText: 'Tutup',
            infoText: res.result.id
          },
          disableClose: false
        }).afterClosed().subscribe({
          next: r => {
            this.gs.log('[INFO_DIALOG_CLOSED]', r);
            this.subsDialog.unsubscribe();
          }
        });
      },
      error: err => {
        this.gs.log('[MAIL_DETAIL_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  onRowClicked(data): void {
    this.gs.log('[MAIL_LIST_CLICK_EMAIL]', data);
    this.getMail(data.id);
  }

  onPaginatorClicked(data): void {
    this.gs.log('[MAIL_LIST_CLICK_PAGINATOR]', data);
    this.page = data.pageIndex + 1;
    this.row = data.pageSize;
    this.getAllMail();
  }

  onServerSideFilter(data: any): void {
    this.gs.log('[MAIL_LIST_ENTER_FILTER]', data);
    this.q = data;
    this.getAllMail();
  }

  onServerSideOrder(data: any): void {
    this.gs.log('[MAIL_LIST_CLICK_ORDER]', data);
    this.q = data.q;
    this.sort = data.active;
    this.order = data.direction;
    this.getAllMail();
  }

}
