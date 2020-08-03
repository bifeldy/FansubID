import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Warna } from '../../../_shared/models/Warna';

import { JikanService } from '../../../_shared/services/jikan.service';
import { GlobalService } from '../../../_shared/services/global.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { FabService } from 'src/app/_shared/services/fab.service';

@Component({
  selector: 'app-anime-detail',
  templateUrl: './anime-detail.component.html',
  styleUrls: ['./anime-detail.component.css']
})
export class AnimeDetailComponent implements OnInit {

  animeId = 0;
  animeData = null;

  chipData = [];

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
        column: ['Upload', 'Nama File', 'Pemilik'],
        row: [
          {
            type: 'text',
            Pemilik: 'H.265/MPEGH Part 2 HEVC',
            Upload: '12:34:56',
            'Nama File': '[Fansub] Judul Anime - 00 [BD 4K x265 10bit FLAC][CRC32].mkv'
          },
          {
            type: 'text',
            Pemilik: 'H.264/MPEG4 Part 10 AVC',
            Upload: '12:34:56',
            'Nama File': '[Fansub] Judul Anime - 01 [BD 1080p x264 10bit AAC][CRC32].mkv'
          },
          {
            type: 'text',
            Pemilik: 'H.263/MPEG4 Part 2',
            Upload: '12:34:56',
            'Nama File': '[Fansub] Judul Anime - 02 [BD 720p x263 8bit AAC][CRC32].mkv'
          },
          {
            type: 'text',
            Pemilik: 'H.262/MPEG2 Standard',
            Upload: '12:34:56',
            'Nama File': '[Fansub] Judul Anime - 03 [BD 480p x262 8bit MP3][CRC32].mkv'
          },
          {
            type: 'text',
            Pemilik: 'H.261',
            Upload: '12:34:56',
            'Nama File': '[Fansub] Judul Anime - 04 [BD 360p x261 6bit MP3][CRC32].mkv'
          }
        ]
      }
    }
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private gs: GlobalService,
    private pi: PageInfoService,
    private jikan: JikanService,
    private fs: FabService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.animeId = params.animeId;
      this.jikan.getAnime(this.animeId).subscribe(
        res => {
          this.animeData = res.data;
          this.chipData = this.animeData.genres;
          this.chipData.map(g => (g.selected = true, g.color = Warna.PINK));
          this.pi.updatePageMetaData(
            `${this.animeData.title}`,
            `${this.animeData.synopsis}`,
            `${this.animeData.title_synonyms.join(', ')}`
          );
          this.pi.updatePageData(
            `Anime | ${this.animeData.title}`,
            `${this.animeData.synopsis}`,
            `${this.animeData.title_synonyms.join(', ')}`
          );
          this.panelData.push({ title: 'Synopsis', icon: 'history_edu', text: this.animeData.synopsis });
          this.fs.initializeFab(null, '/assets/img/mal-logo.png', 'Buka Di MyAnimeList', this.animeData.url, true);
        },
        err => {
          this.gs.log(err);
        }
      );
    });
  }

  openRank(): void {
    window.open(`https://myanimelist.net/topanime.php?limit=${this.animeData.rank - 1}`, '_blank');
  }

  openSeasonalAnime(): void {
    this.router.navigate(['/anime'], {
      queryParams: {
        season: this.animeData.season,
        year: this.animeData.year
      }
    });
  }

  openGenre(data): void {
    window.open(data.url, '_blank');
  }

  openFansub(data): void {
    this.gs.log(data);
  }

  openFile(data): void {
    this.gs.log(data);
  }

}
