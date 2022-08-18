import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/app/environment';
import { FansubService } from '../../_shared/services/fansub.service';

import { GlobalService } from '../../_shared/services/global.service';
import { InformationService } from '../../_shared/services/information.service';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css']
})
export class DocsComponent implements OnInit {

  dnsData = [];
  tutorialData = null;

  dnsTotalPages = 1;
  dnsPage = 1;

  subsDns = null;
  subsTutorial = null;

  constructor(
    private gs: GlobalService,
    private fansub: FansubService,
    private info: InformationService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  get ENV(): any {
    return environment;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.getDns();
      this.getTutorial();
    }
  }

  ngOnDestroy(): void {
    this.subsDns?.unsubscribe();
    this.subsTutorial?.unsubscribe();
  }

  getDns(): void {
    this.subsDns = this.fansub.getAllSubDomain('', this.dnsPage).subscribe({
      next: res => {
        this.gs.log('[DNSS_LIST_SUCCESS]', res);
        this.dnsTotalPages = res.pages;
        this.dnsData = res.results;
      },
      error: err => {
        this.gs.log('[DNSS_LIST_ERROR]', err);
      }
    });
  }

  getTutorial(): void {
    this.subsTutorial = this.info.getInfo('TUTORIAL-SUB-DOMAIN').subscribe({
      next: res => {
        this.gs.log('[TUTORIAL_INFORMATION_SUCCESS]', res);
        this.tutorialData = res.result.content;
      },
      error: err => {
        this.gs.log('[TUTORIAL_INFORMATION_ERROR]', err);
      }
    });
  }

  prevDns(): void {
    this.dnsPage--;
    if (this.dnsPage <= 0) {
      this.dnsPage = 1;
    }
    this.getDns();
  }

  nextDns(): void {
    this.dnsPage++;
    this.getDns();
  }

}
