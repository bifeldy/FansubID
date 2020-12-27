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
      name: 'Modul Pendukung',
      icon: 'file_copy',
      type: 'table',
      data: {
        column: ['Tanggal', 'Nama Modul', 'Pemilik'],
        row: []
      }
    },
    {
      name: 'JLPT Roadmap',
      icon: 'pin_drop',
      type: 'html',
      data: `
        <div class="row">
          <img class="col-12 col-md-6" src="/assets/img/nihongo/roadmap-1.jpg" />
          <img class="col-12 col-md-6" src="/assets/img/nihongo/roadmap-2.jpg" />
        </div>
        <p class="mat-caption">Sumber gambar dan informasi: <a target="_blank" class="text-decoration-none" href="https://kawakawalearningstudio.com/all/roadmap-for-the-jlpt">KawaKawa</a></p>
        <p>“JLPT” adalah singkatan dari Japanese-Language Proficiency Test (Tes Kemampuan Bahasa Jepang). JLPT adalah salah satu ujian kecakapan bahasa Jepang internasional yang paling terkenal. Ini memiliki lima level, dengan level lima (secara resmi disebut N5) menjadi yang termudah dan level satu (N1) menjadi yang paling sulit.</p>
        <p>JLPT dulu memiliki empat level tetapi sekarang dibagi menjadi lima (N5, N4, N3, N2, dan N1). Level mana yang ingin diambil dibebaskan untuk memilih. Contoh pertanyaan dapat diakses pada halaman <a target="_blank" class="text-decoration-none" href="http://www.jlpt.jp/e/samples/sample09.html">New Japanese-Language Proficiency Test Sample Questions</a>.</p>
        <ul>
          <li>Untuk lulus <a target="_blank" class="text-success text-decoration-none">N5</a>, perlu mengetahui sekitar <a target="_blank" class="text-success text-decoration-none">100</a> kanji dan sekitar <a target="_blank" class="text-success text-decoration-none">800</a> kosakata.</li>
          <li>Untuk lulus <a target="_blank" class="text-success text-decoration-none">N4</a>, perlu mengetahui sekitar <a target="_blank" class="text-success text-decoration-none">300</a> kanji dan sekitar <a target="_blank" class="text-success text-decoration-none">1.500</a> kosakata.</li>
          <li>Untuk lulus <a target="_blank" class="text-success text-decoration-none">N3</a>, perlu mengetahui sekitar <a target="_blank" class="text-success text-decoration-none">650</a> kanji dan sekitar <a target="_blank" class="text-success text-decoration-none">3.700</a> kosakata.</li>
          <li>Untuk lulus <a target="_blank" class="text-success text-decoration-none">N2</a>, perlu mengetahui sekitar <a target="_blank" class="text-success text-decoration-none">1.000</a> kanji dan sekitar <a target="_blank" class="text-success text-decoration-none">6.000</a> kosakata.</li>
          <li>Untuk lulus <a target="_blank" class="text-success text-decoration-none">N1</a>, perlu mengetahui sekitar <a target="_blank" class="text-success text-decoration-none">2.000</a> kanji dan sekitar <a target="_blank" class="text-success text-decoration-none">10.000</a> kosakata.</li>
        </ul>
        <p>Untuk informasi skoring & penilaian dapat dilihat pada <a target="_blank" class="text-decoration-none" href="https://www.jlpt.jp/e/guideline/results.html">Scoring Sections, Pass or Fail, Score Report</a>.</p>
        <p class="text-danger mat-body-strong mat-body-2 font-weight-bold">N5 dan N4 adalah level termudah untuk diselesaikan dalam tes tetapi jika ingin menyelesaikan level yang lebih tinggi seperti N3, N2 dan N1 maka harus menghadiri pusat pembinaan di mana mereka menyediakan bahan pelajaran yang baik dan memiliki pelatih berpengalaman akan membantu belajar bahasa jepang dengan mudah.</p>
        <p>Informasi lebih lanjut, silahkan kunjungi <a target="_blank" class="text-decoration-none" href="https://www.jlpt.jp/e/index.html">https://www.jlpt.jp/e/index.html</a>.</p>
      `
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
