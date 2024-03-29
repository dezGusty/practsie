import { Component, OnInit, Input } from '@angular/core';
import { SurveyQuestion } from 'src/app/shared/surveyquestion.model';
import { Choice } from 'src/app/shared/choice.model';
import { QuestionResponseType } from 'src/app/shared/questionresponsetype.model';
import { ChoiceComponent } from './choice/choice.component';
import { FreeComponent } from './free/free.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  imports: [ChoiceComponent, FreeComponent, NgIf, NgFor],
  selector: 'app-question',
  standalone: true,
  styles: [''],
  templateUrl: './question.component.html',
})
export class QuestionComponent implements OnInit {

  @Input() question: SurveyQuestion | undefined;
  @Input() counter: number;
  @Input() maxcounter: number | undefined;

  constructor() {
    this.counter = 0;
    this.maxcounter = 0;
  }

  ngOnInit(): void {
    if (!this.question) {
      return;
    }

    this.question.answer.setUserChoiceByIndex(0);
  }

  isFreeChoice(): boolean {
    if (!this.question) {
      return false;
    }

    return this.question.answer.type === QuestionResponseType.freeTextResponse;
  }

  onChoiceSelected($event: any) {
    if (!this.question) {
      return;
    }

    const selectedChoice: Choice = $event;
    if (!selectedChoice) {
      return;
    }

    this.question.answer.setUserChoiceByValue(selectedChoice.value);
  }

  onFreeAnswerChange($event: any) {
    if (!this.question) {
      return;
    }

    this.question.answer.freeAnswer = $event;
  }
}
