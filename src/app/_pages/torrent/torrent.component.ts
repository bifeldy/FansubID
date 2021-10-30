import { Component, OnInit, ViewChild, OnChanges, OnDestroy } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { GlobalService } from '../../_shared/services/global.service';
import { TorrentService } from '../../_shared/services/torrent.service';

@Component({
  selector: 'app-torrent',
  templateUrl: './torrent.component.html',
  styleUrls: ['./torrent.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TorrentComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<any>;

  expandedElement = null;
  // pageSizeOptions = [10, 25, 50, 75, 100];
  pageSizeOptions = [1, 2, 3];

  searchQuery = '';

  constructor(
    public gs: GlobalService,
    public torrent: TorrentService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.torrent.tableDataRow);
    if (this.gs.isBrowser) {
      this.dataSource.sort = this.sort;
    }
  }

  ngOnChanges(): void {
    if (this.dataSource) {
      this.dataSource.data = this.torrent.tableDataRow;
    }
  }

  ngOnDestroy(): void {
    this.sort?.sortChange?.unsubscribe();
  }

  searchTorrent(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value.trim().toLowerCase();
    // TODO :: Add Torrent Search
  }

  startSeed(): void {
    // TODO :: Seed Torrent
  }

}
