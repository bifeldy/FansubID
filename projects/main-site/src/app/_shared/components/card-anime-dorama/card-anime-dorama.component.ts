import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-card-anime-dorama',
  templateUrl: './card-anime-dorama.component.html',
  styleUrls: ['./card-anime-dorama.component.css']
})
export class CardAnimeDoramaComponent implements OnInit {

  swiperConfig = {
    slidesPerView: 1.75,
    // slidesOffsetBefore: 25,
    // slidesOffsetAfter: 25,
    spaceBetween: 25,
    // freeMode: true,
    grabCursor: true,
    // autoplay: {
    //   delay: 1234,
    //   disableOnInteraction: true,
    // },
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev'
    // },
    // pagination: {
    //   el: '.swiper-pagination',
    //   type: 'bullets',
    //   clickable: true
    // },
    breakpoints: {
      576: {
        slidesPerView: 2.75
      },
      768: {
        slidesPerView: 3.75
      },
      992: {
        slidesPerView: 4.75
      },
      1200: {
        slidesPerView: 5.75
      },
      1400: {
        slidesPerView: 6.75
      }
    }
  };

  @Input() animeDoramaData = [];

  @Output() cardClicked = new EventEmitter();

  constructor(
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      //
    }
  }

  onCardClicked(data): void {
    this.cardClicked.emit(data);
  }

}
