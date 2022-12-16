import { Injectable } from '@angular/core';
import { Survey } from './survey.model';
import { SurveyQuestion } from './surveyquestion.model';

import { Choice } from './choice.model';
import { QuestionResponseType } from './questionresponsetype.model';
import { AnswerSerialization } from './answerserialization.model';
import { SettingsService } from './settings.service';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { SurveyJsonConfigModel } from './survey-model/survey-json-config.model';
import { SurveyDefinitionQuestionModel } from './survey-model/survey-definition-question.model';
import { Result, wrap } from './result';



const surveyConfig = require('./surveyconfig.json').surveyConfig;



@Injectable()
export class SurveyService {

  private userToken = '';

  private singleSurvey: Survey | undefined = undefined;
  constructor(
    private firestore: Firestore,
    private settingsSvc: SettingsService) {
  }

  doesTokenSeemValid(token: string): boolean {
    return token.startsWith('PS-');
  }

  clearTokenAndDoc() {
    this.userToken = '';
    this.singleSurvey = undefined;
  }

  setUserToken(token: string) {
    this.userToken = token;
  }

  hasUserToken(): boolean {
    return this.userToken.length > 0
      && this.doesTokenSeemValid(this.userToken);
  }

  getDefaultSurvey(): Survey | undefined {
    if (!this.singleSurvey) {
      // Create the survey.
      if (this.userToken.length > 0) {
        this.singleSurvey = this.makeSurveyFromData(surveyConfig as SurveyJsonConfigModel);
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
  public makeQuestionFromData(questionConfig: SurveyDefinitionQuestionModel): SurveyQuestion {
    const result: SurveyQuestion = new SurveyQuestion(questionConfig.headline, questionConfig.description);
    const choicesArray = questionConfig.choices;
    choicesArray.forEach(choiceCfg => {
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
  public makeSurveyFromData(configObject: SurveyJsonConfigModel): Survey {
    const result: Survey = new Survey('default');
    const questionsAray = configObject.questions;

    questionsAray.forEach(question => {
      result.questions.push(this.makeQuestionFromData(question));
    });
    return result;
  }

  async saveSurveyResultsAsync(survey: Survey): Promise<Result<boolean>> {
    if (survey.userToken.length <= 0) {
      // invalid
      console.log('[survey] token length is invalid!');
      return { ok: false, error: Error('invalid token') };
    }
    const docName = '/' + this.settingsSvc.getSurveyCollection() + '/' + survey.userToken;
    const docRef = doc(this.firestore, docName);
    const obj: { [index: string]: AnswerSerialization } = {};

    const questionsAray = survey.questions as Array<any>;

    questionsAray.forEach(question => {
      const answerValue: AnswerSerialization = {
        type: question.answer.type,
        free: question.answer.freeAnswer,
        val: question.answer.getUserChoiceValue()
      };
      obj[question.headline] = answerValue;
    });

    const writeDocResult = await setDoc(docRef, obj, { merge: true })
      .catch(
        (err) => {
          if (err.code === 'permission-denied') {
            return { ok: false, error: Error('permission denied') };
          }
          return { ok: false, error: Error('some other error') };
        });

    if (writeDocResult === undefined) {
      return { ok: true, value: true };
    }

    return { ok: false, error: writeDocResult.error };
  }
}
