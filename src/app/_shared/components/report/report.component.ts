import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

import User from '../../models/User';
import { LikeAndDislike } from '../../models/LikeAndDislike';

import { GlobalService } from '../../../_shared/services/global.service';
import { AuthService } from '../../services/auth.service';
import { StatsServerService } from '../../services/stats-server.service';

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

  trackType = null;
  idSlugUsername = null;

  currentUser: User = null;

  subsUser = null;

  myReport = null;

  constructor(
    private as: AuthService,
    private router: Router,
    public gs: GlobalService,
    private ss: StatsServerService
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
      this.trackType = this.router.url.split('/')[1];
      this.idSlugUsername = this.router.url.split('/')[2];
      this.doughnutChartKetertarikanLabels = ['Suka', 'Tidak Suka'];
      this.doughnutChartKetertarikanData = [this.report.like, this.report.dislike];
      this.ss.socketEmit('track-get', {
        trackType: this.trackType,
        idSlugUsername: this.idSlugUsername
      }, (response: any) => {
        this.barChartUniqueLabels = ['Alamat IP', 'Akun Pengguna'];
        this.barChartUniqueData = [response.uniqueIp, response.uniqueUser];
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
      // TODO :: REPORT
      setTimeout(() => {
        this.doughnutChartKetertarikanData = [12, 34];
      }, 3791);
    }
  }

  login(): void {
    this.router.navigate(['/login'], {
      queryParams: {
        returnUrl: `/${this.trackType}/${this.idSlugUsername}`
      }
    });
  }

  likeOrDislike(like = true): void {
    if (this.currentUser) {
      if (like) {
        this.myReport = this.LIKE;
      } else {
        this.myReport = this.DISLIKE;
      }
    }
  }

}
