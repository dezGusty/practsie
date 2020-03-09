import { Component, OnInit, Input } from '@angular/core';
import { Choice } from 'src/app/shared/choice.model';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styles: ['']
})
export class ChoiceComponent implements OnInit {

  @Input() choice: Choice;
  constructor() { }

  ngOnInit(): void {
  }

}
