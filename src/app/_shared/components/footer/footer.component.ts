import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../services/global.service';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    public gs: GlobalService,
    public gh: GithubService
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
