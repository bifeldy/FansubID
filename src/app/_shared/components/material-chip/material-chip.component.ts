import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

  constructor() {
  }

  ngOnInit(): void {
  }

  onChipClicked(data: any): void {
    this.chipClicked.emit(data);
  }

}
