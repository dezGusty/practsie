import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../shared/survey.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styles: ['']
})
export class DashComponent implements OnInit {

  constructor(public surveySvc: SurveyService) { }

  ngOnInit(): void {
  }

  onGetReport() {
    this.surveySvc.getReportOfAllDocs();
  }
}
