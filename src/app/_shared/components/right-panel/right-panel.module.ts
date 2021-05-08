import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedMaterialModule } from '../../helpers/shared-material.module';

import { RightPanelComponent } from './right-panel.component';
import { SearchAllComponent } from './search-all/search-all.component';
import { AdminNavigationComponent } from './admin-navigation/admin-navigation.component';
import { LiveChatComponent } from './live-chat/live-chat.component';

@NgModule({
  declarations: [
    RightPanelComponent,
    SearchAllComponent,
    AdminNavigationComponent,
    LiveChatComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedMaterialModule
  ],
  exports: [
    RightPanelComponent,
    SearchAllComponent
  ]
})
export class RightPanelModule { }
