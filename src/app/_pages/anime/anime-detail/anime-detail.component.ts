import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { JikanService } from '../../../_shared/services/jikan.service';
import { GlobalService } from '../../../_shared/services/global.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';

@Component({
  selector: 'app-anime-detail',
  templateUrl: './anime-detail.component.html',
  styleUrls: ['./anime-detail.component.css']
})
export class AnimeDetailComponent implements OnInit {

  animeId = 0;
  animeData = null;

  panelData = [];

  tabData = [
    {
      name: 'Daftar Fansub',
      icon: 'closed_caption',
      type: 'grid',
      data: [
        { title: 'Fansub 01 Long Name', description: 'http://01' },
        { title: 'Fansub 02 Long Name', description: 'http://02' },
        { title: 'Fansub 03 Long Name', description: 'http://03' },
        { title: 'Fansub 04 Long Name', description: 'http://04' },
        { title: 'Fansub 05 Long Name', description: 'http://05' },
        { title: 'Fansub 06 Long Name', description: 'http://06' },
        { title: 'Fansub 07 Long Name', description: 'http://07' },
        { title: 'Fansub 08 Long Name', description: 'http://08' },
        { title: 'Fansub 09 Long Name', description: 'http://09' },
        { title: 'Fansub 10 Long Name', description: 'http://10' }
      ]
    },
    {
      name: 'Berkas Terkait',
      icon: 'file_copy',
      type: 'table',
      data: {
        column: ['Tanggal Upload', 'Nama File', 'Pemilik'],
        row: [
          { 'Nama File': '[FanSub] Berkas Dengan Judul Anime - 01 [BD][1080p].mkv', Pemilik: 'Bifeldy', 'Tanggal Upload': '12:34:56 AM JST+9' },
          { 'Nama File': '[FanSub] Berkas Dengan Judul Anime - 02 [BD][1080p].mkv', Pemilik: 'Bifeldy', 'Tanggal Upload': '12:34:56 AM JST+9' },
          { 'Nama File': '[FanSub] Berkas Dengan Judul Anime - 03 [BD][1080p].mkv', Pemilik: 'Bifeldy', 'Tanggal Upload': '12:34:56 AM JST+9' },
          { 'Nama File': '[FanSub] Berkas Dengan Judul Anime - 04 [BD][1080p].mkv', Pemilik: 'Bifeldy', 'Tanggal Upload': '12:34:56 AM JST+9' },
          { 'Nama File': '[FanSub] Berkas Dengan Judul Anime - 05 [BD][1080p].mkv', Pemilik: 'Bifeldy', 'Tanggal Upload': '12:34:56 AM JST+9' }
        ]
      }
    }
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private gs: GlobalService,
    private pi: PageInfoService,
    private jikan: JikanService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.animeId = params.animeId;
      this.gs.log('[ANIME_DETAIL_PAGE]', this.animeId);
      this.jikan.getAnime(this.animeId).subscribe(
        res => {
          this.animeData = res;
          this.pi.updatePageMetaData(
            `Anime | ${this.animeData.title}`,
            `${this.animeData.synopsis}`,
            `${this.animeData.title_synonyms.join(', ')}`
          );
          this.pi.updatePageData(
            `Anime | ${this.animeData.title}`,
            `${this.animeData.synopsis}`,
            `${this.animeData.title_synonyms.join(', ')}`
          );
          this.panelData.push({ title: 'Synopsis', icon: 'history_edu', text: this.animeData.synopsis });
        },
        err => {
          this.gs.log(err);
        }
      );
    });
  }

  openMAL(linkAddress: string): void {
    window.open(linkAddress, '_blank');
  }

}
