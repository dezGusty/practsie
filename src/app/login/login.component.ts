import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../shared/survey.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  standalone: true,
  styles: [''],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  public userToken = '';
  constructor(private surveySvc: SurveyService, private router: Router) { }

  ngOnInit(): void {
  }

  onProceedClick() {
    if (this.surveySvc.doesTokenSeemValid(this.userToken)) {
      this.surveySvc.setUserToken(this.userToken);
      this.router.navigate(['/survey']);
    } else {
      this.surveySvc.setUserToken('');
      this.router.navigate(['/login']);
    }
  }

  onInputTokenChange($event: any) {
    if ($event.code === 'Enter') {
      this.onProceedClick();
    }
  }
}
