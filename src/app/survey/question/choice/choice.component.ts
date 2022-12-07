import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Choice } from 'src/app/shared/choice.model';

@Component({
  imports: [FormsModule, BrowserModule],
  selector: 'app-choice',
  standalone: true,
  styles: [''],
  templateUrl: './choice.component.html',
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
