import { Component, OnInit } from '@angular/core';

// import { RightPanelService } from '../../services/right-panel.service';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css']
})
export class RightPanelComponent implements OnInit {

  constructor(
    // private rps: RightPanelService,
    public gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  ngOnInit(): void {
    // this.rps.sidePanel.toggle();
    // this.rps.sidePanel.open();
    // this.rps.sidePanel.close();
  }

}
