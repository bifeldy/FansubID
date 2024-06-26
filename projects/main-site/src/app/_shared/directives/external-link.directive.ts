import { Directive, HostBinding, Input, ElementRef, OnChanges } from '@angular/core';

import { GlobalService } from '../services/global.service';

@Directive({
  selector: 'a[href]'
})
export class ExternalLinkDirective implements OnChanges {

  @HostBinding('attr.rel') relAttr = '';
  @HostBinding('attr.target') targetAttr = '';
  @HostBinding('attr.href') hrefAttr = '';

  @Input() href: string;

  constructor(
    private gs: GlobalService,
    private elementRef: ElementRef
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  ngOnChanges(): void {
    this.hrefAttr = this.href;
    if (this.isLinkExternal()) {
      this.relAttr = 'noopener';
      this.targetAttr = '_blank';
    }
  }

  private isLinkExternal() {
    return this.gs.isBrowser && !this.elementRef.nativeElement.hostname.includes(location.hostname);
  }

}
