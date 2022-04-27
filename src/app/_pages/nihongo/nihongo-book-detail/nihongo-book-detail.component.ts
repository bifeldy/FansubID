import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../../_shared/services/global.service';

@Component({
  selector: 'app-nihongo-book-detail',
  templateUrl: './nihongo-book-detail.component.html',
  styleUrls: ['./nihongo-book-detail.component.css']
})
export class NihongoBookDetailComponent implements OnInit {

  constructor(
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  ngOnInit(): void {
    //
  }

}
