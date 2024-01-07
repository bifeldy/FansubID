import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerDiscordComponent } from './banner-discord.component';

@NgModule({
  declarations: [BannerDiscordComponent],
  imports: [
    CommonModule
  ],
  exports: [BannerDiscordComponent]
})
export class BannerDiscordModule { }
