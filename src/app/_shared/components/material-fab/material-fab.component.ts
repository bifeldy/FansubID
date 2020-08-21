import { Component, OnInit } from '@angular/core';

import { FabService } from '../../services/fab.service';

@Component({
  selector: 'app-material-fab',
  templateUrl: './material-fab.component.html',
  styleUrls: ['./material-fab.component.css']
})
export class MaterialFabComponent implements OnInit {

  constructor(
    private fs: FabService
  ) {
  }

  ngOnInit(): void {
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
