import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../shared/survey.service';
import { Survey } from '../shared/survey.model';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  constructor(private surveySvc: SurveyService) { }

  public survey: Survey;
  ngOnInit(): void {
    this.survey = this.surveySvc.getSurveyByName('default');
  }

}
