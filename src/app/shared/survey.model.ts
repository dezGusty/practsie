import { SurveyQuestion } from './surveyquestion.model';

export class Survey {
    public questions: SurveyQuestion[] = [];

    public userToken = '';

    // Allow creation of a survey from an object.
    // E.g. {questions: [
    // {q: what's the difference between a duck},
    // {q: why}
    // ]}
    constructor(public name: string) {

    }
}
