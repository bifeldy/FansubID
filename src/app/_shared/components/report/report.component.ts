import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

import { LikeAndDislikeModel, RoleModel } from '../../../../models/req-res.model';

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

  toggleAllStatsValue = false;

  summary = {
    like: 0,
    dislike: 0,
    unique_ip: 0,
    unique_user: 0,
    verified_user: 0,
    un_verified_user: 0
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

  subsGetReport = null;
  subsSetReport = null;
  subsRouter = null;

  myReport = null;

  constructor(
    private as: AuthService,
    private router: Router,
    private gs: GlobalService,
    private ss: StatsServerService,
    private rs: ReportService,
    private bs: BusyService
  ) {
    if (this.gs.isBrowser) {
      monkeyPatchChartJsTooltip();
      monkeyPatchChartJsLegend();
    }
  }

  get AS(): AuthService {
    return this.as;
  }

  ngOnDestroy(): void {
    this.subsGetReport?.unsubscribe();
    this.subsSetReport?.unsubscribe();
    this.subsRouter?.unsubscribe();
  }

  get LIKE(): string {
    return LikeAndDislikeModel.LIKE;
  }

  get DISLIKE(): string {
    return LikeAndDislikeModel.DISLIKE;
  }

  get SHOWALLSTATS(): boolean {
    return this.toggleAllStatsValue;
  }

  get SHOWALLSTATSVERIFIEDONLY(): boolean {
    const role = this.as.currentUserSubject?.value?.role;
    if (role) {
      return (role === RoleModel.ADMIN || role === RoleModel.MODERATOR || role === RoleModel.FANSUBBER) && this.SHOWALLSTATS;
    }
    return false;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.reloadComponent();
      this.subsRouter = this.router.events.subscribe({
        next: evt => {
          if (evt instanceof NavigationEnd) {
            this.reloadComponent();
          }
        }
      });
    }
  }

  reloadComponent(): void {
    this.reportTrackType = this.router.url.split('?')[0].split('/')[1];
    this.idSlugUsername = this.router.url.split('?')[0].split('/')[2];
    this.ss.socketEmit('track-get', {
      trackType: this.reportTrackType,
      idSlugUsername: this.idSlugUsername
    }, (response: any) => {
      this.gs.log(`[SOCKET_TRACK-GET]`, response);
      this.barChartUniqueLabels = ['Alamat IP', 'Akun Pengguna', 'Terverifikasi', 'Belum Verifikasi'];
      this.barChartUniqueData = [response.unique_ip, response.unique_user, response.verified_user, response.un_verified_user];
      this.summary.unique_ip = response.unique_ip;
      this.summary.unique_user = response.unique_user;
      this.summary.verified_user = response.verified_user;
      this.summary.un_verified_user = response.un_verified_user;
      this.lineChartVisitorData = [];
      this.lineChartVisitorLabels = [];
      for (const v of response.visitor) {
        this.lineChartVisitorData.push(v.visitor_count || 0);
        this.lineChartVisitorLabels.push(
          new Date(
            new Date(v.visitor_date).getTime() - (new Date(v.visitor_date).getTimezoneOffset() * 60 * 1000)
          ).toISOString().split('T')[0]
        );
      }
    });
    this.getReport();
  }

  toggleAllStats(): void {
    this.toggleAllStatsValue = !this.toggleAllStatsValue;
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
    if (this.as.currentUserSubject?.value) {
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
        this.gs.log('[LIKE-DISLIKE_SET_REPORT_ERROR]', err, 'error');
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
        this.summary.like = 0;
        this.summary.dislike = 0;
        for (const s of res.result.statistics) {
          if (s.type === this.LIKE) {
            this.doughnutChartKetertarikanLabels.push('Suka');
            this.summary.like = s.count;
          } else {
            this.doughnutChartKetertarikanLabels.push('Tidak Suka');
            this.summary.dislike = s.count;
          }
          this.doughnutChartKetertarikanData.push(s.count);
        }
        this.myReport = res.result.myReport;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[LIKE-DISLIKE_GET_REPORT_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

}
