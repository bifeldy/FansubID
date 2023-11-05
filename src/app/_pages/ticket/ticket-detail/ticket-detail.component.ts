import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GlobalService } from '../../../_shared/services/global.service';
import { TicketService } from '../../../_shared/services/ticket.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { BusyService } from '../../../_shared/services/busy.service';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bs: BusyService,
    private gs: GlobalService,
    private pi: PageInfoService,
    private ticket: TicketService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnDestroy(): void {
    this.subsActRoute?.unsubscribe();
    this.subsTicket?.unsubscribe();
    this.subsParam?.unsubscribe();
  }

  ngOnInit(): void {
    this.ticketId = Number(this.activatedRoute.snapshot.paramMap.get('ticketId') || '');
    this.ticketSecret = this.activatedRoute.snapshot.queryParamMap.get('secret') || '';
    this.getTicket();
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
            returnUrl: '/ticket'
          }
        });
      }
    });
  }

}
