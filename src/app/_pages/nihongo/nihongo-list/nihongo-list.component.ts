import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// import { FabService } from '../../../_shared/services/fab.service';
import { GlobalService } from '../../../_shared/services/global.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { NihongoService } from '../../../_shared/services/nihongo.service';

@Component({
  selector: 'app-nihongo-list',
  templateUrl: './nihongo-list.component.html',
  styleUrls: ['./nihongo-list.component.css']
})
export class NihongoListComponent implements OnInit, OnDestroy {

  testDasar = [
    {
      url: 'hiragana',
      name: 'Hiragana',
      image_url: '/assets/img/nihongo/hiragana.png',
      icon: null,
      letter: '~46 Unik'
    },
    {
      url: 'katakana',
      name: 'Katakana',
      image_url: '/assets/img/nihongo/katakana.png',
      icon: null,
      letter: '~46 Unik'
    },
    {
      url: 'angka',
      name: 'Angka',
      image_url: null,
      icon: 'plus_one',
      letter: '~∞ Unik'
    }
  ];

  testMenengah = [];

  testLanjutan = [
    {
      url: 'kelas-1',
      name: 'Kelas 1',
      image_url: '/assets/img/nihongo/kanji.png',
      icon: null,
      letter: '~80 Unik'
    },
    {
      url: 'kelas-2',
      name: 'Kelas 2',
      image_url: '/assets/img/nihongo/kanji.png',
      icon: null,
      letter: '~160 Unik'
    },
    {
      url: 'kelas-3',
      name: 'Kelas 3',
      image_url: '/assets/img/nihongo/kanji.png',
      icon: null,
      letter: '~200 Unik'
    },
    {
      url: 'kelas-4',
      name: 'Kelas 4',
      image_url: '/assets/img/nihongo/kanji.png',
      icon: null,
      letter: '~200 Unik'
    },
    {
      url: 'kelas-5',
      name: 'Kelas 5',
      image_url: '/assets/img/nihongo/kanji.png',
      icon: null,
      letter: '~185 Unik'
    },
    {
      url: 'kelas-6',
      name: 'Kelas 6',
      image_url: '/assets/img/nihongo/kanji.png',
      icon: null,
      letter: '~181 Unik'
    },
    {
      url: 'kelas-lanjutan-1',
      name: 'Lanjutan 1',
      image_url: '/assets/img/nihongo/kanji.png',
      icon: null,
      letter: '~1139 Unik'
    },
    {
      url: 'kelas-lanjutan-2',
      name: 'Lanjutan 2',
      image_url: '/assets/img/nihongo/kanji.png',
      icon: null,
      letter: '~349 Unik'
    },
    {
      url: 'jlpt-n5',
      name: 'JLPT N5',
      image_url: '/assets/img/nihongo/kanji.png',
      icon: null,
      letter: '~79 Unik'
    },
    {
      url: 'jlpt-n4',
      name: 'JLPT N4',
      image_url: '/assets/img/nihongo/kanji.png',
      icon: null,
      letter: '~166 Unik'
    },
    {
      url: 'jlpt-n3',
      name: 'JLPT N3',
      image_url: '/assets/img/nihongo/kanji.png',
      icon: null,
      letter: '~367 Unik'
    },
    {
      url: 'jlpt-n2',
      name: 'JLPT N2',
      image_url: '/assets/img/nihongo/kanji.png',
      icon: null,
      letter: '~367 Unik'
    },
    {
      url: 'jlpt-n1',
      name: 'JLPT N1',
      image_url: '/assets/img/nihongo/kanji.png',
      icon: null,
      letter: '~1231 Unik'
    },
    {
      url: 'semua-kanji',
      name: 'All Kanji',
      image_url: '/assets/img/nihongo/kanji.png',
      icon: null,
      letter: '~2494 Unik'
    }
  ];

