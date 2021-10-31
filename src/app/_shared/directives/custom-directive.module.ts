import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DragDropDirective } from './drag-drop.directive';
import { ExternalLinkDirective } from './external-link.directive';

@NgModule({
  declarations: [
    DragDropDirective,
    ExternalLinkDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DragDropDirective,
    ExternalLinkDirective
  ]
})
export class CustomDirectivesModule { }