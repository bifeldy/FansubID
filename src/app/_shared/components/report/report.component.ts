import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

import { GlobalService } from '../../../_shared/services/global.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

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

  berkasId = null;
  fansubSlug = null;
  username = null;

  constructor(
    private router: Router,
    public gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      monkeyPatchChartJsTooltip();
      monkeyPatchChartJsLegend();
    }
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      const url = this.router.url;
      if (url.startsWith('/berkas/')) {
        this.berkasId = url.split('/').pop();
      } else if (url.startsWith('/fansub/')) {
        this.fansubSlug = url.split('/').pop();
      } else if (url.startsWith('/user/')) {
        this.username = url.split('/').pop();
      } else {
        // Other Pages That Need Visitor, Like & Dislike
      }
      console.clear();
      console.log(this.berkasId);
      console.log(this.fansubSlug);
      console.log(this.username);
      setTimeout(() => {
        this.doughnutChartKetertarikanData = [2, 4];
        this.doughnutChartKetertarikanLabels = ['Suka', 'Tidak Suka'];
        this.lineChartVisitorData = [1, 3, 2, 6, 4, 7, 5];
        this.lineChartVisitorLabels = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
        this.barChartUniqueData = [1326, 475];
        this.barChartUniqueLabels = ['Alamat IP', 'Akun Pengguna'];
      }, 1234);
    }
  }

}
