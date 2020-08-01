import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.scss']
})
export class MaterialTableComponent implements OnInit {

  @Input() tableDataRow: any;
  @Input() tableDataColumn: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<any>;
  rippleDisabled = null;

  constructor() {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tableDataRow);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.rippleDisabled = (window.innerWidth >= 992) ? true : false;
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

  openData(data: any): void {
    console.log(data);
  }

}
