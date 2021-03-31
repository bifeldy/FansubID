import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class FansubListComponent implements OnInit, OnDestroy {

  allFansubId = [];
  fansubData = [];

  tabData: any = [
    {
      name: 'Katalog Fansub',
      icon: 'closed_caption',
      type: 'table',
      data: {
        column: ['Status', 'Logo', 'Nama Fansub', 'Anime', 'Dorama', 'Tautan Komunitas'],
        row: []
      }
    }
  ];

  pieChartStatusOptions: ChartOptions = {
    title: {
      display: true,
      text: 'Kondisi Fansub Terkini'
    },
    responsive: true,
    legend: {
      position: 'right'
    },
  };
  doughnutChartGarapanOptions: ChartOptions = {
    title: {
      display: true,
      text: 'Total Garapan Fansub'
    },
    responsive: true,
    legend: {
      position: 'right'
    },
  };

  barChartAnimeOptions: ChartOptions = {
    title: {
      display: true,
      text: 'Garapan Anime Terbanyak'
    },
    responsive: true,
    legend: {
      position: 'right'
    },
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            color: 'rgba(92,92,92,1)'
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            color: 'rgba(92,92,92,1)'
          }
        }
      ]
    }
  };
  barChartDoramaOptions: ChartOptions = {
    title: {
      display: true,
      text: 'Garapan Dorama Terbanyak'
    },
    responsive: true,
    legend: {
      position: 'right'
    },
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            color: 'rgba(92,92,92,1)'
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            color: 'rgba(92,92,92,1)'
          }
        }
      ]
    }
  };

  chartPlugins = [];

  pieChartStatusData: SingleDataSet = [];
  pieChartStatusLabels: Label[] = [];
  doughnutChartGarapanData: SingleDataSet = [];
  doughnutChartGarapanLabels: Label[] = [];
  barChartAnimeData: SingleDataSet = [];
  barChartAnimeLabels: Label[] = [];
  barChartDoramaData: SingleDataSet = [];
  barChartDoramaLabels: Label[] = [];

  pieChartType: ChartType = 'pie';
  doughnutChartType: ChartType = 'doughnut';
  barChartType: ChartType = 'horizontalBar';

  fansubActive = 0;
  fansubInActive = 0;

  fansubBerkasAnime = 0;
  fansubBerkasDorama = 0;

  subsFansub = null;
  subsAnime = null;
  subsDorama = null;

  constructor(
    private router: Router,
    public gs: GlobalService,
    private bs: BusyService,
    private fs: FabService,
    private fansub: FansubService
  ) {
    this.gs.bannerImg = '/assets/img/fansub-banner.png';
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
    if (this.gs.isBrowser) {
      monkeyPatchChartJsTooltip();
      monkeyPatchChartJsLegend();
    }
  }

  ngOnDestroy(): void {
    if (this.subsFansub) {
      this.subsFansub.unsubscribe();
    }
    if (this.subsAnime) {
      this.subsAnime.unsubscribe();
    }
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.getFansubData();
    }
  }

  getFansubData(): void {
    this.bs.busy();
    this.subsFansub = this.fansub.getAllFansub().subscribe({
      next: res => {
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
            slug: r.slug,
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
        this.pieChartStatusLabels = ['Fansub Aktif', 'Fansub Tidak Aktif'];
        this.pieChartStatusData = [this.fansubActive, this.fansubInActive];
        this.getAnimeFansub();
        this.getDoramaFansub();
        this.fs.initializeFab('add', null, 'Tambahkan Fansub Baru', '/fansub/create', false);
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[FANSUB_LIST_ERROR]', err);
        this.bs.idle();
      }
    });
  }

  getAnimeFansub(): void {
    this.bs.busy();
    this.subsAnime = this.fansub.getAnimeFansub(this.allFansubId).subscribe({
      next: res => {
        this.gs.log('[FANSUB_ANIME_SUCCESS]', res);
        for (const f of this.fansubData) {
          if (res.results[f.id]) {
            f.Anime = res.results[f.id].length;
          } else {
            f.Anime = 0;
          }
          this.fansubBerkasAnime += f.Anime;
        }
        this.doughnutChartGarapanLabels.push('Berkas Anime');
        this.doughnutChartGarapanData.push(this.fansubBerkasAnime);
        this.tabData[0].data.row = this.fansubData;
        const fansubRank = [...this.fansubData].sort((a, b) => b.Anime - a.Anime).slice(0, 10);
        for (const f of fansubRank) {
          this.barChartAnimeLabels.push(f['Nama Fansub']);
          this.barChartAnimeData.push(f.Anime);
        }
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[FANSUB_ANIME_ERROR]', err);
        this.bs.idle();
      }
    });
  }

  getDoramaFansub(): void {
    this.bs.busy();
    this.subsDorama = this.fansub.getDoramaFansub(this.allFansubId).subscribe({
      next: res => {
        this.gs.log('[FANSUB_DORAMA_SUCCESS]', res);
        for (const f of this.fansubData) {
          if (res.results[f.id]) {
            f.Dorama = res.results[f.id].length;
          } else {
            f.Dorama = 0;
          }
          this.fansubBerkasDorama += f.Dorama;
        }
        this.doughnutChartGarapanLabels.push('Berkas Dorama');
        this.doughnutChartGarapanData.push(this.fansubBerkasDorama);
        this.tabData[0].data.row = this.fansubData;
        const fansubRank = [...this.fansubData].sort((a, b) => b.Dorama - a.Dorama).slice(0, 10);
        for (const f of fansubRank) {
          this.barChartDoramaLabels.push(f['Nama Fansub']);
          this.barChartDoramaData.push(f.Dorama);
        }
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[FANSUB_DORAMA_ERROR]', err);
        this.bs.idle();
      }
    });
  }

  openFansub(data): void {
    this.gs.log('[FANSUB_LIST_OPEN_FANSUB]', data);
    this.router.navigateByUrl(`/fansub/${data.slug}`);
  }

  openUrl(data): void {
    this.gs.log('[FANSUB_LIST_OPEN_URL]', data);
    window.open(data.url, '_blank');
  }

}
