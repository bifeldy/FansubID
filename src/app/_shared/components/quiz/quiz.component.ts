import { KeyValue } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from '../../../_shared/services/global.service';
import { QuizService } from '../../../_shared/services/quiz.service';
import { RightPanelService } from '../../../_shared/services/right-panel.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy {

  @Input() question: string = 'hiragana';
  @Input() options: string = 'romaji';

  swapOptions = true;

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
    private rps: RightPanelService,
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
    this.swapOptions = !this.swapOptions;
  }

  openLiveChat(): void {
    this.rps.toggleSidePanel('LiveChatComponent');
  }

  openProfile(username: string): void {
    this.router.navigateByUrl(`/user/${username}`);
  }

}
