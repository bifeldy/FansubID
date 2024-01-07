import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CustomPipeModule } from '../../pipes/custom-pipe.module';

import { NotificationsComponent } from './notifications.component';

@NgModule({
  declarations: [NotificationsComponent],
  imports: [
    CommonModule,
    RouterModule,
    CustomPipeModule
  ],
  exports: [NotificationsComponent]
})
export class NotificationsModule { }
