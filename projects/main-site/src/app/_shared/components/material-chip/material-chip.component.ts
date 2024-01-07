import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-material-chip',
  templateUrl: './material-chip.component.html',
  styleUrls: ['./material-chip.component.css']
})
export class MaterialChipComponent implements OnInit {

  @Input() chipData = [
    // {
    //   name: 'Chip Name',
    //   url: '/',
    //   selected: true,
    //   color: Warna.PINK,
    // }
  ];

  @Output() chipClicked = new EventEmitter();

  constructor(
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

  onChipClicked(data: any): void {
    this.chipClicked.emit(data);
  }

}
