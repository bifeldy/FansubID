import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BerkasService } from '../../../_shared/services/berkas.service';
import { GlobalService } from '../../../_shared/services/global.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { FabService } from '../../../_shared/services/fab.service';
import { BusyService } from 'src/app/_shared/services/busy.service';

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
    private fs: FabService
  ) { }

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

}
