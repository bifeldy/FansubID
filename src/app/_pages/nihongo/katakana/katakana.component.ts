import { KeyValue } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from '../../../_shared/services/global.service';
import { QuizService } from '../../../_shared/services/quiz.service';

@Component({
  selector: 'app-katakana',
  templateUrl: './katakana.component.html',
  styleUrls: ['./katakana.component.css']
})
export class KatakanaComponent implements OnInit, OnDestroy {

  showOptionRomaji = true;

  participants = null;

  subsParticipant = null;

  scoreOrder = (a: KeyValue<number, any>, b: KeyValue<number, any>): number => {
    return a.value.quiz.score > b.value.quiz.score ? -1 : (
      b.value.quiz.score > a.value.quiz.score ? 1 : 0
    );
  }

  constructor(
    private router: Router,
    private gs: GlobalService,
    private quiz: QuizService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  get getQuiz(): any {
    return this.quiz.getCurrentQuizQuestion(this.router.url);
  }

  ngOnDestroy(): void {
    if (this.subsParticipant) {
      this.subsParticipant.unsubscribe();
    }
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.subsParticipant = this.quiz.getCurrentQuizRoom().subscribe({
        next: currentRoom => {
          this.participants = currentRoom?.member_list;
        }
      });
    }
  }

  selectAnswer(data: any): void {
    this.quiz.answerQuestion({
      roomId: this.router.url,
      randomInteger: this.getQuiz.randomInteger,
      answer: data
    });
  }

  swapCharacter(): void {
    this.showOptionRomaji = !this.showOptionRomaji;
  }

}
