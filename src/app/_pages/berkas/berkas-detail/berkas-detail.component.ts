import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BerkasService } from '../../../_shared/services/berkas.service';
import { GlobalService } from '../../../_shared/services/global.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { FabService } from '../../../_shared/services/fab.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { AuthService } from '../../../_shared/services/auth.service';
import { DownloadManagerService } from '../../../_shared/services/download-manager.service';

import User from '../../../_shared/models/User';

@Component({
  selector: 'app-berkas-detail',
  templateUrl: './berkas-detail.component.html',
  styleUrls: ['./berkas-detail.component.css']
})
export class BerkasDetailComponent implements OnInit {

  berkasId = 0;
  berkasData = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private gs: GlobalService,
    private bs: BusyService,
    private pi: PageInfoService,
    private berkas: BerkasService,
    private fs: FabService,
    public as: AuthService,
    public dm: DownloadManagerService
  ) {
  }

  get currentUser(): User {
    return this.as.currentUserValue;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.berkasId = params.berkasId;
      this.bs.busy();
      this.berkas.getBerkas(this.berkasId).subscribe(
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
          this.fs.initializeFab('edit', null, 'Ubah Data Berkas', `/berkas/${this.berkasId}/edit`, false);
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

  ddl(): void {
    this.dm.startDownload(this.berkasData.attachment_.id);
  }

  cancel_dl(): void {
    this.dm.cancelDownload(this.berkasData.attachment_.id);
  }

  saveFileAs(): void {
    this.dm.saveFileAs(this.berkasData.attachment_.id);
  }

}
