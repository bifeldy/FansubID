import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeInnerHtml'
})
export class SafeInnerHtmlPipe implements PipeTransform {

  constructor(
    private domSanitizer: DomSanitizer
  ) {
    //
  }

  transform(html: string): string {
    return this.domSanitizer.bypassSecurityTrustHtml(html).toString();
  }

}