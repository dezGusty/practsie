// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';

// import { NgcCookieConsentModule, NgcCookieConsentConfig } from 'ngx-cookieconsent';


// import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
// import { getFirestore, provideFirestore, enableMultiTabIndexedDbPersistence } from '@angular/fire/firestore';
// import { provideAuth, connectAuthEmulator, getAuth } from '@angular/fire/auth';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { LoginComponent } from './login/login.component';
// import { SurveyService } from './shared/survey.service';
// import { environment } from 'src/environments/environment';
// import { TokenGuard } from './auth/token-guard.service';
// import { HeaderComponent } from './header/header.component';
// import { DoneComponent } from './login/done/done.component';
// import { DashComponent } from './dash/dash.component';
// import { AuthGuard } from './auth/auth-guard.service';
// import { AppStorage } from './shared/app-storage';
// import { OrganizerGuard } from './auth/organizer-guard.service';
// import { QuestionComponent } from './survey/question/question.component';
// import { SurveyComponent } from './survey/survey.component';

// // types: opt-out, opt-in, info
// const cookieConfig: NgcCookieConsentConfig = {
//   cookie: {
//     domain: environment.cookieConsentDomain // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
//   },
//   palette: {
//     popup: {
//       background: '#000'
//     },
//     button: {
//       background: '#3CB9FC'
//     }
//   },
//   theme: 'edgeless',
//   type: 'info'
// };

// @NgModule({
//   declarations: [
//     AppComponent,
//     // SurveyComponent,
//   ],
//   imports: [
//     provideAuth(() => {
//       const auth = getAuth();
//       return auth;
//     }),
//     provideFirebaseApp(() => initializeApp(environment.firebase)),
//     provideFirestore(() => {
//       const firestore = getFirestore();
//       // if (!firestore['_initialized']) {
//       //   enableMultiTabIndexedDbPersistence(firestore);
//       // }
//       return firestore;
//     }),
//     BrowserModule,
//     FormsModule,
//     AppRoutingModule,
//     NgcCookieConsentModule.forRoot(cookieConfig),
//     QuestionComponent,
//     LoginComponent,
//     HeaderComponent,
//     DoneComponent,
//     DashComponent,
//     SurveyComponent
//   ],
//   providers: [
//     SurveyService,
//     AppStorage,
//     AuthGuard,
//     OrganizerGuard,
//     TokenGuard
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
