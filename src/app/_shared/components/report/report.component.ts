import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

import User from '../../models/User';
import { LikeAndDislike } from '../../models/LikeAndDislike';

import { GlobalService } from '../../../_shared/services/global.service';
import { AuthService } from '../../services/auth.service';
import { StatsServerService } from '../../services/stats-server.service';
import { ReportService } from '../../services/report.service';
import { BusyService } from '../../services/busy.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit, OnDestroy {

  @Input() report = {
    like: 0,
    dislike: 0
  };

  doughnutChartKetertarikanOptions: ChartOptions = {
    title: {
      display: true,
      text: 'Total Ketertarikan Pengguna'
    },
    responsive: true,
    legend: {
      position: 'right'
    },
  };

  lineChartVisitorOptions: ChartOptions = {
    title: {
      display: true,
      text: 'Riwayat Jumlah Pengunjung'
    },
    responsive: true,
    legend: {
      position: 'right'
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            color: 'rgba(92,92,92,1)'
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            color: 'rgba(92,92,92,1)'
          }
        }
      ]
    }
  };

  barChartUniqueOptions: ChartOptions = {
    title: {
      display: true,
      text: 'Total Kunjungan Unik'
    },
    responsive: true,
    legend: {
      position: 'right'
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            color: 'rgba(92,92,92,1)'
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            color: 'rgba(92,92,92,1)'
          }
        }
      ]
    }
  };

  chartPlugins = [];

  doughnutChartKetertarikanData: SingleDataSet = [];
  doughnutChartKetertarikanLabels: Label[] = [];

  lineChartVisitorData: SingleDataSet = [];
  lineChartVisitorLabels: Label[] = [];

  barChartUniqueData: SingleDataSet = [];
  barChartUniqueLabels: Label[] = [];

  doughnutChartType: ChartType = 'doughnut';
  lineChartType: ChartType = 'line';
  barChartType: ChartType = 'bar';

  reportTrackType = null;
  idSlugUsername = null;

  currentUser: User = null;

  subsUser = null;
  subsGetReport = null;
  subsSetReport = null;

  myReport = null;

  constructor(
    private as: AuthService,
    private router: Router,
    public gs: GlobalService,
    private ss: StatsServerService,
    private rs: ReportService,
    private bs: BusyService
  ) {
    if (this.gs.isBrowser) {
      monkeyPatchChartJsTooltip();
      monkeyPatchChartJsLegend();
    }
  }

  ngOnDestroy(): void {
    if (this.subsUser) {
      this.subsUser.unsubscribe();
    }
    if (this.subsGetReport) {
      this.subsGetReport.unsubscribe();
    }
    if (this.subsSetReport) {
      this.subsSetReport.unsubscribe();
    }
  }

  get LIKE(): string {
    return LikeAndDislike.LIKE;
  }

  get DISLIKE(): string {
    return LikeAndDislike.DISLIKE;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.subsUser = this.as.currentUser.subscribe({ next: user => this.currentUser = user });
      this.reportTrackType = this.router.url.split('/')[1];
      this.idSlugUsername = this.router.url.split('/')[2];
      this.ss.socketEmit('track-get', {
        trackType: this.reportTrackType,
        idSlugUsername: this.idSlugUsername
      }, (response: any) => {
        this.barChartUniqueLabels = ['Alamat IP', 'Akun Pengguna', 'Terverifikasi', 'Belum Verifikasi'];
        this.barChartUniqueData = [response.unique_ip, response.unique_user, response.verified_user, response.un_verified_user];
        this.lineChartVisitorData = [];
        this.lineChartVisitorLabels = [];
        for (const v of response.visitor) {
          this.lineChartVisitorData.push(v.visitor_count ? v.visitor_count : 0);
          this.lineChartVisitorLabels.push(
            new Date(
              new Date(v.visitor_date).getTime() - (new Date(v.visitor_date).getTimezoneOffset() * 60 * 1000)
            ).toISOString().split('T')[0]
          );
        }
      });
      this.getReport();
    }
  }

  login(): void {
    this.router.navigate(['/login'], {
      queryParams: {
        returnUrl: `/${this.reportTrackType}/${this.idSlugUsername}`
      }
    });
  }

  likeOrDislike(like: string): void {
    let tempReport = null;
    if (this.currentUser) {
      if (like === this.myReport?.type) {
        tempReport = null;
      } else {
        tempReport = like;
      }
      this.setReport(tempReport, true);
    }
  }

  setReport(tempReport, refreshReport = false): void {
    this.bs.busy();
    this.rs.setReport(this.reportTrackType, this.idSlugUsername, { likedislike: tempReport }).subscribe({
      next: res => {
        this.gs.log('[LIKE-DISLIKE_SET_REPORT_SUCCESS]', res);
        this.myReport = res.result;
        this.bs.idle();
        if (refreshReport) {
          this.getReport();
        }
      },
      error: err => {
        this.gs.log('[LIKE-DISLIKE_SET_REPORT_ERROR]', err);
        this.bs.idle();
      }
    });
  }

  getReport(): void {
    this.bs.busy();
    this.rs.getReport(this.reportTrackType, this.idSlugUsername).subscribe({
      next: res => {
        this.gs.log('[LIKE-DISLIKE_GET_REPORT_SUCCESS]', res);
        this.doughnutChartKetertarikanLabels = [];
        this.doughnutChartKetertarikanData = [];
        for (const s of res.result.statistics) {
          this.doughnutChartKetertarikanLabels.push(s.type === this.LIKE ? 'Suka' : 'Tidak Suka');
          this.doughnutChartKetertarikanData.push(s.count);
        }
        this.myReport = res.result.myReport;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[LIKE-DISLIKE_GET_REPORT_ERROR]', err);
        this.bs.idle();
      }
    });
  }

}
