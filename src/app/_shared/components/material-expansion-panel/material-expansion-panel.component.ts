import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-material-expansion-panel',
  templateUrl: './material-expansion-panel.component.html',
  styleUrls: ['./material-expansion-panel.component.css']
})
export class MaterialExpansionPanelComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;

  @Input() panelData = [
    {
      title: 'Title',
      icon: 'warning',
      text: 'Lorem ipsum ...',
      tooltip: 'Info'
    }
  ];

  constructor(
    public gs: GlobalService
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

  onResize(event): void {
    this.gs.log('[WINDOW_RESIZE]', event);
    if (this.gs.isDesktop) {
      this.accordion.openAll();
    }
    else {
      this.accordion.closeAll();
    }
  }

}
