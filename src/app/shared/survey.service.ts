import { Injectable } from '@angular/core';
import { Survey } from './survey.model';
import { SurveyQuestion } from './surveyquestion.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private surveys: Survey[] = [];
  constructor() {
    this.surveys.push(this.makeSurveyFromData('bla'));
  }

  getAllSurveys() {

  }

  getSurveyByName(name: string): Survey {
    let result: Survey = new Survey();
    return result;
  }

  makeQuestionFromData(data: string): SurveyQuestion {
    let result: SurveyQuestion = new SurveyQuestion('blabla');

    return result;
  }
  makeSurveyFromData(data: string): Survey {
    let result: Survey = new Survey();

    result.questions.push(this.makeQuestionFromData('bla'));
    result.questions.push(this.makeQuestionFromData('bla'));
    return result;
  }
}
