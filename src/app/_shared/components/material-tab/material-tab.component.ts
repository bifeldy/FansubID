import { Component, OnInit, ViewChild, ViewChildren, AfterViewInit, Input } from '@angular/core';
import { MatTabGroup, MatTab } from '@angular/material/tabs';

@Component({
  selector: 'app-material-tab',
  templateUrl: './material-tab.component.html',
  styleUrls: ['./material-tab.component.css']
})
export class MaterialTabComponent implements OnInit, AfterViewInit {

  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  @ViewChild(MatTabGroup) tabGroup;
  @ViewChildren(MatTab) tab;

  selectedIndexTab = 0;
  totalTabsCount = 2;

  gridListBreakpoint = 1;

  @Input() tabData: any = [
    // {
    //   name: 'Nama Tab 1',
    //   icon: 'subject',
    //   type: 'grid', // list & grid
    //   data: [
    //     { title: 'Data Title 01', description: 'Data Description 01' },
    //     { title: 'Data Title 02', description: 'Data Description 02' }
    //   ]
    // },
    // {
    //   name: 'Nama Tab 2',
    //   icon: 'subject',
    //   type: 'table',
    //   data: {
    //     column: ['Tanggal Upload', 'Nama File', 'Pemilik'],
    //     row: [
    //       {
    //         NamaFile: '[FanSub] Berkas Dengan Judul Anime - 01 [BD][1080p].mkv',
    //         Pemilik: 'Bifeldy',
    //         TanggalUpload: '12:34:56 AM JST+9'
    //       },
    //       {
    //         NamaFile: '[FanSub] Berkas Dengan Judul Anime - 02 [BD][1080p].mkv',
    //         Pemilik: 'Bifeldy',
    //         TanggalUpload: '12:34:56 AM JST+9'
    //       },
    //       {
    //         NamaFile: '[FanSub] Berkas Dengan Judul Anime - 03 [BD][1080p].mkv',
    //         Pemilik: 'Bifeldy',
    //         TanggalUpload: '12:34:56 AM JST+9'
    //       },
    //       {
    //         NamaFile: '[FanSub] Berkas Dengan Judul Anime - 04 [BD][1080p].mkv',
    //         Pemilik: 'Bifeldy',
    //         TanggalUpload: '12:34:56 AM JST+9'
    //       },
    //       {
    //         NamaFile: '[FanSub] Berkas Dengan Judul Anime - 05 [BD][1080p].mkv',
    //         Pemilik: 'Bifeldy',
    //         TanggalUpload: '12:34:56 AM JST+9'
    //       }
    //     ]
    //   }
    // }
  ];

  constructor() { }

  ngOnInit(): void {
    this.gridListBreakpoint = (window.innerWidth >= 1400) ? 3 : (window.innerWidth >= 1200) ? 2 : 1;
  }

  onResize(event): void {
    this.gridListBreakpoint = (window.innerWidth >= 1400) ? 3 : (window.innerWidth >= 1200) ? 2 : 1;
  }

  ngAfterViewInit(): void {
    this.totalTabsCount = this.tab.length;
  }

  swipe(eType): void {
    console.log(eType);
    if (eType === this.SWIPE_ACTION.RIGHT && this.selectedIndexTab > 0) {
      this.selectedIndexTab--;
    }
    else if (eType === this.SWIPE_ACTION.LEFT && this.selectedIndexTab < this.totalTabsCount) {
      this.selectedIndexTab++;
    }
  }

  openData(data: any): void {
    console.log(data);
  }

}
