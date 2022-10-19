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

  page = 1;
  pageFinished = false;

  subsDns = null;
  subsTutorial = null;

  constructor(
    private gs: GlobalService,
    private fansub: FansubService,
    private info: InformationService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
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
    this.subsDns = this.fansub.getAllSubDomain('', this.page).subscribe({
      next: res => {
        this.gs.log('[DNSS_LIST_SUCCESS]', res);
        const records = [];
        for (const rec of res.results) {
          if (this.gs.includesOneOf(rec.content, ['dv.googlehosted.com', 'verify.bing.com'])) {
            continue;
          }
          records.push(rec);
        }
        this.dnsData = [...this.dnsData, ...records];
        if (res.results.length <= 0) {
          this.pageFinished = true;
        }
      },
      error: err => {
        this.gs.log('[DNSS_LIST_ERROR]', err, 'error');
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
        this.gs.log('[TUTORIAL_INFORMATION_ERROR]', err, 'error');
      }
    });
  }

  loadNextPage(): void {
    if (!this.pageFinished) {
      this.page++;
      this.getDns();
    }
  }

}
