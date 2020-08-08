import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.scss']
})
export class MaterialTableComponent implements OnInit, OnChanges {

  @Input() tableDataRow: any = [];
  @Input() tableDataColumn: any = [];

  @Output() chipClicked = new EventEmitter();
  @Output() rowClicked = new EventEmitter();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<any>;
  rippleDisabled = null;

  pageSizeOptions = [10, 25, 50, 100, 250, 500];

  constructor() {
  }

  checkIsArray(data): boolean {
    return Array.isArray(data);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tableDataRow);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.rippleDisabled = (window.innerWidth >= 992) ? true : false;
  }

  ngOnChanges(): void {
    if (this.dataSource) {
      this.dataSource.data = this.tableDataRow;
      this.paginator._changePageSize(this.pageSizeOptions[0]);
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onResize(event): void {
    this.rippleDisabled = (window.innerWidth >= 992) ? true : false;
  }

  onRowClicked(data: any): void {
    this.rowClicked.emit(data);
  }

  onChipClicked(data: any): void {
    this.chipClicked.emit(data);
  }

}
