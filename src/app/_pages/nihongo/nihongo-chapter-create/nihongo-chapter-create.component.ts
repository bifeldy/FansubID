import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../../_shared/services/global.service';

@Component({
  selector: 'app-nihongo-chapter-create',
  templateUrl: './nihongo-chapter-create.component.html',
  styleUrls: ['./nihongo-chapter-create.component.css']
})
export class NihongoChapterCreateComponent implements OnInit {

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
