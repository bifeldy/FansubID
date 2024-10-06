import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from '../../../../environments/app/environment';

import { GlobalService } from '../../../_shared/services/global.service';
import { TicketService } from '../../../_shared/services/ticket.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { DialogService } from '../../../_shared/services/dialog.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit, OnDestroy {

  ticketId = 0;
  ticketSecret = '';
  ticketData = null;

  subsActRoute = null;
  subsTicket = null;
  subsParam = null;
  subsDialog = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bs: BusyService,
    private gs: GlobalService,
    private pi: PageInfoService,
    private ticket: TicketService,
    private ds: DialogService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnDestroy(): void {
    this.subsActRoute?.unsubscribe();
    this.subsTicket?.unsubscribe();
    this.subsParam?.unsubscribe();
    this.subsDialog?.unsubscribe();
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.ticketId = Number(this.activatedRoute.snapshot.paramMap.get('ticketId') || '');
      this.ticketSecret = this.activatedRoute.snapshot.queryParamMap.get('secret') || '';
      this.promptSecret();
    }
  }

  promptSecret(): void {
    this.subsDialog = this.ds.openInputDialog({
      data: {
        title: 'Masukkan Kata Sandi Secret Key',
        input: {
          secret: {
            inputLabel: 'Secret',
            inputPlaceholder: environment.apiKey,
            inputValue: this.ticketSecret,
            inputRequired: true
          }
        },
        confirmText: 'OK'
      }
    }).afterClosed().subscribe({
      next: re => {
        this.gs.log('[INPUT_DIALOG_CLOSED]', re);
        if (re) {
          this.ticketSecret = re.secret;
        }
        this.getTicket();
        this.subsDialog.unsubscribe();
      }
    });
  }

  getTicket(): void {
    this.bs.busy();
    this.subsTicket = this.ticket.getTicket(this.ticketId, this.ticketSecret).subscribe({
      next: res => {
        this.gs.log('[TICKET_DETAIL_SUCCESS]', res);
        this.ticketData = res.result;
        this.pi.updatePageMetaData(
          `Ticket #${this.ticketData.id}`,
          this.ticketData.reported_issue,
          this.ticketData.url
        );
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[TICKET_DETAIL_ERROR]', err, 'error');
        this.bs.idle();
        this.router.navigate(['/error'], {
          queryParams: {
            ...this.activatedRoute.snapshot.queryParams,
            returnUrl: '/ticket'
          }
        });
      }
    });
  }

}
