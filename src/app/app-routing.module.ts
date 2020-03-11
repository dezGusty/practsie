import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TokenGuard } from './auth/token-guard.service';
import { SurveyComponent } from './survey/survey.component';
import { DoneComponent } from './login/done/done.component';
import { DashComponent } from './dash/dash.component';
import { AuthGuard } from './auth/auth-guard.service';
import { SigninComponent } from './auth/signin/signin.component';
import { OrganizerGuard } from './auth/organizer-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'survey', canActivate: [TokenGuard], component: SurveyComponent },
  { path: 'done', component: DoneComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'dash', canActivate: [AuthGuard, OrganizerGuard], component: DashComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
