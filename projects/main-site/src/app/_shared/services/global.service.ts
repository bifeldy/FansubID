import { Injectable, isDevMode, Inject, PLATFORM_ID } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AngularEditorConfig } from '@kolkov/angular-editor';

import { stripHtml } from 'string-strip-html';

import { environment } from '../../../environments/app/environment';

import { SEASONS } from '../../../models/seasons';

declare const Sakura: any;

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  localStorageKeys = {
    AturanTatib: `${environment.siteName}_AturanTatib`,
    DebugLogs: `${environment.siteName}_DebugLogs`,
    DarkMode: `${environment.siteName}_DarkMode`,
    Token: `${environment.siteName}_Token`,
    LiveChatResults: `${environment.siteName}_LiveChatResults`,
    R18: `${environment.siteName}_R18`,
    SearchResults: `${environment.siteName}_SearchResults`,
    Torrents: `${environment.siteName}_Torrents`
  };

  forceEnableDebugLog = null;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  routerData = null;
  previousUrl = null;

  bgImgUrlPath = '';
  bannerImg = null;
  sizeContain = false;
  bgRepeat = false;

  leftMenuImage = '';
  rightMenuImage = '';

  isBrowser = null;
  document: Document = null;
  window: Window = null;

  gridListBreakpoint = 1;
  isDesktop = true;

  isDevMode = true;
  isDarkMode = false;

  weatherEffect = null;
  weatherRunning = false;

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
        class: 'white-space-normal-important'
      },
      {
        name: 'text-decoration-none',
        class: 'text-decoration-none'
      },
    ]
  };

  seasonalWeather = [
    { id: 1, name: SEASONS.WINTER, cssClassName: 'snow', img: '/assets/img/season/winter.png' },
    { id: 2, name: SEASONS.SPRING, cssClassName: 'sakura', img: '/assets/img/season/spring.png' },
    { id: 3, name: SEASONS.SUMMER, cssClassName: null, img: '/assets/img/season/summer.png' },
    { id: 4, name: SEASONS.FALL, cssClassName: 'fall', img: '/assets/img/season/fall.png' }
  ];

  constructor(
    @Inject(PLATFORM_ID) platformId: string,
    @Inject(DOCUMENT) document: Document
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.document = document;
    this.window = document.defaultView;
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
      let logger = null;
      if (type === 'warn') {
        logger = console.warn;
      } else if (type === 'error') {
        logger = console.error;
      } else if (type === 'table') {
        logger = console.table;
      } else {
        logger = console.log;
      }
      if (data) {
        logger(message, data);
      } else {
        logger(message);
      }
    }
  }

  getDirtyValues(formGroup: UntypedFormGroup): any {
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
    return '';
  }

  onResize(event, source = 'APP_COMPONENT'): void {
    if (event) {
      this.log(`[WINDOW_RESIZE-${source}]`, event);
    }
    if (this.isBrowser) {
      const browserWindow = event?.target?.window || window;
      this.leftMenuImage = '/assets/img/background/left-menu.png';
      this.rightMenuImage = '/assets/img/background/right-panel.png';
      if (browserWindow.innerWidth > 1200) {
        this.isDesktop = true;
        this.gridListBreakpoint = 4;
      } else if (browserWindow.innerWidth > 992) {
        this.isDesktop = true;
        this.gridListBreakpoint = 3;
      } else if (browserWindow.innerWidth > 768) {
        this.isDesktop = false;
        this.gridListBreakpoint = 2;
      } else {
        this.isDesktop = false;
        this.gridListBreakpoint = 1;
        this.leftMenuImage = '';
        this.rightMenuImage = '';
      }
    }
  }

  htmlToText(htmlElementString: string): string {
    if (htmlElementString) {
      const stringText = stripHtml(htmlElementString);
      return stringText.result;
    }
    return '';
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
      if (text?.includes(a)) {
        return true;
      }
    }
    return false;
  }

  linkify(text: string): string {
    if (text) {
      // http://, https://, ftp://
      const urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
      // www.
      const pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
      // Email addresses
      const emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;
      text = text.replace(urlPattern, '<a class="text-decoration-none" href="$&" target="_blank">$&</a>')
        .replace(pseudoUrlPattern, '$1<a class="text-decoration-none" href="http://$2" target="_blank">$2</a>')
        .replace(emailAddressPattern, '<a class="text-decoration-none" href="mailto:$&" target="_blank">$&</a>');
      return text;
    }
    return '';
  }

  toggleDarkTheme(firstRun = false): void {
    if (firstRun) {
      if (this.isDarkMode) {
        this.document?.body.classList.add('bifeldy-dark-theme');
      } else {
        this.document?.body.classList.remove('bifeldy-dark-theme');
      }
    } else {
      if (this.isDarkMode) {
        this.isDarkMode = false;
        this.document?.body.classList.remove('bifeldy-dark-theme');
      } else {
        this.isDarkMode = true;
        this.document?.body.classList.add('bifeldy-dark-theme');
      }
    }
  }

  weatherJS(): void {
    const currentMonth = new Date().getMonth() + 1;
    const weather = this.seasonalWeather.find(sB => sB.id === Math.ceil(currentMonth / 3));
    if (weather?.cssClassName) {
      this.weatherEffect = new Sakura('body', { className: weather.cssClassName, lifeTime: 5000 });
      this.weatherRunning = true;
    }
  }

  weatherToggle(): void {
    if (this.weatherRunning) {
      this.weatherEffect.stop(true);
      this.weatherRunning = false;
    } else {
      this.weatherEffect.start();
      this.weatherRunning = true;
    }
  }

  cleanIpOrigin(ipOrigin: string): string {
    if (ipOrigin) {
      // Remove Prefixes
      if (ipOrigin.startsWith('::ffff:')) {
        ipOrigin = ipOrigin.slice(7, ipOrigin.length);
      }
      if (ipOrigin.startsWith('http://')) {
        ipOrigin = ipOrigin.slice(7, ipOrigin.length);
      } else if (ipOrigin.startsWith('https://')) {
        ipOrigin = ipOrigin.slice(8, ipOrigin.length);
      }
      if (ipOrigin.startsWith('www.')) {
        ipOrigin = ipOrigin.slice(4, ipOrigin.length);
      }
      // Get Domain Or IP Maybe With Port Included And Remove Folder Path
      ipOrigin = ipOrigin.split('/')[0];
      // Remove Port
      let totalColon = 0;
      for (let i = 0; i < ipOrigin.length; i++) {
        if (ipOrigin[i] === ':') {
          totalColon++;
        }
        if (totalColon > 1) {
          break;
        }
      }
      if (totalColon === 1) {
        // IPv4
        ipOrigin = ipOrigin.split(':')[0];
      } else {
        // IPv6
        ipOrigin = ipOrigin.split(']')[0];
        if (ipOrigin.startsWith('[')) {
          ipOrigin = ipOrigin.slice(1, ipOrigin.length);
        }
      }
      return ipOrigin;
    }
    return '';
  }

}
