import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TokenGuard } from './auth/token-guard.service';
import { SurveyComponent } from './survey/survey.component';
import { DoneComponent } from './login/done/done.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'survey', canActivate: [TokenGuard], component: SurveyComponent },
  { path: 'done', component: DoneComponent }
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
