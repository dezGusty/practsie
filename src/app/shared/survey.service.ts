import { Injectable } from '@angular/core';
import { Survey } from './survey.model';
import { SurveyQuestion } from './surveyquestion.model';

import { surveyConfig } from './surveyconfig.json';
import { Choice } from './choice.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private surveys: Survey[] = [];
  constructor() {
    this.surveys.push(this.makeSurveyFromData(surveyConfig));
  }

  getAllSurveys() {
    return this.surveys;
  }

  getSurveyByName(name: string): Survey {
    return this.getAllSurveys().find(survey => survey.name === name);
  }

  makeQuestionFromData(questionConfig: any): SurveyQuestion {
    console.log('questioncfg:', questionConfig);

    const result: SurveyQuestion = new SurveyQuestion(questionConfig.headline, questionConfig.question);
    questionConfig.choices.forEach(choiceCfg => {
      result.answer.addChoice(new Choice(choiceCfg.value, choiceCfg.detail, choiceCfg.desc));
    });

    return result;
  }

  makeSurveyFromData(configObject: any): Survey {
    const result: Survey = new Survey('default');
    console.log('config:', configObject);
    const questionsAray = configObject.questions;
    console.log('questions:', questionsAray);

    questionsAray.forEach(question => {
      result.questions.push(this.makeQuestionFromData(question));
    });
    return result;
  }
}
