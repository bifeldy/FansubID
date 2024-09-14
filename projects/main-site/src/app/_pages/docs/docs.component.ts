import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from '../../../environments/app/environment';

import { FansubService } from '../../_shared/services/fansub.service';
import { GlobalService } from '../../_shared/services/global.service';
import { InformationService } from '../../_shared/services/information.service';
import { DialogService } from '../../_shared/services/dialog.service';
import { WinboxService } from '../../_shared/services/winbox.service';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css']
})
export class DocsComponent implements OnInit, OnDestroy {

  url = '';
  dnsData = [];
  tutorialData = null;

  page = 1;
  pageFinished = false;

  subsDns = null;
  subsTutorial = null;
  subsDialog = null;
  subsFansub = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private gs: GlobalService,
    private fansub: FansubService,
    private info: InformationService,
    private ds: DialogService,
    private wb: WinboxService
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
      this.checkUrl();
    }
  }

  ngOnDestroy(): void {
    this.subsDns?.unsubscribe();
    this.subsTutorial?.unsubscribe();
    this.subsDialog?.unsubscribe();
    this.subsFansub?.unsubscribe();
  }

  async checkUrl(): Promise<void> {
    this.url = this.activatedRoute.snapshot.queryParamMap.get('url') || '';
    if (this.url) {
      if (this.url.endsWith('&') || this.url.endsWith('/') || this.url.endsWith('?')) {
        this.url = this.url.substring(0, this.url.length - 1);
      }
      this.url = this.gs.cleanIpOrigin(this.url);
      const domain = `.${environment.domain}`;
      if (this.url.toLowerCase().endsWith(domain)) {
        this.url = this.url.substring(0, this.url.length - domain.length);
      }
      this.subsFansub = this.fansub.getFansub(this.url).subscribe({
        next: async res => {
          this.gs.log('[FANSUB_DETAIL_SUCCESS]', res);
          let fansubUrls: any = (res.result.urls as any);
          if (fansubUrls['web']) {
            this.subsDialog = (await this.ds.openKonfirmasiDialog(
              'Sub-Domain Tidak Aktif',
              `Ingin Mengunjungi Situs ${fansubUrls['web']} ?`
            )).afterClosed().subscribe({
              next: re => {
                this.gs.log('[INFO_DIALOG_CLOSED]', re);
                if (re) {
                  this.wb.winboxOpenUri(fansubUrls['web']);
                }
                this.subsDialog.unsubscribe();
              }
            });
          } else {
            this.subsDialog = (await this.ds.openKonfirmasiDialog(
              'Alamat Website Tidak Tersedia',
              `Ingin Mengunjungi Halaman ${this.url} ?`
            )).afterClosed().subscribe({
              next: re => {
                this.gs.log('[INFO_DIALOG_CLOSED]', re);
                if (re) {
                  this.router.navigateByUrl(`/fansub/${this.url}`);
                }
                this.subsDialog.unsubscribe();
              }
            });
          }
        },
        error: err => {
          this.gs.log('[FANSUB_DETAIL_ERROR]', err, 'error');
        }
      });
    }
  }

  getDns(): void {
    this.subsDns = this.fansub.getAllSubDomain('', this.page).subscribe({
      next: res => {
        this.gs.log('[DNSS_LIST_SUCCESS]', res);
        const records = [];
        for (const rec of res.results) {
          if (rec.fansub_) {
            records.push(rec);
          }
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
