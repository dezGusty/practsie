import { Choice } from '../choice.model';

export class SurveyDefinitionQuestionModel {
  public choices: Choice[] = [];

  constructor(
    public headline: string,
    public description: string,
    public type: string) {

  }
}
