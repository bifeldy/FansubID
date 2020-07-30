import { Component } from '@angular/core';

import { LeftMenuService } from './_shared/services/left-menu.service';
import { onMainContentChange } from './_shared/animations/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ onMainContentChange ]
})
export class AppComponent {

  public onSideNavChange: boolean;

  constructor(private lms: LeftMenuService) {
    this.lms.sideNavState$.subscribe(res => {
      this.onSideNavChange = res;
    });
  }

}
