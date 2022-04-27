import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../../_shared/services/global.service';

@Component({
  selector: 'app-nihongo-chapter-detail',
  templateUrl: './nihongo-chapter-detail.component.html',
  styleUrls: ['./nihongo-chapter-detail.component.css']
})
export class NihongoChapterDetailComponent implements OnInit {

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
