import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from '../../../../environments/app/environment';

import { BusyService } from '../../../_shared/services/busy.service';
import { FabService } from '../../../_shared/services/fab.service';
import { GlobalService } from '../../../_shared/services/global.service';
import { MailService } from '../../../_shared/services/mail.service';
import { WinboxService } from '../../../_shared/services/winbox.service';

@Component({
  selector: 'app-mailbox-detail',
  templateUrl: './mailbox-detail.component.html',
  styleUrls: ['./mailbox-detail.component.css']
})
export class MailboxDetailComponent implements OnInit, OnDestroy {

  mailId = '';
  mailData = null;

  subsParam = null;
  subsMail = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bs: BusyService,
    private fs: FabService,
    private gs: GlobalService,
    private ms: MailService,
    private wb: WinboxService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.getMail();
    }
  }

  ngOnDestroy(): void {
    this.subsParam?.unsubscribe();
    this.subsMail?.unsubscribe();
  }

  getMail(): void {
    this.subsParam = this.activatedRoute.params.subscribe({
      next: p => {
        this.mailId = p['mailId'];
        this.bs.busy();
        if (this.subsMail) {
          this.subsMail.unsubscribe();
          this.bs.idle();
        }
        this.subsMail = this.ms.getMail(this.mailId).subscribe({
          next: res => {
            this.gs.log('[MAIL_DETAIL_SUCCESS]', res);
            this.mailData = res.result;
            this.fs.initializeFab('outgoing_mail', null, 'Balas Email', `/create/mailbox`, false);
            this.bs.idle();
          },
          error: err => {
            this.gs.log('[MAIL_DETAIL_ERROR]', err, 'error');
            this.bs.idle();
            this.router.navigateByUrl('/mailbox');
          }
        });
      }
    });
  }

  downloadAttachment(attachmentId): void {
    this.wb.winboxOpenUri(this.ddlUrlLink(attachmentId));
  }

  ddlUrlLink(id): string {
    return `${environment.apiUrl}/attachment/${id}?ngsw-bypass=true`;
  }

}
