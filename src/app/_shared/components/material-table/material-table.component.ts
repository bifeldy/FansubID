import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.scss']
})
export class MaterialTableComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() count = 0;
  @Input() serverSide = false;
  @Output() serverSideFilter = new EventEmitter();
  @Output() serverSideOrder = new EventEmitter();

  @Input() tableDataRow: any = [];
  @Input() tableDataColumn: any = [];

  @Output() chipClicked = new EventEmitter();
  @Output() buttonClicked = new EventEmitter();
  @Output() rowClicked = new EventEmitter();
  @Output() paginatorClicked = new EventEmitter();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<any>;

  pageSizeOptions = [10, 25, 50, 75, 100];

  searchQuery = '';

  constructor(
    public gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  checkIsArray(data): boolean {
    return Array.isArray(data);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tableDataRow);
    if (this.gs.isBrowser) {
      if (!this.serverSide) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    }
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

  ngOnDestroy(): void {
    if (this.sort) {
      if (this.sort.sortChange) {
        this.sort.sortChange.unsubscribe();
      }
    }
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe({
      next: (data) => {
        this.paginator.pageIndex = 0;
        this.onServerSideOrder(data);
      }
    });
  }

  applyFilter(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (!this.serverSide) {
      this.dataSource.filter = this.searchQuery;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    } else {
      this.onServerSideFilter(this.searchQuery);
    }
  }

  onServerSideOrder(data: any): void {
    if (!data.direction) {
      data.active = '';
    } else {
      if (data.active.toUpperCase() === 'NAMA BERKAS') {
        data.active = 'name';
      } else if (data.active.toUpperCase() === 'TANGGAL') {
        data.active = 'created_at';
      } else if (data.active.toUpperCase() === 'TOPIK' || data.active.toUpperCase() === 'JUDUL') {
        data.active = 'title';
      } else if (data.active.toUpperCase() === 'KONTEN') {
        data.active = 'content';
      } else if (data.active.toUpperCase() === 'DEADLINE') {
        data.active = 'deadline';
      } else if (data.active.toUpperCase() === 'ID') {
        data.active = 'id';
      } else if (data.active.toUpperCase() === 'ALASAN') {
        data.active = 'reason';
      } else {
        data.active = '';
        data.direction = '';
      }
    }
    this.serverSideOrder.emit({
      q: this.searchQuery,
      ...data
    });
  }

  onServerSideFilter(data: any): void {
    this.serverSideFilter.emit(data);
    this.paginator.firstPage();
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

  onButtonClicked(data: any): void {
    this.buttonClicked.emit(data);
  }

}
