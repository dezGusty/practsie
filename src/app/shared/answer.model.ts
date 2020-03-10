import { QuestionResponseType } from './questionresponsetype.model';
import { Choice } from './choice.model';

export class Answer {
    public choices: Choice[] = [];
    public freeAnswer = '';
    private userSelectedChoiceIndex = -1;
    constructor(public type: QuestionResponseType = QuestionResponseType.CHOICE) {

    }

    public addChoice(choice: Choice) {
        this.choices.push(choice);
    }

    public setUserChoiceByValue(value: string) {
        const foundIndex = this.choices.findIndex(choice => choice.value === value);
        this.setUserChoiceByIndex(foundIndex);
    }

    public setUserChoiceByObject(value: Choice) {
        const foundIndex = this.choices.findIndex(choice => choice === value);
        this.setUserChoiceByIndex(foundIndex);
    }

    public setUserChoiceByIndex(index: number) {
        // Update the 'old' index.
        if (this.userSelectedChoiceIndex >= 0 && this.userSelectedChoiceIndex < this.choices.length) {
            this.choices[this.userSelectedChoiceIndex].selected = false;
        }

        this.userSelectedChoiceIndex = index;

        if (this.userSelectedChoiceIndex >= 0 && this.userSelectedChoiceIndex < this.choices.length) {
            this.choices[this.userSelectedChoiceIndex].selected = true;
        }
    }

    public setUserFreeAnswer(value: string) {
        this.freeAnswer = value;
    }

    public getUserChoiceIndex(): number {
        return this.userSelectedChoiceIndex;
    }

    public getUserChoiceValue(): string {
        if (this.type === QuestionResponseType.CHOICE){
            return this.choices[this.userSelectedChoiceIndex].value;
        }

        return this.freeAnswer;
    }

}
