import { Component, OnDestroy, OnInit } from '@angular/core';

import { environment } from '../../../environments/app/environment';
import { BusyService } from '../../_shared/services/busy.service';
import { GlobalService } from '../../_shared/services/global.service';

import { InformationService } from '../../_shared/services/information.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit, OnDestroy {

  lastUpdated = new Date();

  htmlContent = `
    <div class="text-center p-5">
      <img src="${environment.baseUrl}/assets/img/logo/privacy-policy.png" class="bifeldy-vh-25" />
    </div>
    <div class="text-start pb-5">
      <h1 class="gradient-text">Privacy Policy</h1>
      <h4 class="text-success">
        Loading ...
      </h4>
    </div>
  `;

  subsPrivacyPolicy = null;

  constructor(
    private bs: BusyService,
    private gs: GlobalService,
    private info: InformationService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit(): void {
    this.bs.busy();
    this.subsPrivacyPolicy = this.info.getInfo('PRIVACY-POLICY').subscribe({
      next: res => {
        this.gs.log('[PRIVACY_POLICY_SUCCESS]', res);
        this.bs.idle();
        this.htmlContent = res.result.content;
        this.lastUpdated = new Date(res.result.updated_at);
      },
      error: err => {
        this.gs.log('[PRIVACY_POLICY_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  ngOnDestroy(): void {
    this.subsPrivacyPolicy?.unsubscribe();
  }

}
