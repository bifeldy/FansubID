import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PageInfoService {

  siteName = 'Hikki';

  title = '';
  description = '';
  keywords = '';

  constructor(
    private titleService: Title,
    private meta: Meta
  ) {
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

  updatePageData(newTitle: string, newDescription: string, newKeywords: string): void {
    this.title = newTitle;
    this.description = newDescription;
    this.keywords = newKeywords;
  }

  updatePageMetaData(newTitle: string, newDescription: string, newKeywords: string): void {
    this.titleService.setTitle(`${this.siteName} | ${newTitle}`);
    this.meta.updateTag({ name: 'og:title', content: `${this.siteName} | ${newTitle}` });
    this.meta.updateTag({ name: 'description', content: `${this.siteName} | ${newDescription}` });
    this.meta.updateTag({ name: 'og:description', content: `${this.siteName} | ${newDescription}` });
    this.meta.updateTag({ name: 'keywords', content: `${this.siteName} | ${newKeywords}` });
  }
}
