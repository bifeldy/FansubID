import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { concat, Observable, tap } from 'rxjs';

import { environment } from '../../../../environments/app/environment';

import { CONSTANTS } from '../../../../constants';

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
  subsGenerateLink = null;

  subtitles = [];
  fonts = [];

  selectedSubsUrl = null;

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

  get ENV(): any {
    return environment;
  }

  get GS(): GlobalService {
    return this.gs;
  }

  get AS(): AuthService {
    return this.as;
  }

  get SS(): StatsServerService {
    return this.ss;
  }

  ngOnDestroy(): void {
    this.subsBerkas?.unsubscribe();
    this.subsParam?.unsubscribe();
    this.subsDialog?.unsubscribe();
    this.subsSubtitlesFonts?.unsubscribe();
    this.subsGenerateLink?.unsubscribe();
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
              this.berkasData.name,
              this.berkasData.description,
              this.berkasData.name,
              this.berkasData.image_url,
              this.berkasData.user_.username
            );
            this.pi.updatePageHeader(this.berkasData.project_type_.name);
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
                ...this.activatedRoute.snapshot.queryParams,
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
        ...this.activatedRoute.snapshot.queryParams,
        returnUrl: this.router.url.split('?')[0]
      }
    });
  }

  verify(): void {
    this.router.navigate(['/verify'], {
      queryParams: {
        ...this.activatedRoute.snapshot.queryParams,
        returnUrl: this.router.url.split('?')[0]
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
    return this.ddlUrlLinkVideo(this.berkasData.attachment_.id);
  }

  get videoThumb(): string {
    return this.berkasData.image_url;
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

  get isAwsS3(): boolean {
    return this.isHaveDDL && this.berkasData.attachment_?.aws_s3;
  }

  get isStreamable(): boolean {
    return this.isHaveDDL && this.gs.includesOneOf(this.berkasData.attachment_?.ext, CONSTANTS.fileTypeAttachmentStreamable);
  }

  async generateLink(id): Promise<void> {
    this.bs.busy();
    this.subsGenerateLink = this.dls.generateLink(id).subscribe({
      next: res => {
        this.gs.log('[BERKAS_GENERATE_LINK_SUCCESS]', res);
        this.bs.idle();
        this.subsDialog = this.ds.openInfoDialog({
          data: {
            title: `Tautan Expired :: ${new Date(res.expired)}`,
            htmlMessage: res.ddl,
            confirmText: 'Tutup'
          }
        }).afterClosed().subscribe({
          next: r => {
            this.gs.log('[INFO_DIALOG_CLOSED]', r);
            this.subsDialog.unsubscribe();
          }
        });
      },
      error: err => {
        this.gs.log('[BERKAS_GENERATE_LINK_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  async ddl(id): Promise<void> {
    if (this.isDiscord) {
      // if (this.gs.isDesktop) {
      //   this.subsDialog = (await this.ds.openCorsExtension()).afterClosed().subscribe({
      //     next: re => {
      //       this.gs.log('[INFO_DIALOG_CLOSED]', re);
      //       // TODO :: Create My Own Browser Extension For Bypassing CORS (?)
      //       if (re !== undefined) {
      //         this.dm.startDownload(id, (re === true));
      //       }
      //       this.subsDialog.unsubscribe();
      //     }
      //   });
      // } else {
        this.dm.startDownload(id, false);
      // }
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

  standardDdlVideo(id): void {
    this.wb.winboxOpenUri(this.ddlUrlLinkVideo(id));
  }

  ddlUrlLinkVideo(id): string {
    if (!this.isDiscord) {
      return `${environment.apiUrl}/attachment/${id}?ngsw-bypass=true`;
    }
    return `${environment.apiUrl}/ddl-seek/${id}?ngsw-bypass=true`;
  }

  standardDdlSubsFont(id): void {
    this.wb.winboxOpenUri(this.ddlUrlLinkSubsFont(id));
  }

  ddlUrlLinkSubsFont(id): string {
    return `${environment.apiUrl}/attachment/${id}?ngsw-bypass=true`;
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
                subtitleFiles.push({
                  name: s.name,
                  url: URL.createObjectURL(new Blob([evt.body]))
                });
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
          }
        },
        error: err => {
          this.gs.log('[DOWNLOAD_ERROR]', err, 'error');
        },
        complete: () => {
          this.subtitles = subtitleFiles;
          this.fonts = fontFiles;
          this.vjsReady = true;
        }
      });
    }
  }

  getIconFromUrl(urlPath): string {
    try {
      const domain = new URL(urlPath).host;
      return 'http://www.google.com/s2/favicons?sz=64&domain=' + domain;
    } catch (e) {
      return `${environment.baseUrl}/favicon.ico`;
    }
  }

}
