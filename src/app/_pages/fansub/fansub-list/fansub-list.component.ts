import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

import { GlobalService } from '../../../_shared/services/global.service';
import { FabService } from '../../../_shared/services/fab.service';
import { FansubService } from '../../../_shared/services/fansub.service';
import { BusyService } from '../../../_shared/services/busy.service';

@Component({
  selector: 'app-fansub-list',
  templateUrl: './fansub-list.component.html',
  styleUrls: ['./fansub-list.component.css']
})
export class FansubListComponent implements OnInit {

  allFansubId = [];
  fansubData = [];

  tabData: any = [
    {
      name: 'Katalog Fansub',
      icon: 'closed_caption',
      type: 'table',
      data: {
        column: ['Status', 'Logo', 'Nama Fansub', 'Garapan', 'Tautan Komunitas'],
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
    private bs: BusyService,
    private fs: FabService,
    private fansub: FansubService
  ) {
    this.gs.bannerImg = '/assets/img/fansub-banner.png';
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.getFansubData();
  }

  getFansubData(): void {
    this.bs.busy();
    this.fansub.getAllFansub().subscribe(
      res => {
        this.gs.log('[FANSUB_LIST_SUCCESS]', res);
        for (const r of res.results) {
          this.allFansubId.push(r.id);
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
            'Tautan Komunitas': tautanLink
          });
          if (r.active) {
            this.fansubActive++;
          } else if (!r.active) {
            this.fansubInActive++;
          }
        }
        this.getAnimeFansub();
        this.fs.initializeFab('add', null, 'Tambahkan Fansub Baru', '/fansub/create', false);
        this.bs.idle();
      },
      err => {
        this.gs.log('[FANSUB_LIST_ERROR]', err);
        this.bs.idle();
      }
    );
  }

  getAnimeFansub(): void {
    this.bs.busy();
    this.fansub.getAnimeFansub({
      data: window.btoa(JSON.stringify({
        fansubId: this.allFansubId
      }))
    }).subscribe(
      res => {
        this.gs.log('[FANSUB_ANIME_SUCCESS]', res);
        for (const f of this.fansubData) {
          if (res.results[f.id]) {
            f.Garapan = res.results[f.id].length;
          } else {
            f.Garapan = 0;
          }
        }
        this.tabData[0].data.row = this.fansubData;
        const fansubRank = [...this.fansubData].sort((a, b) => b.Garapan - a.Garapan).slice(0, 10);
        for (const f of fansubRank) {
          this.barChartLabels.push(f['Nama Fansub']);
          this.barChartData.push(f.Garapan);
        }
        this.pieChartLabels = ['Fansub Aktif', 'Fansub Tidak Aktif'];
        this.pieChartData = [this.fansubActive, this.fansubInActive];
        this.bs.idle();
      },
      err => {
        this.gs.log('[FANSUB_ANIME_ERROR]', err);
        this.bs.idle();
      }
    );
  }

  openFansub(data): void {
    this.gs.log('[FANSUB_LIST_OPEN_FANSUB]', data);
    this.router.navigateByUrl(`/fansub/${data.id}`);
  }

}
