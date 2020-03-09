import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SurveyService } from '../shared/survey.service';

@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {

  constructor(private surveySvc: SurveyService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    if (this.surveySvc.hasUserToken()) {
      console.log('[guard] activating');
      return true;
    } else {
      console.log('[guard] navigating to root');
      this.router.navigate(['/']);
    }

    return this.surveySvc.hasUserToken();
  }
}
