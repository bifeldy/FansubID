import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DragDropDirective } from './drag-drop.directive';
import { ExternalLinkDirective } from './external-link.directive';
import { DomChangeDirective } from './dom-change.directive';

@NgModule({
  declarations: [
    DragDropDirective,
    ExternalLinkDirective,
    DomChangeDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DragDropDirective,
    ExternalLinkDirective,
    DomChangeDirective
  ]
})
export class CustomDirectivesModule { }