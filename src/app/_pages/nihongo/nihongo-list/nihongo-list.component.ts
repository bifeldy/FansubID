import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from '../../../_shared/services/global.service';

@Component({
  selector: 'app-nihongo-list',
  templateUrl: './nihongo-list.component.html',
  styleUrls: ['./nihongo-list.component.css']
})
export class NihongoListComponent implements OnInit {

  testNihongo = [
    {
      url: 'hiragana',
      name: 'Huruf Hiragana',
      image_url: '/assets/img/nihongo/hiragana.png',
      icon: null,
      letter: '46 Karakter'
    },
    {
      url: 'katakana',
      name: 'Huruf Katakana',
      image_url: '/assets/img/nihongo/katakana.png',
      icon: null,
      letter: '48 Karakter'
    },
    {
      url: 'angka',
      name: 'Angka Numerik',
      image_url: null,
      icon: 'plus_one',
      letter: '0 Karakter'
    },
    {
      url: 'kanji',
      name: 'Huruf Kanji',
      image_url: '/assets/img/nihongo/kanji.png',
      icon: null,
      letter: '4050 Karakter'
    }
  ];

  tabData: any = [
    {
      name: 'JLPT Roadmap',
      icon: 'pin_drop',
      type: 'html',
      data: `
        <div class="row">
          <img class="col-12 col-md-6" src="/assets/img/nihongo/roadmap-1.jpg" />
          <img class="col-12 col-md-6" src="/assets/img/nihongo/roadmap-2.jpg" />
        </div>
        <p class="mat-caption">Sumber gambar dan informasi: <a class="text-decoration-none" href="https://kawakawalearningstudio.com/all/roadmap-for-the-jlpt">KawaKawa</a></p>
        <p>“JLPT” adalah singkatan dari Japanese-Language Proficiency Test (Tes Kemampuan Bahasa Jepang). JLPT adalah salah satu ujian kecakapan bahasa Jepang internasional yang paling terkenal. Ini memiliki lima level, dengan level lima (secara resmi disebut N5) menjadi yang termudah dan level satu (N1) menjadi yang paling sulit. JLPT dulu memiliki empat level tetapi sekarang dibagi menjadi lima (N5, N4, N3, N2, dan N1). Level mana yang ingin diambil dibebaskan untuk memilih. Contoh pertanyaan dapat diakses pada halaman <a class="text-decoration-none" href="http://www.jlpt.jp/e/samples/sample09.html">Website JLPT</a>.</p>
        <ul>
          <li>Untuk lulus N5, perlu mengetahui sekitar 100 kanji dan sekitar 800 kosakata.</li>
          <li>Untuk lulus N4, perlu mengetahui sekitar 300 kanji dan sekitar 1.500 kosakata.</li>
          <li>Untuk lulus N3, perlu mengetahui sekitar 650 kanji dan sekitar 3.700 kosakata.</li>
          <li>Untuk lulus N2, perlu mengetahui sekitar 1.000 kanji dan sekitar 6.000 kosakata.</li>
          <li>Untuk lulus N1, perlu mengetahui sekitar 2.000 kanji dan sekitar 10.000 kosakata.</li>
        </ul>
        <div class="row">
          <img class="col-12 col-md-6" src="/assets/img/nihongo/roadmap-3.jpg" />
          <img class="col-12 col-md-6" src="/assets/img/nihongo/roadmap-4.jpg" />
        </div>
        <p class="mat-caption">Sumber gambar dan informasi: <a class="text-decoration-none" href="https://japaneselanguageinstitute.wordpress.com/2018/05/15/scoring-section-in-jlpt-exam-minimum-passing-marks-required-for-each-level/">Nihonkai</a></p>
        <p class="mat-body-strong mat-body-2 font-weight-bold">N5 dan N4 adalah level termudah untuk diselesaikan dalam tes tetapi jika ingin menyelesaikan level yang lebih tinggi seperti N3, N2 dan N1 maka harus menghadiri pusat pembinaan di mana mereka menyediakan bahan pelajaran yang baik dan memiliki pelatih berpengalaman akan membantu belajar bahasa jepang dengan mudah.</p>
      `
    },
    {
      name: 'Modul Pendukung',
      icon: 'file_copy',
      type: 'table',
      data: {
        column: ['Tanggal', 'Nama Modul', 'Pemilik'],
        row: []
      }
    }
  ];

  count = 0;
  page = 1;
  row = 10;

  q = '';
  sort = '';
  order = '';

  constructor(
    private router: Router,
    public gs: GlobalService
  ) {
  }

  ngOnInit(): void {
  }

  openModule(data): void {
    this.gs.log('[NIHONGO_CLICK_MODUL]', data);
    this.router.navigateByUrl(`/nihongo/${data.id}`);
  }

  onPaginatorClicked(data): void {
    this.gs.log('[NIHONGO_CLICK_PAGINATOR]', data);
    this.page = data.pageIndex + 1;
    this.row = data.pageSize;
    // this.getBerkas();
  }

  onServerSideFilter(data: any): void {
    this.gs.log('[NIHONGO_ENTER_FILTER]', data);
    this.q = data;
    // this.getBerkas();
  }

  onServerSideOrder(data: any): void {
    this.gs.log('[NIHONGO_CLICK_ORDER]', data);
    this.q = data.q;
    this.sort = data.active;
    this.order = data.direction;
    // this.getBerkas();
  }

}
