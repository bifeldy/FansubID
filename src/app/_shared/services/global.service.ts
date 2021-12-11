import { Injectable, isDevMode, Inject, PLATFORM_ID } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AngularEditorConfig } from '@kolkov/angular-editor';

import { environment } from '../../../environments/client/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  localStorageTokenKeyName = `${environment.siteName}_JwtToken`;
  localStorageLoggingKeyName = `${environment.siteName}_DebugLogs`;

  forceEnableDebugLog = null;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  readonly japaneseKeyboardKeysRegex = /[一-龠ぁ-ゔァ-ヴーａ-ｚＡ-Ｚ０-９々〆〤、。]+/u;
  readonly allKeyboardKeysRegex = /^[a-zA-Z0-9~`!@#\$%\^&\*\(\)_\-\+={\[\}\]\|\\:;"'<,>\.\?\/  \n]*$/;

  readonly emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  public routerData = null;

  public bgImgUrl = null;
  public bannerImg = null;
  public sizeContain = false;
  public bgRepeat = false;

  public isBrowser = null;
  public document: Document = null;

  public gridListBreakpoint = 1;
  public isDesktop = true;

  public isDevMode = true;

  public gambarUploadSizeLimit = 256 * 1000;
  public berkasUploadSizeLimit = 256 * 1000 * 1000;

  public angularEditorConfig: AngularEditorConfig = {
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

  constructor(
    @Inject(PLATFORM_ID) platformId: string,
    @Inject(DOCUMENT) document: Document
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.document = document;
    this.isDevMode = isDevMode();
    if (this.isBrowser) {
      this.onResize(null);
      this.setupStringArrayIncludes();
      this.setupLinkify();
    }
  }

  log(message: string, data: any = null, type: string = 'log'): void {
    if (this.isBrowser) {
      this.forceEnableDebugLog = localStorage.getItem(this.localStorageLoggingKeyName) === 'true';
    }
    if (this.isDevMode || this.forceEnableDebugLog) {
      if (type === 'log') {
        if (data != null) {
          console.log(message, data);
        } else {
          console.log(message);
        }
      } else if (type === 'error') {
        console.error(message, data);
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

  onResize(event): void {
    if (event) {
      this.log('[WINDOW_RESIZE]', event);
    }
    if (this.isBrowser) {
      const browserWindow = event?.target?.window || window;
      if (browserWindow.innerWidth >= 1200) {
        this.isDesktop = true;
        this.gridListBreakpoint = 3;
      } else if (browserWindow.innerWidth >= 992) {
        this.isDesktop = true;
        this.gridListBreakpoint = 2;
      } else {
        this.isDesktop = false;
        this.gridListBreakpoint = 1;
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

  setupStringArrayIncludes(): void {
    if (!String['includesOneOf']) {
      String.prototype['includesOneOf'] = function(arrayOfStrings: string[]): boolean {
        return arrayOfStrings.some(str => this.includes(str));
      };
    }
  }

  setupLinkify(): void {
    if (!String['linkify']) {
      String.prototype['linkify'] = function(): void {
        // http://, https://, ftp://
        const urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
        // www. sans http:// or https://
        const pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
        // Email addresses
        const emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;
        return this
          .replace(urlPattern, '<a class="text-decoration-none" href="$&" target="_blank">$&</a>')
          .replace(pseudoUrlPattern, '$1<a class="text-decoration-none" href="http://$2" target="_blank">$2</a>')
          .replace(emailAddressPattern, '<a class="text-decoration-none" href="mailto:$&" target="_blank">$&</a>');
      };
    }
  }

}
