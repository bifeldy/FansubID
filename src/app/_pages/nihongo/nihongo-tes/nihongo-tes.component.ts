import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { GlobalService } from '../../../_shared/services/global.service';
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
    private ss: StatsServerService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  get GS(): GlobalService {
    return this.gs;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      if (!this.ss.mySocket?.id) {
        this.toast.warning('Tidak dapat terhubung melalui socket', 'Whoops!');
        this.router.navigateByUrl('/nihongo');
      }
    }
  }

}
