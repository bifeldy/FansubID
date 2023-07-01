import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  urlPath = null;
  searchQuery = '';

  subsQueryParam = null;
  timedOut = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  get GS(): GlobalService {
    return this.gs;
  }

  checkIsArray(data): boolean {
    return Array.isArray(data);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tableDataRow);
    if (this.gs.isBrowser) {
      this.urlPath = this.router.url.split('?')[0];
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
    this.sort?.sortChange?.unsubscribe();
    this.subsQueryParam?.unsubscribe();
    if (this.timedOut) {
      clearTimeout(this.timedOut);
      this.timedOut = null;
    }
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe({
      next: (data) => {
        this.paginator.pageIndex = 0;
        this.onServerSideOrder(data);
      }
    });
    this.timedOut = setTimeout(() => {
      this.searchQuery = this.activatedRoute.snapshot.queryParamMap.get('q') || '';
      this.search();
      this.subsQueryParam = this.activatedRoute.queryParams.subscribe({
        next: qp => {
          this.searchQuery = qp['q'] || '';
          this.search();
        }
      });
    }, 0);
  }

  search(): void {
    if (!this.serverSide) {
      this.dataSource.filter = this.searchQuery;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    } else {
      this.onServerSideFilter(this.searchQuery);
    }
  }

  applyFilter(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.router.navigate([this.urlPath], {
      queryParams: {
        ...this.activatedRoute.snapshot.queryParams,
        q: this.searchQuery
      }
    });
  }

  onServerSideOrder(data: any): void {
    if (!data.direction) {
      data.active = '';
    } else {
      if (data.active.toUpperCase() === 'NAMA BERKAS' || data.active.toUpperCase() === 'NAMA LAMPIRAN' || data.active.toUpperCase() === 'NAMA API') {
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
      } else if (data.active.toUpperCase() === 'IP DOMAIN') {
        data.active = 'ip_domain';
      } else if (data.active.toUpperCase() === 'API KEY') {
        data.active = 'api_key';
      } else if (data.active.toUpperCase() === 'USERNAME') {
        data.active = 'username';
      } else if (data.active.toUpperCase() === 'EMAIL') {
        data.active = 'email';
      } else if (data.active.toUpperCase() === 'ROLE') {
        data.active = 'role';
      } else if (data.active.toUpperCase() === 'KETERANGAN') {
        data.active = 'keterangan';
      } else if (data.active.toUpperCase() === 'EXT') {
        data.active = 'ext';
      } else if (data.active.toUpperCase() === 'SIZE') {
        data.active = 'size';
      } else if (data.active.toUpperCase() === 'MIME') {
        data.active = 'mime';
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
