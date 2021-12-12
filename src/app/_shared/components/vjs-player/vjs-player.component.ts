import videojs from 'video.js';

import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { GlobalService } from '../../services/global.service';

declare const SubtitlesOctopus: any;

@Component({
  selector: 'app-vjs-player',
  templateUrl: './vjs-player.component.html',
  styleUrls: ['./vjs-player.component.css']
})
export class VjsPlayerComponent implements OnInit, OnDestroy {

  // References:
  // https://github.com/videojs/video.js

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
    if (this.gs.isBrowser) {
      //
    }
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
          this.gs.log('[VIDEO-JS_INIT]', this.player);
          if (this.subtitleUrl) {
            this.subtitlesOctopus = new SubtitlesOctopus({
              video: this.target.nativeElement,
              subUrl: this.subtitleUrl,
              fonts: this.subtitleFonts,
              workerUrl: '/assets/lib/subtitles-octopus-worker.js',
              legacyWorkerUrl: '/assets/lib/subtitles-octopus-worker-legacy.js'
            });
            this.gs.log('[SUBTITLE_INIT]', this.subtitlesOctopus);
          }
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.subtitlesOctopus?.dispose();
    this.player?.dispose();
  }

}
