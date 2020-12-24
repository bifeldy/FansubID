import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-nihongo',
  templateUrl: './banner-nihongo.component.html',
  styleUrls: ['./banner-nihongo.component.css']
})
export class BannerNihongoComponent implements OnInit {

  nihongoMenu = [
    {
      url: 'hirakata',
      title: 'Mengenal Huruf Hiragana & Katakana',
      image_url: '/assets/img/nihongo/hirakata.png'
    },
    {
      url: 'kanji',
      title: 'Daftar Huruf Kanji JLPT N5 - N1',
      image_url: '/assets/img/nihongo/jlpt.png'
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
