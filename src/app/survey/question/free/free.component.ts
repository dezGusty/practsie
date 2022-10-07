import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-free',
  templateUrl: './free.component.html',
  styles: ['']
})
export class FreeComponent implements OnInit {

  @Output() answerChanged = new EventEmitter<string>();
  public userAnswer: any;
  constructor() { }

  ngOnInit(): void {
  }

  onUserAnswerChange($event: any) {
    this.answerChanged.emit(this.userAnswer);
  }
}
