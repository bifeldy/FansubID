import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-material-expansion-panel',
  templateUrl: './material-expansion-panel.component.html',
  styleUrls: ['./material-expansion-panel.component.css']
})
export class MaterialExpansionPanelComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.gs.onResize(event, 'MATERIAL_EXPANSION_PANEL');
    if (this.gs.isDesktop) {
      this.accordion.openAll();
    } else {
      this.accordion.closeAll();
    }
  };

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
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  get GS(): GlobalService {
    return this.gs;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      //
    }
  }

}
