import { KeyValue } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/app/environment';

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
    return a.value.profile_.points > b.value.profile_.points ? -1 : (
      b.value.profile_.points > a.value.profile_.points ? 1 : 0
    );
  }

  constructor(
    private router: Router,
    private gs: GlobalService,
    private rps: RightPanelService,
    private quiz: QuizService,
    private ds: DialogService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  get ENV(): any {
    return environment;
  }

  get ROUTER(): Router {
    return this.router;
  }

  get getQuiz(): any {
    return this.quiz.getCurrentQuizQuestion(this.router.url.split('?')[0]);
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
      roomId: this.router.url.split('?')[0],
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
