import { Injectable } from '@angular/core';
import { Survey } from './survey.model';
import { SurveyQuestion } from './surveyquestion.model';

import { surveyConfig } from './surveyconfig.json';
import { Choice } from './choice.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { QuestionResponseType } from './questionresponsetype.model';
import { TableData, TableRow } from './tabledata.model';
import { AnswerSerialization } from './answerserialization.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private userToken = '';

  private surveys: Survey[] = [];
  private singleSurvey: Survey = null;
  constructor(private db: AngularFirestore) { }

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

  /**
   * Creates a SurveyQuestion object part of a Survey.
   *
   * @param questionConfig configuration object for a single question in a survey.
   */
  makeQuestionFromData(questionConfig: any): SurveyQuestion {
    const result: SurveyQuestion = new SurveyQuestion(questionConfig.headline, questionConfig.question);
    questionConfig.choices.forEach(choiceCfg => {
      result.answer.addChoice(new Choice(choiceCfg.value, choiceCfg.detail, choiceCfg.desc));
    });

    if (questionConfig.type && questionConfig.type === 'free') {
      result.answer.type = QuestionResponseType.freeTextResponse;
    }

    return result;
  }

  /**
   * Creates a new Survey object.
   *
   * @param configObject The JSON object containing the survey configuration.
   */
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
    const docName = '/surveys_21/' + survey.userToken;
    const surveyRef = this.db.doc(docName).ref;
    const obj: AnswerSerialization = {};

    survey.questions.forEach(question => {
      obj[question.headline] = {
        type: question.answer.type,
        free: question.answer.freeAnswer,
        val: question.answer.getUserChoiceValue()
      };
    });

    console.log('[save]', obj);
    surveyRef.set(obj, { merge: true });
  }
}
