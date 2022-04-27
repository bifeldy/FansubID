import { Component, OnInit } from '@angular/core';

import { FabService } from '../../services/fab.service';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-material-fab',
  templateUrl: './material-fab.component.html',
  styleUrls: ['./material-fab.component.css']
})
export class MaterialFabComponent implements OnInit {

  constructor(
    private fs: FabService,
    private gs: GlobalService
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

  get isHidden(): boolean {
    return this.fs.isHidden;
  }

  get tooltipText(): string {
    return this.fs.tooltipText;
  }

  get backgroundImage(): string {
    return this.fs.backgroundImage;
  }

  get backgroundIcon(): string {
    return this.fs.backgroundIcon;
  }

  buttonClicked(): void {
    this.fs.buttonClicked();
  }

}
