import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/client/environment';

import pkg from '../../../../package.json';

import { GlobalService } from '../../_shared/services/global.service';
import { FabService } from '../../_shared/services/fab.service';
import { WinboxService } from '../../_shared/services/winbox.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  aboutProject = [
    {
      logo: '/assets/img/about/nodejs_logo.png',
      pict: '/assets/img/about/nodejs_pict.png',
      name: 'NodeJS',
      version: 'v12.16.1',
      description: 'Node.js® is a JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
      site_url: 'https://nodejs.org'
    },
    {
      logo: '/assets/img/about/angular.svg',
      pict: '/assets/img/about/angular.svg',
      name: 'Angular + Material',
      version: 'v10.0.5',
      description: 'One framework. Mobile & desktop. Material Design components.',
      site_url: 'https://angular.io'
    },
    {
      logo: '/assets/img/about/express_logo.png',
      pict: '/assets/img/about/express_pict.png',
      name: 'ExpressJS',
      version: 'v4.15.2',
      description: 'Fast, unopinionated, minimalist web framework for Node.js',
      site_url: 'https://expressjs.com'
    },
    {
      logo: '/assets/img/about/mysql_logo.png',
      pict: '/assets/img/about/mysql_pict.png',
      name: 'MySQL',
      version: 'v8.0',
      description: 'The world\'s most popular open source database',
      site_url: 'https://www.mysql.com'
    },
  ];

  library = pkg.dependencies;

  constructor(
    public gs: GlobalService,
    private fs: FabService,
    private wb: WinboxService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.fs.initializeFab(null, '/assets/img/discord-pink.png', 'Discord Server', environment.discordUrl, true);
    }
  }

  openWebsite(url: string): void {
    this.wb.winboxOpenUri(url);
  }

}
