import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

import { environment } from '../../../environments/environment';

import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class PageInfoService {

  siteName = environment.siteName;

  title = '';
  description = '';
  keywords = '';
  image = '';

  constructor(
    private t: Title,
    private m: Meta,
    private gs: GlobalService
  ) {
    this.m.updateTag({ property: 'og:site_name', content: this.siteName });
    if (this.gs.isBrowser) {
      //
    }
  }

  get getTitle(): string {
    return this.title;
  }

  get getDescription(): string {
    return this.description;
  }

  get getKeywords(): string {
    return this.keywords;
  }

  updatePageMetaData(newTitle: string, newDescription: string, newKeywords: string, newImage = '/favicon.ico'): void {
    this.title = newTitle;
    this.description = this.gs.htmlToText(newDescription);
    this.keywords = newKeywords;
    this.image = newImage;
    this.t.setTitle(`${this.title} | ${this.siteName}`);
    this.m.updateTag({ name: 'description', content: this.description });
    this.m.updateTag({ name: 'keywords', content: this.keywords });
    this.m.updateTag({ property: 'og:title', content: this.title });
    this.m.updateTag({ property: 'og:description', content: this.description });
    this.m.updateTag({ property: 'og:image', content: this.image });
  }

}
