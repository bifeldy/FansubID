import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { concat, Observable, tap } from 'rxjs';

import { environment } from '../../../../environments/app/environment';

import { BerkasService } from '../../../_shared/services/berkas.service';
import { GlobalService } from '../../../_shared/services/global.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { FabService } from '../../../_shared/services/fab.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { AuthService } from '../../../_shared/services/auth.service';
import { DownloadManagerService } from '../../../_shared/services/download-manager.service';
import { WinboxService } from '../../../_shared/services/winbox.service';
import { StatsServerService } from '../../../_shared/services/stats-server.service';
import { DialogService } from '../../../_shared/services/dialog.service';
import { DdlLampiranService } from '../../../_shared/services/ddl-lampiran.service';

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
  subsSubtitlesFonts = null;

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
    private as: AuthService,
    private dm: DownloadManagerService,
    private wb: WinboxService,
    private ss: StatsServerService,
    private dls: DdlLampiranService
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
    this.subsSubtitlesFonts?.unsubscribe();
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
    if ('attachment_' in this.berkasData && this.berkasData.attachment_) {
      return typeof (this.berkasData.attachment_) !== 'string';
    }
    return false;
  }

  get isDiscord(): boolean {
    return this.isHaveDDL && this.berkasData.attachment_?.discord;
  }

  async ddl(id): Promise<void> {
    if (this.isDiscord) {
      this.subsDialog = (await this.ds.openKonfirmasiDialog(
        `Ekstensi CORS Unblock`,
        `
          <div class="col-12 text-center mb-3">
            <img src="/assets/img/ddl-ext.png" class="w-50" />
          </div>
          <p>
            Jika gagal download, silahkan pasang ekstensi CORS Unblock, kemudian nyalakan (logo icon berwarna menyala), dan download ulang berkasnya.
            Lalu saat setelah selesai, dapat dimatikan kembali (tidak wajib sih, hanya saja nanti takutnya mengganggu saat browsing).
            Keuntungan menggunakan ekstensi yaitu tanpa adanya batasan kecepatan server, yakni koneksi langsung.
          </p>
          <p>
            Chrome ::
            <br />
            <a href="https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino" target="_blank">
              https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino
            </a>
          </p>
          <p>
            Edge ::
            <br />
            <a href="https://microsoftedge.microsoft.com/addons/detail/cors-unblock/hkjklmhkbkdhlgnnfbbcihcajofmjgbh" target="_blank">
              https://microsoftedge.microsoft.com/addons/detail/cors-unblock/hkjklmhkbkdhlgnnfbbcihcajofmjgbh
            </a>
          </p>
          <p>
            Firefox ::
            <br />
            <a href="https://addons.mozilla.org/en-US/firefox/addon/cors-unblock" target="_blank">
              https://addons.mozilla.org/en-US/firefox/addon/cors-unblock
            </a>
          </p>
          <p>
            Klik 'Ya', jika sudah ada ekstensi, atau 'Tidak' jika ingin melanjutkan dengan kecepatan terbatas.
          </p>
        `,
        false
      )).afterClosed().subscribe({
        next: re => {
          this.gs.log('[INFO_DIALOG_CLOSED]', re);
          // TODO :: Create My Own Browser Extension For Bypassing CORS (?)
          if (re !== undefined) {
            this.dm.startDownload(id, (re === true));
          }
          this.subsDialog.unsubscribe();
        }
      });
    } else {
      this.dm.startDownload(id);
    }
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
    if (!this.isDiscord) {
      return `${environment.apiUrl}/attachment/${id}?ngsw-bypass=true`;
    }
    return `${environment.apiUrl}/ddl-file/${id}?ngsw-bypass=true`;
  }

  setupVjs(): void {
    if (this.isHaveDDL) {
      const handlers: Observable<any>[] = [];
      const subtitleFiles = [];
      const fontFiles = [];
      if ('subtitles_' in this.berkasData.attachment_ && this.berkasData.attachment_.subtitles_) {
        for (const s of this.berkasData.attachment_.subtitles_) {
          const handler = this.dls.downloadLampiran(s.id).pipe(
            tap(evt => {
              if (evt.type === HttpEventType.Response) {
                this.gs.log('[DOWNLOAD_COMPLETED]', evt);
                subtitleFiles.push(URL.createObjectURL(new Blob([evt.body])));
              }
            })
          );
          handlers.push(handler);
        }
      }
      if ('fonts_' in this.berkasData.attachment_ && this.berkasData.attachment_.fonts_) {
        for (const f of this.berkasData.attachment_.fonts_) {
          const handler = this.dls.downloadLampiran(f.id).pipe(
            tap(evt => {
              if (evt.type === HttpEventType.Response) {
                this.gs.log('[DOWNLOAD_COMPLETED]', evt);
                fontFiles.push(URL.createObjectURL(new Blob([evt.body])));
              }
            })
          );
          handlers.push(handler);
        }
      }
      this.subsSubtitlesFonts = concat(...handlers).subscribe({
        next: evt => {
          if (evt.type === HttpEventType.DownloadProgress) {
            this.gs.log('[DOWNLOAD_PROGRESS]', evt);
          }
          if (evt.type === HttpEventType.Response) {
            this.gs.log('[DOWNLOAD_COMPLETED]', evt);
            this.subtitles = subtitleFiles;
            this.fonts = fontFiles;
            this.vjsReady = true;
          }
        },
        error: err => {
          this.gs.log('[DOWNLOAD_ERROR]', err);
        }
      });
    }
  }

}
