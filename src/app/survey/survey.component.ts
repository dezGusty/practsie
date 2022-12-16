import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../shared/survey.service';
import { Survey } from '../shared/survey.model';
import { Router, RouterModule } from '@angular/router';
import { QuestionComponent } from './question/question.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [QuestionComponent, CommonModule, FormsModule, NgIf, NgFor, RouterModule],
  standalone: true,
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styles: ['']
})
export class SurveyComponent implements OnInit {

  public survey: Survey | undefined;
  public errorMessage: string | undefined;

  constructor(
    private surveySvc: SurveyService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.survey = this.surveySvc.getDefaultSurvey();
  }

  async onStoreResultsClicked() {
    console.log('Storing results');

    if (!this.survey) {
      return;
    }

    const saveResult = await this.surveySvc.saveSurveyResultsAsync(this.survey);
    if (!saveResult.ok) {
      this.errorMessage = 'Could not save results';
      return;
    }

    console.log('Thank you.');
    this.surveySvc.clearTokenAndDoc();
    this.router.navigate(['/done']);
  }

}
