import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../../_shared/services/global.service';

@Component({
  selector: 'app-tes',
  templateUrl: './nihongo-tes.component.html',
  styleUrls: ['./nihongo-tes.component.css']
})
export class NihongoTesComponent implements OnInit {

  constructor(
    public gs: GlobalService,
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

}
