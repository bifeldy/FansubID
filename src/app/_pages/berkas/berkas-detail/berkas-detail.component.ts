import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BerkasService } from '../../../_shared/services/berkas.service';
import { GlobalService } from '../../../_shared/services/global.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { FabService } from '../../../_shared/services/fab.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { AuthService } from '../../../_shared/services/auth.service';
import { DownloadManagerService } from '../../../_shared/services/download-manager.service';
import { VjsService } from '../../../_shared/services/vjs.service';

import User from '../../../_shared/models/User';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-berkas-detail',
  templateUrl: './berkas-detail.component.html',
  styleUrls: ['./berkas-detail.component.css']
})
export class BerkasDetailComponent implements OnInit, OnDestroy {

  currentUser: User = null;

  berkasId = 0;
  berkasData = null;

  subsUser = null;
  subsParam = null;
  subsBerkas = null;

  subtitles = [];
  fonts = [];

  vjsReady = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public gs: GlobalService,
    private bs: BusyService,
    private pi: PageInfoService,
    private berkas: BerkasService,
    private fs: FabService,
    public vjs: VjsService,
    public as: AuthService,
    public dm: DownloadManagerService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnDestroy(): void {
    if (this.subsUser) {
      this.subsUser.unsubscribe();
    }
    if (this.subsParam) {
      this.subsParam.unsubscribe();
    }
    if (this.subsBerkas) {
      this.subsBerkas.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subsParam = this.activatedRoute.params.subscribe(params => {
      this.berkasId = params.berkasId;
      this.bs.busy();
      this.subsBerkas = this.berkas.getBerkas(this.berkasId).subscribe(
        res => {
          this.gs.log('[BERKAS_DETAIL_SUCCESS]', res);
          this.berkasData = res.result;
          this.pi.updatePageMetaData(
            `${this.berkasData.name}`,
            `${this.berkasData.description}`,
            `${this.berkasData.name}`,
            this.berkasData.image_url
          );
          this.bs.idle();
          if (this.gs.isBrowser) {
            this.fs.initializeFab('edit', null, 'Ubah Data Berkas', `/berkas/${this.berkasId}/edit`, false);
            if ('attachment_' in this.berkasData && this.berkasData.attachment_) {
              if ('subtitles_' in this.berkasData.attachment_ && this.berkasData.attachment_.subtitles_) {
                this.vjs.loadSubtitle(this.berkasData.attachment_.subtitles_, (data) => {
                  this.subtitles = data;
                  this.checkVjs();
                });
              }
              if ('fonts_' in this.berkasData.attachment_ && this.berkasData.attachment_.fonts_) {
                this.vjs.loadFonts(this.berkasData.attachment_.fonts_, (data) => {
                  this.fonts = data;
                  this.checkVjs();
                });
              }
            }
            this.subsUser = this.as.currentUser.subscribe(user => {
              this.currentUser = user;
            });
          }
        },
        err => {
          this.gs.log('[BERKAS_DETAIL_ERROR]', err);
          this.bs.idle();
          this.router.navigate(['/error'], {
            queryParams: {
              returnUrl: '/'
            }
          });
        }
      );
    });
  }

  login(): void {
    this.router.navigate(['/login'], {
      queryParams: {
        returnUrl: `/berkas/${this.berkasId}`
      }
    });
  }

  verify(): void {
    this.router.navigate(['/verify'], {
      queryParams: {
        returnUrl: `/berkas/${this.berkasId}`
      }
    });
  }

  get lampiran(): any {
    return this.dm.getAttachmentDownloadFile(this.berkasData.attachment_);
  }

  ddl(id): void {
    this.dm.startDownload(id);
  }

  cancel_dl(id): void {
    this.dm.cancelDownload(id);
  }

  saveFileAs(id): void {
    this.dm.saveFileAs(id);
  }

  standardDdl(id): void {
    window.open(this.ddlUrlLink(id), '_blank');
  }

  refreshPage(): void {
    window.open(`/login?returnUrl=${this.router.url}`, '_self');
  }

  ddlUrlLink(id): string {
    const ddlApi = `${environment.apiUrl}/attachment`;
    const lampiranId = `?id=${id}`;
    const token = `&token=${localStorage.getItem(environment.tokenName)}`;
    const ddlUrl = ddlApi + lampiranId + token;
    return ddlUrl;
  }

  get ddlVideo(): string {
    return this.ddlUrlLink(this.berkasData.attachment_.id);
  }

  get ddlSubtitles(): string {
    return (this.subtitles.length > 0) ? this.subtitles[0] : '';
  }

  get ddlFonts(): any[] {
    return (this.fonts.length > 0) ? this.fonts : [];
  }

  checkVjs(): void {
    if (this.berkasData && this.berkasData.attachment_) {
      if ('subtitles_' in this.berkasData.attachment_ && 'fonts_' in this.berkasData.attachment_) {
        if (
          this.subtitles.length === this.berkasData.attachment_.subtitles_.length &&
          this.fonts.length === this.berkasData.attachment_.fonts_.length
        ) {
          this.vjsReady = true;
        }
      }
    }
  }

}
