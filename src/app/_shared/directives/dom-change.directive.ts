import { Directive, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';

import { GlobalService } from '../services/global.service';
import { BusyService } from '../services/busy.service';
import { FuriganaService } from '../services/furigana.service';

@Directive({
  selector: '[appDomChange]'
})
export class DomChangeDirective implements OnDestroy {

  changes = null;

  @Output() public domChange = new EventEmitter<any>();

  constructor(
    private elementRef: ElementRef,
    public gs: GlobalService,
    private bs: BusyService,
    private furi: FuriganaService
  ) {
    if (this.gs.isBrowser) {
      const element = this.elementRef.nativeElement;
      this.gs.log('[DOM_NATIVE]', element);
      this.changes = new MutationObserver(async (mutations: MutationRecord[]) => {
        if (this.bs.busyRequestCount > 0) return;
        this.gs.log('[DOM_CHANGE]', mutations);
        this.domChange.emit(mutations);
        this.processDom(mutations);
      });
      this.changes.observe(element, {
        subtree: true,
        childList: true,
        // attributes: true,
        // characterData: true
      });
    }
  }

  ngOnDestroy(): void {
    this.changes?.disconnect();
  }

  processDom(mutationsList): void {
    for (const mutation of mutationsList) {
      this.furi.watch(mutation);
    }
  }

}
