import { Component, OnInit, Input } from '@angular/core';
import { SurveyQuestion } from 'src/app/shared/surveyquestion.model';
import { Choice } from 'src/app/shared/choice.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styles: ['']
})
export class QuestionComponent implements OnInit {

  @Input() question: SurveyQuestion;
  constructor() {
  }

  ngOnInit(): void {
    console.log('[q]', this.question);

    this.question.answer.setUserChoiceByIndex(0);
  }

  onChoiceSelected($event) {
    console.log('choice selected', $event);
    
    const selectedChoice: Choice = $event;
    if (null == selectedChoice) {
      return;
    }
    console.log('selected: ', selectedChoice);

    this.question.answer.setUserChoiceByValue(selectedChoice.value);
  }
}
