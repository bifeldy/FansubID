import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    public gs: GlobalService
  ) {
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      //
    }
  }

}
