import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Choice } from 'src/app/shared/choice.model';

@Component({
  selector: 'app-choice',
  standalone: true,
  templateUrl: './choice.component.html',
  styles: ['']
})
export class ChoiceComponent implements OnInit {

  @Input() choice: Choice | undefined;
  @Output() choiceSelected = new EventEmitter<Choice>();
  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.choiceSelected.emit(this.choice);
  }
}
