import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwiperModule } from 'ngx-swiper-wrapper';

import { SharedMaterialModule } from '../../helpers/shared-material.module';

import { CardAnimeComponent } from './card-anime.component';

@NgModule({
  declarations: [CardAnimeComponent],
  imports: [
    CommonModule,
    SharedMaterialModule,
    SwiperModule
  ],
  exports: [CardAnimeComponent]
})
export class CardAnimeModule { }