  tabData: any = [
    // {
    //   name: 'Modul Pendukung',
    //   icon: 'file_copy',
    //   type: 'table',
    //   data: {
    //     column: ['Tanggal', 'Nama Modul', 'Pemilik'],
    //     row: []
    //   }
    // },
    {
      name: 'JLPT Roadmap',
      icon: 'pin_drop',
      type: 'html',
      data: `
        <div class="row">
          <img class="col-12 col-md-6" src="/assets/img/nihongo/roadmap-1.jpg" />
          <img class="col-12 col-md-6" src="/assets/img/nihongo/roadmap-2.jpg" />
        </div>
        <p class="mat-caption">Sumber gambar dan informasi: <a target="_blank" class="text-decoration-none" href="https://kawakawalearningstudio.com/all/roadmap-for-the-jlpt" target="_blank">KawaKawa</a></p>
        <p>“JLPT” adalah singkatan dari Japanese-Language Proficiency Test (Tes Kemampuan Bahasa Jepang). JLPT adalah salah satu ujian kecakapan bahasa Jepang internasional yang paling terkenal. Ini memiliki lima level, dengan level lima (secara resmi disebut N5) menjadi yang termudah dan level satu (N1) menjadi yang paling sulit.</p>
        <p>JLPT dulu memiliki empat level tetapi sekarang dibagi menjadi lima (N5, N4, N3, N2, dan N1). Level mana yang ingin diambil dibebaskan untuk memilih. Contoh pertanyaan dapat diakses pada halaman <a target="_blank" class="text-decoration-none" href="https://www.jlpt.jp/e/samples/sample09.html" target="_blank">New Japanese-Language Proficiency Test Sample Questions</a>.</p>
        <ul>
          <li>Untuk lulus <a target="_blank" class="text-success text-decoration-none">N5</a>, perlu mengetahui sekitar <a target="_blank" class="text-success text-decoration-none">100</a> kanji dan sekitar <a target="_blank" class="text-success text-decoration-none">800</a> kosakata.</li>
          <li>Untuk lulus <a target="_blank" class="text-success text-decoration-none">N4</a>, perlu mengetahui sekitar <a target="_blank" class="text-success text-decoration-none">300</a> kanji dan sekitar <a target="_blank" class="text-success text-decoration-none">1.500</a> kosakata.</li>
          <li>Untuk lulus <a target="_blank" class="text-success text-decoration-none">N3</a>, perlu mengetahui sekitar <a target="_blank" class="text-success text-decoration-none">650</a> kanji dan sekitar <a target="_blank" class="text-success text-decoration-none">3.700</a> kosakata.</li>
          <li>Untuk lulus <a target="_blank" class="text-success text-decoration-none">N2</a>, perlu mengetahui sekitar <a target="_blank" class="text-success text-decoration-none">1.000</a> kanji dan sekitar <a target="_blank" class="text-success text-decoration-none">6.000</a> kosakata.</li>
          <li>Untuk lulus <a target="_blank" class="text-success text-decoration-none">N1</a>, perlu mengetahui sekitar <a target="_blank" class="text-success text-decoration-none">2.000</a> kanji dan sekitar <a target="_blank" class="text-success text-decoration-none">10.000</a> kosakata.</li>
        </ul>
        <p>Untuk informasi skoring & penilaian dapat dilihat pada <a target="_blank" class="text-decoration-none" href="https://www.jlpt.jp/e/guideline/results.html" target="_blank">Scoring Sections, Pass or Fail, Score Report</a>.</p>
        <p class="text-danger mat-body-strong mat-body-2 font-weight-bold">N5 dan N4 adalah level termudah untuk diselesaikan dalam tes tetapi jika ingin menyelesaikan level yang lebih tinggi seperti N3, N2 dan N1 maka harus menghadiri pusat pembinaan di mana mereka menyediakan bahan pelajaran yang baik dan memiliki pelatih berpengalaman akan membantu belajar bahasa jepang dengan mudah.</p>
        <p>Informasi lebih lanjut, silahkan kunjungi <a target="_blank" class="text-decoration-none" href="https://www.jlpt.jp/e/index.html" target="_blank">https://www.jlpt.jp/e/index.html</a>.</p>
      `
    }
  ];

  count = 0;
  page = 1;
  row = 10;

  q = '';
  sort = '';
  order = '';

  subsAllKategori = null;

  constructor(
    private router: Router,
    // private fs: FabService,
    private gs: GlobalService,
    private bs: BusyService,
    private nihon: NihongoService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.getKategori();
      // this.fs.initializeFab('add', null, 'Tambah Modul Baru', `/create/nihongo`, false);
      // this.getBook();
    }
  }

  ngOnDestroy(): void {
    this.subsAllKategori?.unsubscribe();
  }

  getKategori(): void {
    this.bs.busy();
    this.subsAllKategori = this.nihon.getAllKategori().subscribe({
      next: res => {
        this.gs.log('[BELAJAR_KANA_KATEGORI_SUCCESS]', res);
        const x = [];
        for (const r of res.results) {
          x.push({
            url: `latihan-${r.id}`,
            name: r.name,
            image_url: null,
            icon: 'switch_access_shortcut',
            letter: `~${r.jumlah} Unik`
          });
        }
        this.testMenengah = x;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[BELAJAR_KANA_KATEGORI_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  getBook(): void {
    //
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
