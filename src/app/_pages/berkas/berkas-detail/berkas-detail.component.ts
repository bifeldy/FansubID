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
import { WinboxService } from '../../../_shared/services/winbox.service';
import { StatsServerService } from '../../../_shared/services/stats-server.service';
import { DialogService } from '../../../_shared/services/dialog.service';

import { environment } from '../../../../environments/app/environment';

@Component({
  selector: 'app-berkas-detail',
  templateUrl: './berkas-detail.component.html',
  styleUrls: ['./berkas-detail.component.css']
})
export class BerkasDetailComponent implements OnInit, OnDestroy {

  berkasId = '';
  berkasData = null;

  subsBerkas = null;
  subsParam = null;
  subsDialog = null;

  subtitles = [];
  fonts = [];

  vjsInit = false;
  vjsReady = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private gs: GlobalService,
    private bs: BusyService,
    private ds: DialogService,
    private pi: PageInfoService,
    private berkas: BerkasService,
    private fs: FabService,
    private vjs: VjsService,
    private as: AuthService,
    private dm: DownloadManagerService,
    private wb: WinboxService,
    private ss: StatsServerService
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

  get SS(): StatsServerService {
    return this.ss;
  }

  ngOnDestroy(): void {
    this.subsBerkas?.unsubscribe();
    this.subsParam?.unsubscribe();
    this.subsDialog?.unsubscribe();
  }

  ngOnInit(): void {
    this.subsParam = this.activatedRoute.params.subscribe({
      next: p => {
        this.berkasId = p['berkasId'];
        this.bs.busy();
        this.subsBerkas = this.berkas.getBerkas(this.berkasId).subscribe({
          next: res => {
            this.gs.log('[BERKAS_DETAIL_SUCCESS]', res);
            this.berkasData = res.result;
            this.pi.updatePageMetaData(
              `${this.berkasData.name}`,
              `${this.berkasData.description}`,
              `${this.berkasData.name}`,
              this.berkasData.image_url,
              this.berkasData.user_.username
            );
            this.bs.idle();
            if (this.gs.isBrowser) {
              this.fs.initializeFab('edit', null, 'Ubah Data Berkas', `/berkas/${this.berkasId}/edit`, false);
            }
          },
          error: err => {
            this.gs.log('[BERKAS_DETAIL_ERROR]', err, 'error');
            this.bs.idle();
            this.router.navigate(['/error'], {
              queryParams: {
                returnUrl: '/berkas'
              }
            });
          }
        });
      }
    });
  }

  watchDdl(): void {
    this.vjsInit = true;
    this.setupVjs();
  }

  login(): void {
    this.router.navigate(['/login'], {
      queryParams: {
        returnUrl: this.router.url
      }
    });
  }

  verify(): void {
    this.router.navigate(['/verify'], {
      queryParams: {
        returnUrl: this.router.url
      }
    });
  }

  get animeName(): string {
    return this.berkasData.anime_.name.replace(/[^a-zA-Z0-9]/g, '-');
  }

  get lampiran(): any {
    return this.dm.getAttachmentDownloadFile(this.berkasData.attachment_);
  }

  async ddl(id): Promise<void> {
    this.subsDialog = (await this.ds.openKonfirmasiDialog(
      `Ekstensi CORS Unblock`,
      `
        Jika Gagal Download, Silahkan Pasang Ekstensi CORS Unblock, Kemudian Nyalakan, Dan Download Ulang.
        Lalu Saat Setelah Selesai, Dapat Dimatikan Kembali.
        Keuntungan Menggunakan Ekstensi Ini Yaitu Tanpa Adanya Batasan Kecepatan Server.
        <br />
        Chrome ::
        <br />
        <a href="https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino" target="_blank">
          https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino
        </a>
        <br />
        <br />
        Firefox ::
        <br />
        <a href="https://addons.mozilla.org/en-US/firefox/addon/cors-unblock" target="_blank">
          https://addons.mozilla.org/en-US/firefox/addon/cors-unblock
        </a>
      `
    )).afterClosed().subscribe({
      next: re => {
        this.gs.log('[INFO_DIALOG_CLOSED]', re);
        // TODO :: Create Chrome / Firefox Extension
        if (re === true) {
          // r.url -> Direct Download, Need Bypass CORS Discord
          this.dm.startDownload(id, true);
        } else if (re === false) {
          // r.id -> Send To Server (Download Proxy, Bypass CORS)
          // this.dm.startDownload(id, false);
        }
        this.subsDialog.unsubscribe();
      }
    });
  }

  cancel_dl(id): void {
    this.dm.cancelDownload(id);
  }

  saveFileAs(id): void {
    this.dm.saveFileAs(id);
  }

  standardDdl(id): void {
    this.wb.winboxOpenUri(this.ddlUrlLink(id));
  }

  ddlUrlLink(id): string {
    return `${environment.apiUrl}/attachment/${id}?ngsw-bypass=true`;
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

  get isHaveDDL(): boolean {
    return typeof (this.berkasData.attachment_) !== 'string';
  }

  get isGDrive(): boolean {
    return this.isHaveDDL && this.berkasData.attachment_.google_drive;
  }

  get isDiscord(): boolean {
    return this.isHaveDDL && this.berkasData.attachment_.discord;
  }

  setupVjs(): void {
    if ('attachment_' in this.berkasData && this.berkasData.attachment_) {
      if (this.isHaveDDL) {
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
    }
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
