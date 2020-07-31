import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css']
})
export class AnimeListComponent implements OnInit {

  seasonalBanner = [
    { id: 1, name: 'winter', img: '/assets/img/season/winter.png' },
    { id: 2, name: 'spring', img: '/assets/img/season/spring.png' },
    { id: 3, name: 'summer', img: '/assets/img/season/summer.png' },
    { id: 4, name: 'fall', img: '/assets/img/season/fall.png' },
  ];

  currentMonth = null;
  selectedSeasonName = null;
  selectedSeasonBannerImg = null;

  constructor(
  ) { }

  ngOnInit(): void {
    this.currentMonth = new Date().getMonth() + 1;
    this.changeSeason(this.currentMonth);
  }

  changeSeason(monthNumberOrSeasonName: any): void {
    if (typeof monthNumberOrSeasonName === 'number') {
      this.selectedSeasonName = this.seasonalBanner.find(sB => sB.id === Math.ceil(monthNumberOrSeasonName / 3)).name;
    }
    if (typeof monthNumberOrSeasonName === 'string') {
      this.selectedSeasonName = monthNumberOrSeasonName;
    }
    this.selectedSeasonBannerImg = this.seasonalBanner.find(sB => sB.name === this.selectedSeasonName).img;
  }

}
