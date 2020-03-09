import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../shared/survey.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ['']
})
export class LoginComponent implements OnInit {

  public userToken = '';
  constructor(private surveySvc: SurveyService, private router: Router) { }

  ngOnInit(): void {
  }

  onProceedClick() {
    console.log('[proceed]', this.userToken);
    
    if (this.surveySvc.doesTokenSeemValid(this.userToken)) {
      this.surveySvc.setUserToken(this.userToken);
      this.router.navigate(['/survey']);
    } else {
      this.surveySvc.setUserToken('');
      this.router.navigate(['/login']);
    }
  }
}
