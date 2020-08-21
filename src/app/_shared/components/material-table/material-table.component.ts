import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.scss']
})
export class MaterialTableComponent implements OnInit, OnChanges {

  @Input() count = 0;
  @Input() serverSide = false;
  @Output() serverSideFilter = new EventEmitter();

  @Input() tableDataRow: any = [];
  @Input() tableDataColumn: any = [];

  @Output() chipClicked = new EventEmitter();
  @Output() rowClicked = new EventEmitter();
  @Output() paginatorClicked = new EventEmitter();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<any>;
  rippleDisabled = null;

  pageSizeOptions = [10, 25, 50, 100];

  constructor(
    private gs: GlobalService
  ) {
  }

  checkIsArray(data): boolean {
    return Array.isArray(data);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tableDataRow);
    if (!this.serverSide) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    this.rippleDisabled = (window.innerWidth >= 992) ? true : false;
  }

  ngOnChanges(): void {
    if (this.dataSource) {
      this.dataSource.data = this.tableDataRow;
      if (!this.serverSide) {
        this.paginator._changePageSize(this.pageSizeOptions[0]);
        this.paginator.firstPage();
      }
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (!this.serverSide) {
      this.dataSource.filter = filterValue;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    } else {
      this.onServerSideFilter(filterValue);
    }
  }

  onResize(event): void {
    this.gs.log('[ReSize]', event);
    this.rippleDisabled = (window.innerWidth >= 992) ? true : false;
  }

  onServerSideFilter(data: any): void {
    this.serverSideFilter.emit(data);
  }

  onPaginatorClicked(data: any): void {
    this.paginatorClicked.emit(data);
  }

  onRowClicked(data: any): void {
    this.rowClicked.emit(data);
  }

  onChipClicked(data: any): void {
    this.chipClicked.emit(data);
  }

}
