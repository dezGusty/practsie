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

  @Input() question: SurveyQuestion;
  @Input() counter: string;
  @Input() maxcounter: string;

  constructor() {
  }

  ngOnInit(): void {
    this.question.answer.setUserChoiceByIndex(0);
  }

  isFreeChoice(): boolean {
    return this.question.answer.type === QuestionResponseType.freeTextResponse;
  }

  onChoiceSelected($event) {
    const selectedChoice: Choice = $event;
    if (null == selectedChoice) {
      return;
    }
    console.log('selected: ', selectedChoice);

    this.question.answer.setUserChoiceByValue(selectedChoice.value);
  }

  onFreeAnswerChange($event) {
    console.log('change', $event);
    this.question.answer.freeAnswer = $event;
  }
}
