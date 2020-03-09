import { Injectable } from '@angular/core';
import { Survey } from './survey.model';
import { SurveyQuestion } from './surveyquestion.model';

import { surveyConfig } from './surveyconfig.json';
import { Choice } from './choice.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private userToken = '';

  private surveys: Survey[] = [];
  private singleSurvey: Survey = null;
  constructor(private db: AngularFirestore) {
    // this.surveys.push(this.makeSurveyFromData(surveyConfig));
  }

  // getAllSurveys() {
  //   return this.surveys;
  // }

  doesTokenSeemValid(token: string): boolean {
    return token.startsWith('PS-');
  }

  clearTokenAndDoc() {
    this.userToken = '';
    this.singleSurvey = null;
  }

  setUserToken(token: string) {
    this.userToken = token;
  }

  hasUserToken(): boolean {
    return this.userToken.length > 0
      && this.doesTokenSeemValid(this.userToken);
  }

  getDefaultSurvey(): Survey {
    if (null === this.singleSurvey) {
      // Create the survey.
      if (this.userToken.length > 0) {
        this.singleSurvey = this.makeSurveyFromData(surveyConfig);
        this.singleSurvey.name = 'default';
        this.singleSurvey.userToken = this.userToken;
      }
    }
    return this.singleSurvey;
  }

  // getSurveyByName(name: string): Survey {
  //   return this.getAllSurveys().find(survey => survey.name === name);
  // }

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
    const questionsAray = configObject.questions;

    questionsAray.forEach(question => {
      result.questions.push(this.makeQuestionFromData(question));
    });
    return result;
  }

  saveSurveyResults(survey: Survey) {
    console.log('[survey] saving', survey);
    if (survey.userToken.length <= 0) {
      // invalid
      console.log('[survey] token length is invalid!');
      return;
    }
    const docName = '/surveys/' + survey.userToken;
    console.log('docname:', docName);
    const surveyRef = this.db.doc(docName).ref;
    const obj = {};
    survey.questions.forEach(question => {
      console.log('key:', question.headline);
      console.log('value.type:', question.answer.type);
      console.log('value.free:', question.answer.freeAnswer);
      console.log('value.val:', question.answer.getUserChoiceValue());
      obj[question.headline] = {
        type: question.answer.type,
        free: question.answer.freeAnswer,
        val: question.answer.getUserChoiceValue()
      };
    })

    surveyRef.set(obj, { merge: true });

  }
}
