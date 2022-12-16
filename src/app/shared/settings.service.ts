import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  public getSurveyCollection(): string {
    // ⚠ The app shall try to use this collection, but it could be that it does not manage to do use it.
    // If you create a new collection, the SECURITY RULES in firebase should also be updated.
    return 'surveys_test'; // surveys_22_winter
  }
}
