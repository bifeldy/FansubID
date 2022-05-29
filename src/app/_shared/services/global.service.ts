import { Injectable, isDevMode, Inject, PLATFORM_ID } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AngularEditorConfig } from '@kolkov/angular-editor';

import { environment } from '../../../environments/app/environment';

import { Seasons } from '../models/Seasons';

declare const Sakura: any;

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  localStorageKeys = {
    AturanTatib: `${environment.siteName}_AturanTatib`,
    DebugLogs: `${environment.siteName}_DebugLogs`,
    DarkMode: `${environment.siteName}_DarkMode`,
    JwtToken: `${environment.siteName}_JwtToken`,
    LiveChatResults: `${environment.siteName}_LiveChatResults`,
    SearchResults: `${environment.siteName}_SearchResults`,
    Torrents : `${environment.siteName}_Torrents`,
    WeatherJS: `${environment.siteName}_WeatherJS`
  };

  forceEnableDebugLog = null;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  routerData = null;

  bgImgUrlPath = null;
  bannerImg = null;
  sizeContain = false;
  bgRepeat = false;

  leftMenuImage = null;
  rightMenuImage = null;

  isBrowser = null;
  document: Document = null;

  gridListBreakpoint = 1;
  isDesktop = true;

  isDevMode = true;
  isDarkMode = false;

  weatherEffect = null;

  gambarUploadSizeLimit = 256 * 1000;
  berkasUploadSizeLimit = 256 * 1000 * 1000;

  angularEditorConfig: AngularEditorConfig = {
    editable: true,
    minHeight: '256px',
    placeholder: 'Deskripsi, Informasi, Atau Keterangan Lainnya ...',
    uploadUrl: `${environment.apiUrl}/image`,
    uploadWithCredentials: true,
    defaultParagraphSeparator: 'div',
    toolbarHiddenButtons: [
      [],
      []
    ],
    customClasses: [
      {
        name: 'white-space-normal-important',
        class: 'white-space-normal-important',
      },
      {
        name: 'text-decoration-none',
        class: 'text-decoration-none',
      },
    ],
  };

  seasonalWeather = [
    { id: 1, name: Seasons.WINTER, cssClassName: 'snow', img: '/assets/img/season/winter.png' },
    { id: 2, name: Seasons.SPRING, cssClassName: null, img: '/assets/img/season/spring.png' },
    { id: 3, name: Seasons.SUMMER, cssClassName: null, img: '/assets/img/season/summer.png' },
    { id: 4, name: Seasons.FALL, cssClassName: 'sakura', img: '/assets/img/season/fall.png' }
  ];

  constructor(
    @Inject(PLATFORM_ID) platformId: string,
    @Inject(DOCUMENT) document: Document
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.document = document;
    this.isDevMode = isDevMode();
    if (this.isBrowser) {
      this.onResize(null);
      this.weatherJS();
    }
  }

  log(message: string, data: any = null, type: string = 'log'): void {
    if (this.isBrowser) {
      this.forceEnableDebugLog = localStorage.getItem(this.localStorageKeys.DebugLogs) === 'true';
    }
    if (this.isDevMode || this.forceEnableDebugLog) {
      if (type === 'log') {
        if (data != null) {
          console.log(message, data);
        } else {
          console.log(message);
        }
      } else if (type === 'warn') {
        console.warn(message, data);
      } else if (type === 'error') {
        console.error(message, data);
      } else if (type === 'table') {
        console.table(message);
      }
    }
  }

  getDirtyValues(formGroup: FormGroup): any {
    const dirtyValues = {};
    for (const control of Object.keys(formGroup.controls)) {
      const currentControl = formGroup.get(control);
      if (currentControl.dirty) {
        dirtyValues[control] = currentControl.value;
      }
    }
    return dirtyValues;
  }

  get randomColor(): any {
    return (Math.random() * 0xFFFFFF << 0).toString(16);
  }

  get bgImgUrl(): string {
    if (this.isDesktop) {
      return this.bgImgUrlPath;
    }
    return null;
  }

  onResize(event, source = 'APP_COMPONENT'): void {
    if (event) {
      this.log(`[WINDOW_RESIZE-${source}]`, event);
    }
    if (this.isBrowser) {
      const browserWindow = event?.target?.window || window;
      this.isDesktop = true;
      this.leftMenuImage = '/assets/img/bg-left-menu.png';
      this.rightMenuImage = '/assets/img/bg-right-panel.png';
      if (browserWindow.innerWidth >= 1200) {
        this.gridListBreakpoint = 4;
      } else if (browserWindow.innerWidth >= 992) {
        this.gridListBreakpoint = 3;
      } else if (browserWindow.innerWidth >= 767) {
        this.gridListBreakpoint = 2;
      } else {
        this.isDesktop = false;
        this.gridListBreakpoint = 1;
        this.leftMenuImage = null;
        this.rightMenuImage = '';
      }
    }
  }

  htmlToText(htmlString: string): string {
    return htmlString.replace(/<[^>]*>/g, ' ').trim();
  }

  shuffle(array): any {
    let currentIndex = array.length;
    let temporaryValue = 0;
    let randomIndex = 0;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  cleanObject(objData: any): any {
    for (const o in objData) {
      if (!objData[o]) {
        delete objData[o];
      }
    }
  }

  includesOneOf(text: string, arr: string[]): boolean {
    for (const a of arr) {
      if (text.includes(a)) {
        return true;
      }
    }
    return false;
  }

  linkify(text: string): string {
    // http://, https://, ftp://
    const urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
    // www. sans http:// or https://
    const pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    // Email addresses
    const emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;
    text = text.replace(urlPattern, '<a class="text-decoration-none" href="$&" target="_blank">$&</a>')
      .replace(pseudoUrlPattern, '$1<a class="text-decoration-none" href="http://$2" target="_blank">$2</a>')
      .replace(emailAddressPattern, '<a class="text-decoration-none" href="mailto:$&" target="_blank">$&</a>');
    return text;
  }

  toggleDarkTheme(firstRun = false): void {
    if (firstRun) {
      if (this.isDarkMode) {
        this.document.body.classList.add('bifeldy-dark-theme');
      } else {
        this.document.body.classList.remove('bifeldy-dark-theme');
      }
    } else {
      if (this.isDarkMode) {
        this.isDarkMode = false;
        this.document.body.classList.remove('bifeldy-dark-theme');
      } else {
        this.isDarkMode = true;
        this.document.body.classList.add('bifeldy-dark-theme');
      }
    }
  }

  rssLink(links: string | Array<any>): string {
    if (typeof links === 'string') {
      return links;
    }
    let idx = links.findIndex(l => l.rel === 'alternate' && l.type === 'text/html');
    if (idx < 0) {
      if (links.length > 0) {
        return links[links.length - 1].href;
      }
      return '';
    }
    return links[idx].href;
  }

  weatherJS(): void {
    const currentMonth = new Date().getMonth() + 1;
    const weather = this.seasonalWeather.find(sB => sB.id === Math.ceil(currentMonth / 3));
    if (weather?.cssClassName) {
      this.weatherEffect = new Sakura('body', { className: weather.cssClassName, lifeTime: 12589 });
      this.weatherEffect.stop();
    }
  }

}
