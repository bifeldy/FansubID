import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { environment } from '../../../environments/app/environment';

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
  author = '';

  constructor(
    private t: Title,
    private m: Meta,
    private gs: GlobalService,
    private router: Router
  ) {
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

  updatePageMetaData(newTitle: string, newDescription: string, newKeywords: string, newImage = `${environment.baseUrl}/assets/img/favicon.png`, newAuthor = '「💤 Fansub ✨ ID 🌞」'): void {
    this.title = newTitle;
    this.description = this.gs.htmlToText(newDescription);
    this.keywords = newKeywords;
    this.image = newImage.startsWith('/') ? environment.baseUrl + newImage : newImage;
    this.author = newAuthor;
    this.t.setTitle(`${this.title} | ${this.siteName}`);
    this.m.updateTag({ name: 'description', content: this.description });
    this.m.updateTag({ name: 'keywords', content: this.keywords });
    this.m.updateTag({ name: 'author', content: this.author });
    this.m.updateTag({ property: 'og:title', content: `${this.title} | ${this.siteName}` });
    this.m.updateTag({ property: 'og:description', content: this.description });
    this.m.updateTag({ property: 'og:image', content: this.image });
    this.m.updateTag({ name: 'twitter:title', content: `${this.title} | ${this.siteName}` });
    this.m.updateTag({ name: 'twitter:description', content: this.description });
    this.m.updateTag({ name: 'twitter:image', content: this.image });
    if (this.router.url.includes('/berkas/')) {
      this.m.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    }
  }

  updateStatusBarTheme(isDarkMode) {
    if (isDarkMode) {
      this.m.updateTag({ name: 'theme-color', content: '#673ab7' });
    } else {
      this.m.updateTag({ name: 'theme-color', content: '#3f51b5' });
    }
  }

}
