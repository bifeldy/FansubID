import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import videojs from 'video.js';
import SubtitlesOctopus from '../../../../assets/lib/subtitles-octopus.js';

import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-vjs-player',
  templateUrl: './vjs-player.component.html',
  styleUrls: ['./vjs-player.component.css']
})
export class VjsPlayerComponent implements OnInit, OnDestroy {

  // see options: https://github.com/videojs/video.js/blob/mastertutorial-options.html

  @ViewChild('target', { static: true }) target: ElementRef;

  player: videojs.Player;
  subtitlesOctopus = null;

  @Input() videoUrl = '';
  @Input() subtitleUrl = '';
  @Input() subtitleFonts = [];

  @Input() poster = '';

  constructor(
    public gs: GlobalService
  ) {
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      if (this.target && this.videoUrl) {
        this.player = videojs(this.target.nativeElement, {
          autoplay: false,
          controls: true,
          fluid: true,
          muted: false,
          sources: [{
            src: this.videoUrl,
            type: 'video/webm'
          }],
          poster: this.poster
        }, () => {
          this.gs.log('[VIDEO-JS_INIT]', this);
          if (this.subtitleUrl) {
            this.subtitlesOctopus = new SubtitlesOctopus({
              video: this.target.nativeElement,
              subUrl: this.subtitleUrl,
              fonts: this.subtitleFonts,
              workerUrl: 'http://localhost:4200/assets/lib/subtitles-octopus-worker.js',
              legacyWorkerUrl: 'http://localhost:4200/assets/lib/subtitles-octopus-worker-legacy.js'
            });
            this.gs.log('[SUBTITLE_INIT]', this.subtitlesOctopus);
          }
        });
      }
    }
  }

  ngOnDestroy(): void {
    if (this.subtitlesOctopus) {
      this.gs.log('[SUBTITLE_DESTROY]', this.subtitlesOctopus);
      this.subtitlesOctopus.dispose();
    }
    if (this.player) {
      this.gs.log('[VIDEO-JS_DESTROY]', this.player);
      this.player.dispose();
    }
  }

}
