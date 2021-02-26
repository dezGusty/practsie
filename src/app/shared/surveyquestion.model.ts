import { Answer } from './answer.model';
import { QuestionResponseType } from './questionresponsetype.model';

export class SurveyQuestion {

    public answer: Answer;

    constructor(public headline: string, public description: string) {
        this.answer = new Answer(QuestionResponseType.choiceResponse);
    }
}
