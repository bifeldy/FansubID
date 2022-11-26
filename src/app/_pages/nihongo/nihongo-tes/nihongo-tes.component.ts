import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from '../../../_shared/services/global.service';
import { StatsServerService } from '../../../_shared/services/stats-server.service';
import { ToastService } from '../../../_shared/services/toast.service';

@Component({
  selector: 'app-tes',
  templateUrl: './nihongo-tes.component.html',
  styleUrls: ['./nihongo-tes.component.css']
})
export class NihongoTesComponent implements OnInit {

  constructor(
    private router: Router,
    private toast: ToastService,
    private gs: GlobalService,
    private ss: StatsServerService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  get GS(): GlobalService {
    return this.gs;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      if (!this.ss.mySocket?.id) {
        this.toast.warning('Tidak Dapat Terhubung Melalui Web Socket', 'Gagal Menyambung Ke Jaringan!', null, true);
        this.router.navigateByUrl('/nihongo');
      }
      if (!this.gs.isDarkMode) {
        this.gs.toggleDarkTheme();
      }
    }
  }

}
