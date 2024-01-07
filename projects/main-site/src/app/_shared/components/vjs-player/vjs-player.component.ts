import videojs from 'video.js';

import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { VideoJsPlayer } from 'video.js';

import { GlobalService } from '../../services/global.service';

declare const SubtitlesOctopus: any;

@Component({
  selector: 'app-vjs-player',
  templateUrl: './vjs-player.component.html',
  styleUrls: ['./vjs-player.component.css']
})
export class VjsPlayerComponent implements OnInit, OnDestroy, OnChanges {

  // References:
  // https://github.com/videojs/video.js

  @ViewChild('target', { static: true }) target: ElementRef;

  player: VideoJsPlayer;
  subtitlesOctopus = null;

  @Input() videoUrl = null;
  @Input() videoThumb = null;

  @Input() subtitleUrl = null;
  @Input() subtitleFonts = [];

  constructor(
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      if (this.target && this.videoUrl) {
        this.gs.log('[VIDEO-JS_INIT_URL]', this.videoUrl);
        this.player = videojs(this.target.nativeElement, {
          autoplay: false,
          controls: true,
          fluid: true,
          muted: false,
          sources: [{ src: this.videoUrl, type: 'video/mp4' }],
          poster: this.videoThumb
        }, () => {
          this.gs.log('[VIDEO-JS_READY]', this.player);
          this.initSubtitle();
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.subtitlesOctopus?.dispose();
    this.player?.dispose();
  }

  ngOnChanges(): void {
    if (this.subtitlesOctopus) {
      if (this.subtitleUrl) {
        this.subtitlesOctopus.setTrackByUrl(this.subtitleUrl);
      }
    } else {
      this.initSubtitle();
    }
  }

  initSubtitle(): void {
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
  }

}
