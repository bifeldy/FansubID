import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwiperModule } from 'ngx-swiper-wrapper';

import { SharedMaterialModule } from '../../helpers/shared-material.module';

import { CardAnimeDoramaComponent } from './card-anime-dorama.component';

@NgModule({
  declarations: [CardAnimeDoramaComponent],
  imports: [
    CommonModule,
    SharedMaterialModule,
    SwiperModule
  ],
  exports: [CardAnimeDoramaComponent]
})
export class CardAnimeDoramaModule { }
