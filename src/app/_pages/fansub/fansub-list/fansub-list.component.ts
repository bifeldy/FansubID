import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

import { GlobalService } from '../../../_shared/services/global.service';
import { FabService } from '../../../_shared/services/fab.service';
import { FansubService } from '../../../_shared/services/fansub.service';

@Component({
  selector: 'app-fansub-list',
  templateUrl: './fansub-list.component.html',
  styleUrls: ['./fansub-list.component.css']
})
export class FansubListComponent implements OnInit {

  fansubData = [];

  tabData: any = [
    {
      name: 'Katalog Fansub',
      icon: 'closed_caption',
      type: 'table',
      data: {
        column: ['Status', 'Logo', 'Nama Fansub', 'Total Proyek', 'Tautan Komunitas'],
        row: []
      }
    }
  ];

  chartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'right'
    }
  };
  chartPlugins = [];

  pieChartData: SingleDataSet = [];
  pieChartLabels: Label[] = [];
  barChartData: SingleDataSet = [];
  barChartLabels: Label[] = [];

  pieChartType: ChartType = 'pie';
  barChartType: ChartType = 'horizontalBar';

  fansubActive = 0;
  fansubInActive = 0;

  constructor(
    private router: Router,
    private gs: GlobalService,
    private fs: FabService,
    private fansub: FansubService
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.fansub.getAllFansub().subscribe(
      res => {
        this.gs.log('[FANSUB_LIST_SUCCESS]', res);
        res.results.forEach(r => {
          const tautanLink = [];
          if (Array.isArray(r.urls)) {
            for (const i of r.urls) {
              tautanLink.push({
                type: 'button',
                icon: i.name === 'discord' ? undefined : i.name,
                image: i.name === 'discord' ? '/assets/img/discord-blue.png' : undefined,
                url: i.url,
                name: i.name
              });
            }
          }
          this.fansubData.push({
            id: r.id,
            Logo: r.image_url,
            Status: r.active ? 'AKTIF' : 'TIDAK AKTIF',
            'Nama Fansub': r.name,
            'Total Proyek': '123 Garapan',
            'Tautan Komunitas': tautanLink
          });
          if (r.active) {
            this.fansubActive++;
          } else if (!r.active) {
            this.fansubInActive++;
          }
        });
        this.fansubData.sort((a: any, b: any) => ((a.name > b.name) as any) * 2 - 1);
        this.barChartLabels = ['Fansub A', 'Fansub B', 'Fansub C', 'Fansub D', 'Fansub E', 'Fansub F', 'Fansub G', 'Fansub H', 'Fansub I', 'Fansub J'];
        this.barChartData = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
        this.pieChartLabels = ['Aktif', 'Tidak Aktif'];
        this.pieChartData = [this.fansubActive, this.fansubInActive];
        this.tabData[0].data.row = this.fansubData;
        this.fs.initializeFab('add', null, 'Tambahkan Fansub Baru', '/fansub/add', false);
      },
      err => {
        this.gs.log('[FANSUB_LIST_ERROR]', err);
      }
    );
  }

  openFansub(data): void {
    this.router.navigateByUrl(`/fansub/${data.id}`);
  }

}
