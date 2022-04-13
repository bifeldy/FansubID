import { KeyValue } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from '../../../_shared/services/global.service';
import { QuizService } from '../../../_shared/services/quiz.service';
import { RightPanelService } from '../../../_shared/services/right-panel.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy {

  @Input() question = 'hiragana';
  @Input() options = 'romaji';

  swapOptions = true;

  participants = null;

  subsParticipant = null;
  subsDialog = null;

  scoreOrder = (a: KeyValue<number, any>, b: KeyValue<number, any>): number => {
    return a.value.points > b.value.points ? -1 : (
      b.value.points > a.value.points ? 1 : 0
    );
  }

  constructor(
    private router: Router,
    public gs: GlobalService,
    private rps: RightPanelService,
    private quiz: QuizService,
    private ds: DialogService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  get getQuiz(): any {
    return this.quiz.getCurrentQuizQuestion(this.router.url);
  }

  ngOnDestroy(): void {
    this.subsParticipant?.unsubscribe();
    this.subsDialog?.unsubscribe();
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

  openEdict(): void {
    this.gs.log('[QUIZ_OPEN_EDICT]', this.getQuiz);
    if (this.getQuiz.question.character) {
      this.subsDialog = this.ds.openEdictDialog({
        data: this.getQuiz.question,
        disableClose: false
      }).afterClosed().subscribe({
        next: re => {
          this.gs.log('[EDICT_DIALOG_CLOSED]', re);
          this.subsDialog.unsubscribe();
        }
      });
    }
  }

}
