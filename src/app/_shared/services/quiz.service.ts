import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { JsonResponse } from '../../../models/req-res.model';

import { RoomInfoModel } from '../../../models/socket-io.model';

import { ApiService } from './api.service';
import { GlobalService } from './global.service';
import { StatsServerService } from './stats-server.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private api: ApiService,
    private gs: GlobalService,
    private ss: StatsServerService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  getCurrentQuizRoom(): Observable<RoomInfoModel> {
    return this.ss.currentRoom;
  }

  getCurrentQuizQuestion(roomId: string): any {
    return this.ss.quizRoom[roomId];
  }

  answerQuestion(data): void {
    this.ss.socketEmit('quiz-answer', data);
  }

  getQuizLeaderboard(q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponse> {
    return this.api.getData(`/quiz-leaderboard?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

}
