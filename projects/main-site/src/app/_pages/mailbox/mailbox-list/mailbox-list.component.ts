import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/app/environment';

import { AuthService } from '../../../_shared/services/auth.service';

import { BusyService } from '../../../_shared/services/busy.service';
import { FabService } from '../../../_shared/services/fab.service';
import { GlobalService } from '../../../_shared/services/global.service';
import { MailService } from '../../../_shared/services/mail.service';

@Component({
  selector: 'app-mailbox-list',
  templateUrl: './mailbox-list.component.html',
  styleUrls: ['./mailbox-list.component.css']
})
export class MailboxListComponent implements OnInit, OnDestroy {

  mailData = {
    inbox: {
      column: ['Tanggal', 'Pengirim', 'Topik', 'Lampiran'],
      row: [],
      count: 0
    },
    outbox: {
      column: ['Tanggal', 'Penerima', 'Topik', 'Lampiran'],
      row: [],
      count: 0
    }
  };

  selectedMailBox = 'inbox';

  page = 1;
  row = 10;

  q = '';
  sort = '';
  order = '';

  subsMailbox = null;

  constructor(
    private router: Router,
    private as: AuthService,
    private bs: BusyService,
    private fs: FabService,
    private gs: GlobalService,
    private ms: MailService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  get GS(): GlobalService {
    return this.gs;
  }

  get AS(): AuthService {
    return this.as;
  }

  get ENV(): any {
    return environment;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.getMailbox();
    }
  }

  ngOnDestroy(): void {
    this.subsMailbox?.unsubscribe();
  }

  filterAddress(raw: string) {
    let addr = '';
    if (raw) {
      for (const rw of raw.split(',')) {
        if (addr) {
          addr += ', ';
        }
        if (rw.includes('<') && rw.includes('>')) {
          addr += rw.split('<')[1].split('>')[0].trim();
        } else {
          addr += rw.trim();
        }
      }
    }
    return addr;
  }

  getMailbox(): void {
    this.bs.busy();
    if (this.subsMailbox) {
      this.subsMailbox.unsubscribe();
      this.bs.idle();
    }
    this.subsMailbox = this.ms.getMailbox(this.selectedMailBox, this.q, this.page, this.row, this.sort, this.order).subscribe({
      next: res => {
        this.gs.log('[MAILBOX_LIST_SUCCESS]', res);
        this.mailData[this.selectedMailBox].count = res.count;
        this.mailData[this.selectedMailBox].row = [];
        for (const r of res.results) {
          this.mailData[this.selectedMailBox].row.push({
            id: r.id,
            Tanggal: r.date,
            Pengirim: this.filterAddress(r.from),
            Penerima: this.filterAddress(r.to),
            Topik: r.subject,
            Lampiran: `${r.attachment_count} Berkas`
          });
        }
        this.fs.initializeFab('outgoing_mail', null, 'Buat Email Baru', `/create/mailbox`, false);
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[MAILBOX_LIST_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  changeMailbox(): void {
    this.getMailbox();
  }

  onRowClicked(data): void {
    this.gs.log('[MAILBOX_LIST_CLICK_EMAIL]', data);
    this.router.navigateByUrl(`/mailbox/${data.id}`);
  }

  onPaginatorClicked(data): void {
    this.gs.log('[MAILBOX_LIST_CLICK_PAGINATOR]', data);
    this.page = data.pageIndex + 1;
    this.row = data.pageSize;
    this.getMailbox();
  }

  onServerSideFilter(data: any): void {
    this.gs.log('[MAILBOX_LIST_ENTER_FILTER]', data);
    this.q = data;
    this.getMailbox();
  }

  onServerSideOrder(data: any): void {
    this.gs.log('[MAILBOX_LIST_CLICK_ORDER]', data);
    this.q = data.q;
    this.sort = data.active;
    if (this.sort === 'created_at') {
      this.sort = 'date';
    } else if (this.sort === 'title') {
      this.sort = 'subject';
    }
    this.order = data.direction;
    this.getMailbox();
  }

}
