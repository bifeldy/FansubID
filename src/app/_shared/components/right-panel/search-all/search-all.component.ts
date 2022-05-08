import { Component, OnDestroy, OnInit } from '@angular/core';

import { GlobalService } from '../../../services/global.service';
import { NewsService } from '../../../services/news.service';
import { DialogService } from '../../../services/dialog.service';
import { NihongoService } from '../../../services/nihongo.service';
import { AnimeService } from '../../../services/anime.service';
import { DoramaService } from '../../../services/dorama.service';
import { FansubService } from '../../../services/fansub.service';
import { BerkasService } from '../../../services/berkas.service';
import { UserService } from '../../../services/user.service';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-search-all',
  templateUrl: './search-all.component.html',
  styleUrls: ['./search-all.component.css']
})
export class SearchAllComponent implements OnInit, OnDestroy {

  searchResult = {
    q: '',
    beritaResults: [],
    kanjiResults: [],
    animeResults: [],
    doramaResults: [],
    fansubResults: [],
    berkasResults: [],
    penggunaResults: [],
  };

  subsBerita = null;
  subsKanji = null;
  subsAnime = null;
  subsDorama = null;
  subsFansub = null;
  subsBerkas = null;
  subsPengguna = null;
  subsDialog = null;

  constructor(
    private gs: GlobalService,
    private news: NewsService,
    private ds: DialogService,
    private nihon: NihongoService,
    private anime: AnimeService,
    private dorama: DoramaService,
    private fansub: FansubService,
    private berkas: BerkasService,
    private user: UserService,
    private ls: LocalStorageService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.searchResult = this.ls.getItem(this.gs.localStorageKeys.SearchResults, true) || this.searchResult;
    }
  }

  ngOnDestroy(): void {
    this.ls.setItem(this.gs.localStorageKeys.SearchResults, this.searchResult);
    this.subsBerita?.unsubscribe();
    this.subsKanji?.unsubscribe();
    this.subsAnime?.unsubscribe();
    this.subsDorama?.unsubscribe();
    this.subsFansub?.unsubscribe();
    this.subsBerkas?.unsubscribe();
    this.subsPengguna?.unsubscribe();
    this.subsDialog?.unsubscribe();
  }

  applyFilter(event): void {
    this.gs.log('[SEARCH_VALUE_CHANGED]', event);
    this.searchResult.q = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.searchResult.beritaResults = [];
    this.searchResult.kanjiResults = [];
    this.searchResult.animeResults = [];
    this.searchResult.doramaResults = [];
    this.searchResult.fansubResults = [];
    this.searchResult.berkasResults = [];
    this.searchResult.penggunaResults = [];
    if (this.searchResult.q) {
      setTimeout(() => { this.getNews(); }, 250);
      setTimeout(() => { this.getKanji(); }, 500);
      setTimeout(() => { this.getAnime(); }, 750);
      setTimeout(() => { this.getDorama(); }, 1000);
      setTimeout(() => { this.getFansub(); }, 1250);
      setTimeout(() => { this.getBerkas(); }, 1500);
      setTimeout(() => { this.getPengguna(); }, 1750);
    }
  }

  openEdict(kana): void {
    this.gs.log('[HIRAKATA_OPEN_EDICT]', kana);
    this.subsDialog = this.ds.openEdictDialog({
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
    }).afterClosed().subscribe({
      next: re => {
        this.gs.log('[EDICT_DIALOG_CLOSED]', re);
        this.subsDialog.unsubscribe();
      }
    });
  }

  getNews(): void {
    if (this.subsBerita) {
      this.subsBerita.unsubscribe();
    }
    this.subsBerita = this.news.getAllNews(this.searchResult.q, 1, 5).subscribe({
      next: res => {
        this.gs.log('[NEWS_SEARCH_SUCCESS]', res);
        this.searchResult.beritaResults = res.results;
      },
      error: err => {
        this.gs.log('[NEWS_SEARCH_ERROR]', err);
        this.searchResult.beritaResults = [];
      }
    });
  }

  getKanji(): void {
    if (this.subsKanji) {
      this.subsKanji.unsubscribe();
    }
    this.subsKanji = this.nihon.getAllKanji('', '', this.searchResult.q, 1, 5).subscribe({
      next: res => {
        this.gs.log('[KANJI_SEARCH_SUCCESS]', res);
        this.searchResult.kanjiResults = res.results;
      },
      error: err => {
        this.gs.log('[KANJI_SEARCH_ERROR]', err);
        this.searchResult.kanjiResults = [];
      }
    });
  }

  getAnimeTitle(title: string): string {
    return title.replace(/[^a-zA-Z0-9]/g, '-');
  }

  getAnime(): void {
    if (this.subsAnime) {
      this.subsAnime.unsubscribe();
    }
    this.subsAnime = this.anime.searchAnime(this.searchResult.q).subscribe({
      next: res => {
        this.gs.log('[ANIME_SEARCH_SUCCESS]', res);
        this.searchResult.animeResults = res.results;
      },
      error: err => {
        this.gs.log('[ANIME_SEARCH_ERROR]', err);
        this.searchResult.animeResults = [];
      }
    });
  }

  getDorama(): void {
    if (this.subsDorama) {
      this.subsDorama.unsubscribe();
    }
    this.subsDorama = this.dorama.searchDorama(this.searchResult.q).subscribe({
      next: res => {
        this.gs.log('[DORAMA_SEARCH_SUCCESS]', res);
        this.searchResult.doramaResults = res.results;
      },
      error: err => {
        this.gs.log('[DORAMA_SEARCH_ERROR]', err);
        this.searchResult.doramaResults = [];
      }
    });
  }

  getFansub(): void {
    if (this.subsFansub) {
      this.subsFansub.unsubscribe();
    }
    this.subsFansub = this.fansub.searchFansub(this.searchResult.q, 1, 5).subscribe({
      next: res => {
        this.gs.log('[FANSUB_SEARCH_SUCCESS]', res);
        this.searchResult.fansubResults = res.results;
      },
      error: err => {
        this.gs.log('[FANSUB_SEARCH_ERROR]', err);
        this.searchResult.fansubResults = [];
      }
    });
  }

  getBerkas(): void {
    if (this.subsBerkas) {
      this.subsBerkas.unsubscribe();
    }
    this.subsBerkas = this.berkas.getAllBerkas(this.searchResult.q, 1, 5).subscribe({
      next: res => {
        this.gs.log('[BERKAS_SEARCH_SUCCESS]', res);
        this.searchResult.berkasResults = res.results;
      },
      error: err => {
        this.gs.log('[BERKAS_SEARCH_ERROR]', err);
        this.searchResult.berkasResults = [];
      }
    });
  }

  getPengguna(): void {
    if (this.subsPengguna) {
      this.subsPengguna.unsubscribe();
    }
    this.subsPengguna = this.user.getAllUser(this.searchResult.q, 1, 5).subscribe({
      next: res => {
        this.gs.log('[PENGGUNA_SEARCH_SUCCESS]', res);
        this.searchResult.penggunaResults = res.results;
      },
      error: err => {
        this.gs.log('[PENGGUNA_SEARCH_ERROR]', err);
        this.searchResult.penggunaResults = [];
      }
    });
  }

}
