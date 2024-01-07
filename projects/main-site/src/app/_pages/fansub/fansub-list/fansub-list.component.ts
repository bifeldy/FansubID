import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, concat } from 'rxjs';

import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

import { GlobalService } from '../../../_shared/services/global.service';
import { FabService } from '../../../_shared/services/fab.service';
import { FansubService } from '../../../_shared/services/fansub.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { WinboxService } from '../../../_shared/services/winbox.service';

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
    }
  };
  doughnutChartGarapanOptions: ChartOptions = {
    title: {
      display: true,
      text: 'Total Garapan Fansub'
    },
    responsive: true,
    legend: {
      position: 'right'
    }
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

  subsFansub = null;
  subsAnime = null;
  subsDorama = null;
  subsQueryParam = null;
  subsInternetPositif = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private gs: GlobalService,
    private bs: BusyService,
    private fs: FabService,
    private fansub: FansubService,
    private wb: WinboxService
  ) {
    this.gs.bannerImg = '/assets/img/banner/fansub.png';
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
    if (this.gs.isBrowser) {
      monkeyPatchChartJsTooltip();
      monkeyPatchChartJsLegend();
    }
  }

  ngOnDestroy(): void {
    this.subsFansub?.unsubscribe();
    this.subsAnime?.unsubscribe();
    this.subsQueryParam?.unsubscribe();
    this.subsInternetPositif?.unsubscribe();
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.watchUrlRoute();
    }
  }

  watchUrlRoute(): void {
    this.subsQueryParam = this.activatedRoute.queryParams.subscribe({
      next: qp => {
        this.bs.busy();
        this.allFansubId = [];
        this.fansubData = [];
        this.fansubActive = 0;
        this.fansubInActive = 0;
        this.doughnutChartGarapanLabels = [];
        this.doughnutChartGarapanData = [];
        this.barChartAnimeLabels = [];
        this.barChartAnimeData = [];
        this.barChartDoramaLabels = [];
        this.barChartDoramaData = [];
        this.bs.idle();
        this.getFansubData();
      }
    });
  }

  getFansubData(): void {
    this.bs.busy();
    this.subsFansub = this.fansub.getAllFansub().subscribe({
      next: res => {
        this.gs.log('[FANSUB_LIST_SUCCESS]', res);
        for (const r of res.results) {
          this.allFansubId.push(r.id);
          const tautanLink = [];
          const urlCount = Object.keys(r.urls).length;
          if (urlCount > 0) {
            for (const [key, value] of Object.entries(r.urls)) {
              tautanLink.push({
                type: 'button',
                icon: (key === 'discord' || key === 'twitter' ? undefined : key),
                image: (key === 'discord' ? '/assets/img/discord/blue.png' : (key === 'twitter' ? '/assets/img/twitter/blue.png' : undefined)),
                url: value,
                name: key
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
        this.pieChartStatusLabels = ['Aktif', 'Tidak Aktif'];
        this.pieChartStatusData = [this.fansubActive, this.fansubInActive];
        this.tabData[0].data.row = this.fansubData;
        if (this.allFansubId.length > 0) {
          this.getAnimeFansub();
          this.getDoramaFansub();
          this.checkInternetPositif();
        }
        this.fs.initializeFab('add', null, 'Tambahkan Fansub Baru', '/create/fansub', false);
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[FANSUB_LIST_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  checkInternetPositif(): void {
    this.bs.busy();
    const chunkSize = 100;
    const chunkHandlers: Observable<any>[] = [];
    for (let i = 0; i < this.allFansubId.length; i += chunkSize) {
      const chunk = this.allFansubId.slice(i, i + chunkSize);
      const handler = this.fansub.checkInternetPositif(chunk);
      chunkHandlers.push(handler);
    }
    this.subsInternetPositif = concat(...chunkHandlers).subscribe({
      next: res => {
        this.gs.log('[FANSUB_KOMINFO_SUCCESS]', res);
        for (const f of this.fansubData) {
          if (res.results[f.id]) {
            f.internet_positif = res.results[f.id];
          }
        }
      },
      error: err => {
        this.gs.log('[FANSUB_KOMINFO_ERROR]', err, 'error');
        this.bs.idle();
      },
      complete: () => {
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
          f.Anime = res.results[f.id];
        }
        this.doughnutChartGarapanLabels.push('Anime');
        this.doughnutChartGarapanData.push(res.count);
        const fansubRank = [...this.fansubData].sort((a, b) => b.Anime - a.Anime).slice(0, 10);
        for (const f of fansubRank) {
          this.barChartAnimeLabels.push(f['Nama Fansub']);
          this.barChartAnimeData.push(f.Anime);
        }
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[FANSUB_ANIME_ERROR]', err, 'error');
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
          f.Dorama = res.results[f.id];
        }
        this.doughnutChartGarapanLabels.push('Dorama');
        this.doughnutChartGarapanData.push(res.count);
        const fansubRank = [...this.fansubData].sort((a, b) => b.Dorama - a.Dorama).slice(0, 10);
        for (const f of fansubRank) {
          this.barChartDoramaLabels.push(f['Nama Fansub']);
          this.barChartDoramaData.push(f.Dorama);
        }
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[FANSUB_DORAMA_ERROR]', err, 'error');
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
    this.wb.winboxOpenUri(data.url);
  }

}
