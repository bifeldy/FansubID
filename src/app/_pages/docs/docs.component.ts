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

  cnameData = [];
  tutorialData = null;

  cnamePage = 1;

  subsCname = null;
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
      this.getCname();
      this.getTutorial();
    }
  }

  ngOnDestroy(): void {
    this.subsCname?.unsubscribe();
    this.subsTutorial?.unsubscribe();
  }

  getCname(): void {
    this.subsCname = this.fansub.getAllSubDomain('', this.cnamePage).subscribe({
      next: res => {
        this.gs.log('[CNAMES_LIST_SUCCESS]', res);
        this.cnameData = res.results;
      },
      error: err => {
        this.gs.log('[CNAMES_LIST_ERROR]', err);
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

  prevCname(): void {
    this.cnamePage--;
    if (this.cnamePage <= 0) {
      this.cnamePage = 1;
    }
    this.getCname();
  }

  nextCname(): void {
    this.cnamePage++;
    this.getCname();
  }

}
