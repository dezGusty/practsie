import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgcCookieConsentModule, NgcCookieConsentConfig } from 'ngx-cookieconsent';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SurveyComponent } from './survey/survey.component';
import { QuestionComponent } from './survey/question/question.component';
import { LoginComponent } from './login/login.component';
import { SurveyService } from './shared/survey.service';
import { ChoiceComponent } from './survey/question/choice/choice.component';
import { environment } from 'src/environments/environment';


// types: opt-out, opt-in, info
const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: environment.cookieConsentDomain // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
  },
  palette: {
    popup: {
      background: '#000'
    },
    button: {
      background: '#3CB9FC'
    }
  },
  theme: 'edgeless',
  type: 'info'
};

@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    QuestionComponent,
    LoginComponent,
    ChoiceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgcCookieConsentModule.forRoot(cookieConfig)
  ],
  providers: [SurveyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
