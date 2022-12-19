import { enableProdMode, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { bootstrapApplication } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { provideRouter, RouterModule, Routes, withDebugTracing } from '@angular/router';
import { NgcCookieConsentConfig, NgcCookieConsentModule } from 'ngx-cookieconsent';
import { AppComponent } from './app/app.component';

// import { AppModule } from './app/app.module';
import { AuthGuard } from './app/auth/auth-guard.service';
import { OrganizerGuard } from './app/auth/organizer-guard.service';
import { SigninComponent } from './app/auth/signin/signin.component';
import { TokenGuard } from './app/auth/token-guard.service';
import { DashComponent } from './app/dash/dash.component';
import { DoneComponent } from './app/done/done.component';
import { LoginComponent } from './app/login/login.component';
import { AppStorage } from './app/shared/app-storage';
import { SurveyService } from './app/shared/survey.service';
import { SurveyComponent } from './app/survey/survey.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

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

const appRoutes: Routes = [
  { path: '', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'survey', canActivate: [TokenGuard], component: SurveyComponent },
  { path: 'done', component: DoneComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'dash', canActivate: [AuthGuard, OrganizerGuard], component: DashComponent }
];

bootstrapApplication(AppComponent, {
  providers: [
    // importProvidersFrom(RouterModule.forRoot(appRoutes)),
    provideRouter(appRoutes, withDebugTracing()),
    importProvidersFrom(provideAuth(() => {
      const auth = getAuth();
      return auth;
    })),
    importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebase))),
    importProvidersFrom(provideFirestore(() => {
      const firestore = getFirestore();
      // if (!firestore['_initialized']) {
      //   enableMultiTabIndexedDbPersistence(firestore);
      // }
      return firestore;
    })),
    importProvidersFrom(NgcCookieConsentModule.forRoot(cookieConfig)),
    SurveyService,
    AppStorage,
    AuthGuard,
    OrganizerGuard,
    TokenGuard
  ]
}).catch((err) => console.error(err));
