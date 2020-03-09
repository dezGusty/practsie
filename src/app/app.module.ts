import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SurveyComponent } from './survey/survey.component';
import { QuestionComponent } from './survey/question/question.component';
import { LoginComponent } from './login/login.component';
import { SurveyService } from './shared/survey.service';
import { ChoiceComponent } from './survey/question/choice/choice.component';

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
    AppRoutingModule
  ],
  providers: [SurveyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
