import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { RoomInfoModel } from '../../../models/socket-io.model';

import { GlobalService } from './global.service';
import { StatsServerService } from './stats-server.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
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

}
