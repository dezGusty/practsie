import { TestBed } from '@angular/core/testing';

import { OrganizerGuardService } from './organizer-guard.service';

describe('OrganizerGuardService', () => {
  let service: OrganizerGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizerGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
