import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from '../../_shared/services/global.service';
// import { BerkasService } from '../../_shared/services/berkas.service';
// import { FabService } from '../../_shared/services/fab.service';
// import { BusyService } from '../../_shared/services/busy.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  discordGuildId = '342220398022098944';
  discordInviteCode = 'xGWdExk';

  gridListBreakpoint = 1;

  uploaderMingguan = [
    { username: 'Bifeldy', total_berkas: 7, image_url: 'https://i.ibb.co/dDHWy2g/1598472779359.gif' },
    { username: 'Bifeldy', total_berkas: 8, image_url: 'https://i.ibb.co/dDHWy2g/1598472779359.gif' },
    { username: 'Bifeldy', total_berkas: 9, image_url: 'https://i.ibb.co/dDHWy2g/1598472779359.gif' },
    { username: 'Bifeldy', total_berkas: 10, image_url: 'https://i.ibb.co/dDHWy2g/1598472779359.gif' },
    { username: 'Bifeldy', total_berkas: 11, image_url: 'https://i.ibb.co/dDHWy2g/1598472779359.gif' },
    { username: 'Bifeldy', total_berkas: 12, image_url: 'https://i.ibb.co/dDHWy2g/1598472779359.gif' },
  ];

  berkasPopuler = [
    {
      id: 'e7696a8f-67ea-4876-803e-07d5b6867b34',
      title: '[HunterSubs] Neko Neko Fantasia [DVD 480p MP3][056AFD19].mkv',
      view_count: 1,
      image_url: 'https://i.ibb.co/1XdNQNB/1599143795237.jpg'
    },
    {
      id: 'e7696a8f-67ea-4876-803e-07d5b6867b34',
      title: '[HunterSubs] Neko Neko Fantasia [DVD 480p MP3][056AFD19].mkv',
      view_count: 2,
      image_url: 'https://i.ibb.co/1XdNQNB/1599143795237.jpg'
    },
    {
      id: 'e7696a8f-67ea-4876-803e-07d5b6867b34',
      title: '[HunterSubs] Neko Neko Fantasia [DVD 480p MP3][056AFD19].mkv',
      view_count: 3,
      image_url: 'https://i.ibb.co/1XdNQNB/1599143795237.jpg'
    },
    {
      id: 'e7696a8f-67ea-4876-803e-07d5b6867b34',
      title: '[HunterSubs] Neko Neko Fantasia [DVD 480p MP3][056AFD19].mkv',
      view_count: 4,
      image_url: 'https://i.ibb.co/1XdNQNB/1599143795237.jpg'
    },
    {
      id: 'e7696a8f-67ea-4876-803e-07d5b6867b34',
      title: '[HunterSubs] Neko Neko Fantasia [DVD 480p MP3][056AFD19].mkv',
      view_count: 5,
      image_url: 'https://i.ibb.co/1XdNQNB/1599143795237.jpg'
    },
    {
      id: 'e7696a8f-67ea-4876-803e-07d5b6867b34',
      title: '[HunterSubs] Neko Neko Fantasia [DVD 480p MP3][056AFD19].mkv',
      view_count: 6,
      image_url: 'https://i.ibb.co/1XdNQNB/1599143795237.jpg'
    }
  ];

  constructor(
    private gs: GlobalService,
    private router: Router,
    // private bs: BusyService,
    // private berkas: BerkasService,
    // private fs: FabService
  ) {
    this.gs.bannerImg = '/assets/img/home-banner.png';
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit(): void {
    this.gridListBreakpoint = (window.innerWidth >= 1200) ? 3 : (window.innerWidth >= 992) ? 2 : 1;
  }

  onResize(event): void {
    this.gs.log('[ReSize]', event);
    this.gridListBreakpoint = (window.innerWidth >= 1200) ? 3 : (window.innerWidth >= 992) ? 2 : 1;
  }

  openBerkas(data): void {
    this.gs.log('[HOME_CLICK_BERKAS]', data);
    this.router.navigateByUrl(`/berkas/${data.id}`);
  }

  openUserProfile(data): void {
    this.gs.log('[HOME_CLICK_USER]', data);
    this.router.navigateByUrl(`/user/${data.username}`);
  }

}
