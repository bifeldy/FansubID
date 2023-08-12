import { Component, OnInit } from '@angular/core';

import { environment } from '../../../../environments/app/environment';

import { GlobalService } from '../../../_shared/services/global.service';

@Component({
  selector: 'app-banner-donasi',
  templateUrl: './banner-donasi.component.html',
  styleUrls: ['./banner-donasi.component.css']
})
export class BannerDonasiComponent implements OnInit {

  constructor(
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      //
    }
  }

  get githubUrl(): string {
    return environment.github;
  }

  get saweriaUrl(): string {
    return environment.saweria;
  }

  get trakteerUrl(): string {
    return environment.trakteer;
  }

}
