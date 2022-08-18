import { Component, OnDestroy, OnInit } from '@angular/core';

import { GlobalService } from '../../services/global.service';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit, OnDestroy {

  leaderboardData = [
    {
      rank: '1',
      username: 'No Data',
      image_url: '/favicon.ico',
      points: 0
    }
  ];

  leaderBoardTotalPages = 1;
  leaderboardPage = 1;

  subsLeaderboard = null;

  constructor(
    private gs: GlobalService,
    private qs: QuizService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.getLeaderboard();
    }
  }

  ngOnDestroy(): void {
    this.subsLeaderboard?.unsubscribe();
  }

  getLeaderboard(): void {
    this.subsLeaderboard = this.qs.getQuizLeaderboard('', this.leaderboardPage).subscribe({
      next: res => {
        this.gs.log('[LEADERBOARD_LIST_SUCCESS]', res);
        this.leaderBoardTotalPages = res.pages;
        this.leaderboardData = res.results;
      },
      error: err => {
        this.gs.log('[LEADERBOARD_LIST_ERROR]', err);
      }
    });
  }

  prevBoard(): void {
    this.leaderboardPage--;
    if (this.leaderboardPage <= 0) {
      this.leaderboardPage = 1;
    }
    this.getLeaderboard();
  }

  nextBoard(): void {
    this.leaderboardPage++;
    this.getLeaderboard();
  }

}
