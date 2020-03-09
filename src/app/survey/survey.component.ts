import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../shared/survey.service';
import { Survey } from '../shared/survey.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  constructor(private surveySvc: SurveyService, private router: Router) { }

  public survey: Survey;
  ngOnInit(): void {
    this.survey = this.surveySvc.getDefaultSurvey();
  }

  onStoreResultsClicked() {
    this.surveySvc.saveSurveyResults(this.survey);

    this.surveySvc.clearTokenAndDoc();
    this.router.navigate(['/done']);

  }

}
