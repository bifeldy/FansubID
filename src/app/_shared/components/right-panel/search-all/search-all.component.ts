import { Component, OnInit } from '@angular/core';


import { GlobalService } from '../../../services/global.service';
import { NewsService } from '../../../services/news.service';
import { DialogService } from '../../../services/dialog.service';
import { NihongoService } from '../../../services/nihongo.service';
import { AnimeService } from '../../../services/anime.service';
import { DoramaService } from '../../../services/dorama.service';
import { FansubService } from '../../../services/fansub.service';
import { BerkasService } from '../../../services/berkas.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-search-all',
  templateUrl: './search-all.component.html',
  styleUrls: ['./search-all.component.css']
})
export class SearchAllComponent implements OnInit {

  q = '';

  subsBerita = null;
  beritaResults = [];

  subsEdict = null;
  edictResults = [];

  subsAnime = null;
  animeResults = [];

  subsDorama = null;
  doramaResults = [];

  subsFansub = null;
  fansubResults = [];

  subsBerkas = null;
  berkasResults = [];

  subsPengguna = null;
  penggunaResults = [];

  constructor(
    private gs: GlobalService,
    private news: NewsService,
    private ds: DialogService,
    private nihon: NihongoService,
    private anime: AnimeService,
    private dorama: DoramaService,
    private fansub: FansubService,
    private berkas: BerkasService,
    private user: UserService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  ngOnInit(): void {
  }

  applyFilter(event): void {
    this.gs.log('[SEARCH_VALUE_CHANGED]', event);
    this.q = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.beritaResults = [];
    this.edictResults = [];
    this.animeResults = [];
    this.doramaResults = [];
    this.fansubResults = [];
    this.berkasResults = [];
    this.penggunaResults = [];
    if (this.q) {
      this.getNews();
      this.getKanji();
      this.getAnime();
      this.getDorama();
      this.getFansub();
      this.getBerkas();
      this.getPengguna();
    }
  }

  openEdict(kana): void {
    this.gs.log('[HIRAKATA_OPEN_EDICT]', kana);
    this.ds.openEdictDialog({
      data: {
        character: kana.character,
        context: kana.context,
        freq: kana.freq,
        gakken: kana.gakken,
        harlpern_kkld: kana.harlpern_kkld,
        harlpern_njecd: kana.harlpern_njecd,
        jlpt: kana.jlpt,
        maniette: kana.maniette,
        nelson_c: kana.nelson_c,
        nelson_n: kana.nelson_n,
        remember: kana.remember,
        school: kana.school,
        skip: kana.skip,
        stroke: kana.stroke,
        translate: kana.translate,
        v_kunyomi: kana.v_kunyomi,
        v_onyomi: kana.v_onyomi
      },
      disableClose: false
    });
  }

  getNews(): void {
    if (this.subsBerita) {
      this.subsBerita.unsubscribe();
    }
    this.subsBerita = this.news.getAllNews(this.q, 1, 5).subscribe({
      next: res => {
        this.gs.log('[NEWS_SEARCH_SUCCESS]', res);
        this.beritaResults = res.results;
      },
      error: err => {
        this.gs.log('[NEWS_SEARCH_ERROR]', err);
        this.beritaResults = [];
      }
    });
  }

  getKanji(): void {
    if (this.subsEdict) {
      this.subsEdict.unsubscribe();
    }
    this.subsEdict = this.nihon.getAllEdict(this.q, 1, 5).subscribe({
      next: res => {
        this.gs.log('[EDICT_SEARCH_SUCCESS]', res);
        this.edictResults = res.results;
      },
      error: err => {
        this.gs.log('[EDICT_SEARCH_ERROR]', err);
        this.edictResults = [];
      }
    });
  }

  getAnime(): void {
    if (this.subsAnime) {
      this.subsAnime.unsubscribe();
    }
    this.subsAnime = this.anime.searchAnime(this.q).subscribe({
      next: res => {
        this.gs.log('[ANIME_SEARCH_SUCCESS]', res);
        this.animeResults = res.results;
      },
      error: err => {
        this.gs.log('[ANIME_SEARCH_ERROR]', err);
        this.animeResults = [];
      }
    });
  }

  getDorama(): void {
    if (this.subsDorama) {
      this.subsDorama.unsubscribe();
    }
    this.subsDorama = this.dorama.searchDorama(this.q).subscribe({
      next: res => {
        this.gs.log('[DORAMA_SEARCH_SUCCESS]', res);
        this.doramaResults = res.results;
      },
      error: err => {
        this.gs.log('[DORAMA_SEARCH_ERROR]', err);
        this.doramaResults = [];
      }
    });
  }

  getFansub(): void {
    if (this.subsFansub) {
      this.subsFansub.unsubscribe();
    }
    this.subsFansub = this.fansub.searchFansub(this.q, 1, 5).subscribe({
      next: res => {
        this.gs.log('[FANSUB_SEARCH_SUCCESS]', res);
        this.fansubResults = res.results;
      },
      error: err => {
        this.gs.log('[FANSUB_SEARCH_ERROR]', err);
        this.fansubResults = [];
      }
    });
  }

  getBerkas(): void {
    if (this.subsBerkas) {
      this.subsBerkas.unsubscribe();
    }
    this.subsBerkas = this.berkas.getAllBerkas(this.q, 1, 5).subscribe({
      next: res => {
        this.gs.log('[BERKAS_SEARCH_SUCCESS]', res);
        this.berkasResults = res.results;
      },
      error: err => {
        this.gs.log('[BERKAS_SEARCH_ERROR]', err);
        this.berkasResults = [];
      }
    });
  }

  getPengguna(): void {
    if (this.subsPengguna) {
      this.subsPengguna.unsubscribe();
    }
    this.subsPengguna = this.user.getAllUser(this.q, 1, 5).subscribe({
      next: res => {
        this.gs.log('[PENGGUNA_SEARCH_SUCCESS]', res);
        this.penggunaResults = res.results;
      },
      error: err => {
        this.gs.log('[PENGGUNA_SEARCH_ERROR]', err);
        this.penggunaResults = [];
      }
    });
  }

}
