import { Component, OnInit, Input } from '@angular/core';
import { SurveyQuestion } from 'src/app/shared/surveyquestion.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styles: ['']
})
export class QuestionComponent implements OnInit {

  @Input() question: SurveyQuestion;
  constructor() { }

  ngOnInit(): void {
  }

}
