import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgcCookieConsentModule, NgcCookieConsentConfig } from 'ngx-cookieconsent';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SurveyComponent } from './survey/survey.component';
import { QuestionComponent } from './survey/question/question.component';
import { LoginComponent } from './login/login.component';
import { SurveyService } from './shared/survey.service';
import { ChoiceComponent } from './survey/question/choice/choice.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { TokenGuard } from './auth/token-guard.service';
import { HeaderComponent } from './header/header.component';
import { DoneComponent } from './login/done/done.component';
import { FreeComponent } from './survey/question/free/free.component';
import { SigninComponent } from './auth/signin/signin.component';
import { DashComponent } from './dash/dash.component';
import { AuthGuard } from './auth/auth-guard.service';
import { AppStorage } from './shared/app-storage';
import { OrganizerGuard } from './auth/organizer-guard.service';

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
    ChoiceComponent,
    HeaderComponent,
    DoneComponent,
    FreeComponent,
    SigninComponent,
    DashComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgcCookieConsentModule.forRoot(cookieConfig)
  ],
  providers: [
    SurveyService,
    AppStorage,
    AuthGuard,
    OrganizerGuard,
    TokenGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
