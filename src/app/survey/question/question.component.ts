import { Component, OnInit, Input } from '@angular/core';
import { SurveyQuestion } from 'src/app/shared/surveyquestion.model';
import { Choice } from 'src/app/shared/choice.model';
import { QuestionResponseType } from 'src/app/shared/questionresponsetype.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styles: ['']
})
export class QuestionComponent implements OnInit {

  @Input() question: SurveyQuestion | undefined;
  @Input() counter: number;
  @Input() maxcounter: number;

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
