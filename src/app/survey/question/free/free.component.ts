import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-free',
  standalone: true,
  styles: [''],
  templateUrl: './free.component.html'
})
export class FreeComponent implements OnInit {

  @Output() answerChanged = new EventEmitter<string>();
  public userAnswer = '';
  constructor() { }

  ngOnInit(): void {
  }

  onUserAnswerChange($event: any) {
    this.answerChanged.emit(this.userAnswer);
  }
}
