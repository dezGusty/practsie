import { QuestionResponseType } from './questionresponsetype.model';
import { Choice } from './choice.model';

export class Answer {
    public choices: Choice[] = [];
    public freeAnswer = '';
    private userSelectedChoice = -1;
    constructor(public type: QuestionResponseType = QuestionResponseType.CHOICE) {

    }

    public addChoice(choice: Choice) {
        this.choices.push(choice);
    }

    public setUserChoiceByValue(value: string) {
        this.userSelectedChoice = this.choices.findIndex(choice => choice.value === value);
    }
    public setUserFreeAnswer(value: string) {
        this.freeAnswer = value;
    }

    public getUserChoiceIndex(): number {
        return this.userSelectedChoice;
    }

}
