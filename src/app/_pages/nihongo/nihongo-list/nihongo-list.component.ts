import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from '../../../_shared/services/global.service';
import { FabService } from '../../../_shared/services/fab.service';

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
      letter: '~46 Ragam'
    },
    {
      url: 'katakana',
      name: 'Huruf Katakana',
      image_url: '/assets/img/nihongo/katakana.png',
      icon: null,
      letter: '~46 Ragam'
    },
    {
      url: 'angka',
      name: 'Angka Numerik',
      image_url: null,
      icon: 'plus_one',
      letter: '~0 Ragam'
    },
    {
      url: 'warna',
      name: 'Warna',
      image_url: null,
      icon: null,
      letter: '~0 Ragam'
    },
    {
      url: 'binatang',
      name: 'Binatang',
      image_url: null,
      icon: 'plus_one',
      letter: '~0 Ragam'
    },
    {
      url: 'buah',
      name: 'Buah',
      image_url: null,
      icon: 'plus_one',
      letter: '~0 Ragam'
    },
    {
      url: 'sayur',
      name: 'Sayur',
      image_url: null,
      icon: 'plus_one',
      letter: '~0 Ragam'
    },
    {
      url: 'daging',
      name: 'Daging',
      image_url: null,
      icon: 'plus_one',
      letter: '~0 Ragam'
    },
    {
      url: 'minuman',
      name: 'minuman',
      image_url: null,
      icon: 'plus_one',
      letter: '~0 Ragam'
    },
    {
      url: 'pakaian',
      name: 'Pakaian',
      image_url: null,
      icon: 'plus_one',
      letter: '~0 Ragam'
    },
    {
      url: 'cuaca',
      name: 'Cuaca',
      image_url: null,
      icon: 'plus_one',
      letter: '~0 Ragam'
    },
    {
      url: 'transportasi',
      name: 'Transportasi',
      image_url: null,
      icon: 'plus_one',
      letter: '~0 Ragam'
    },
    {
      url: 'tempat',
      name: 'Tempat',
      image_url: null,
      icon: 'plus_one',
      letter: '~0 Ragam'
    },
    {
      url: 'pekerjaan',
      name: 'Pekerjaan',
      image_url: null,
      icon: 'plus_one',
      letter: '~0 Ragam'
    },
    {
      url: 'olah-raga',
      name: 'Olah Raga',
      image_url: null,
      icon: 'plus_one',
      letter: '~0 Ragam'
    },
    {
      url: 'perkakas',
      name: 'Perkakas',
      image_url: null,
      icon: 'plus_one',
      letter: '~0 Ragam'
    },
    {
      url: 'mebel',
      name: 'Mebel',
      image_url: null,
      icon: 'plus_one',
      letter: '~0 Ragam'
    },
    {
      url: 'dapur',
      name: 'Dapur',
      image_url: null,
      icon: 'plus_one',
      letter: '~0 Ragam'
    },
    {
      url: 'negara',
      name: 'Negara',
      image_url: null,
      icon: 'plus_one',
      letter: '~0 Ragam'
    },
    {
      url: 'jlpt-n5',
      name: 'JLPT N5',
      image_url: '/assets/img/nihongo/kanji.png',
      icon: null,
      letter: '~79 Ragam'
    },
    {
      url: 'jlpt-n4',
      name: 'JLPT N4',
      image_url: '/assets/img/nihongo/kanji.png',
      icon: null,
      letter: '~166 Ragam'
    },
    {
      url: 'jlpt-n3',
      name: 'JLPT N3',
      image_url: '/assets/img/nihongo/kanji.png',
      icon: null,
      letter: '~367 Ragam'
    },
    {
      url: 'jlpt-n2',
      name: 'JLPT N2',
      image_url: '/assets/img/nihongo/kanji.png',
      icon: null,
      letter: '~367 Ragam'
    },
    {
      url: 'jlpt-n1',
      name: 'JLPT N1',
      image_url: '/assets/img/nihongo/kanji.png',
      icon: null,
      letter: '~1231 Ragam'
    },
    {
      url: 'school-1',
      name: 'Kelas 1',
      image_url: '/assets/img/nihongo/kanji.png',
      icon: null,
      letter: '~80 Ragam'
    },
    {
      url: 'school-2',
      name: 'Kelas 2',
      image_url: '/assets/img/nihongo/kanji.png',
      icon: null,
      letter: '~160 Ragam'
    },
    {
      url: 'school-3',
      name: 'Kelas 3',
      image_url: '/assets/img/nihongo/kanji.png',
      icon: null,
      letter: '~200 Ragam'
    },
    {
      url: 'school-4',
      name: 'Kelas 4',
      image_url: '/assets/img/nihongo/kanji.png',
      icon: null,
      letter: '~200 Ragam'
    },
    {
      url: 'school-5',
      name: 'Kelas 5',
      image_url: '/assets/img/nihongo/kanji.png',
      icon: null,
      letter: '~185 Ragam'
    },
    {
      url: 'school-6',
      name: 'Kelas 6',
      image_url: '/assets/img/nihongo/kanji.png',
      icon: null,
      letter: '~181 Ragam'
    },
    {
      url: 'school-lanjutan-1',
      name: 'Kelas Lanjutan 1',
      image_url: '/assets/img/nihongo/kanji.png',
      icon: null,
      letter: '~1139 Ragam'
    },
    {
      url: 'school-lanjutan-2',
      name: 'Kelas Lanjutan 2',
      image_url: '/assets/img/nihongo/kanji.png',
      icon: null,
      letter: '~349 Ragam'
    },
    {
      url: 'kanji-semua',
      name: 'Semua Kanji',
      image_url: '/assets/img/nihongo/kanji.png',
      icon: null,
      letter: '~2494 Ragam'
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
    private fs: FabService,
    public gs: GlobalService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.getBook();
    }
  }

  getBook(): void {
    this.fs.initializeFab('add', null, 'Tambah Modul Baru', `/nihongo/create`, false);
  }

  openModule(data): void {
    this.gs.log('[NIHONGO_CLICK_MODUL]', data);
    this.router.navigateByUrl(`/nihongo/${data.id}`);
  }

  onPaginatorClicked(data): void {
    this.gs.log('[NIHONGO_CLICK_PAGINATOR]', data);
    this.page = data.pageIndex + 1;
    this.row = data.pageSize;
    this.getBook();
  }

  onServerSideFilter(data: any): void {
    this.gs.log('[NIHONGO_ENTER_FILTER]', data);
    this.q = data;
    this.getBook();
  }

  onServerSideOrder(data: any): void {
    this.gs.log('[NIHONGO_CLICK_ORDER]', data);
    this.q = data.q;
    this.sort = data.active;
    this.order = data.direction;
    this.getBook();
  }

}
