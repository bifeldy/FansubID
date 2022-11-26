import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { GlobalService } from '../../../_shared/services/global.service';
import { NotificationsService } from '../../../_shared/services/notifications.service';
import { StatsServerService } from '../../../_shared/services/stats-server.service';

@Component({
  selector: 'app-tes',
  templateUrl: './nihongo-tes.component.html',
  styleUrls: ['./nihongo-tes.component.css']
})
export class NihongoTesComponent implements OnInit {

  constructor(
    private router: Router,
    private toast: ToastrService,
    private gs: GlobalService,
    private ss: StatsServerService,
    private notif: NotificationsService
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
        this.toast.warning('Tidak Dapat Terhubung Melalui Web Socket', 'Gagal Menyambung Ke Jaringan!');
        this.notif.addNotif(
          null,
          new Date().getTime(),
          'warning',
          'Gagal Menyambung Ke Jaringan!',
          'Tidak Dapat Terhubung Melalui Web Socket'
        );
        this.router.navigateByUrl('/nihongo');
      }
      if (!this.gs.isDarkMode) {
        this.gs.toggleDarkTheme();
      }
    }
  }

}
