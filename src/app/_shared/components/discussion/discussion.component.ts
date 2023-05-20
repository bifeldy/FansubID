import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit {

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
