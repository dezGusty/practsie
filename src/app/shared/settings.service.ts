import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  public getSurveyCollection(): string {
    return 'surveys_22';
  }
}
