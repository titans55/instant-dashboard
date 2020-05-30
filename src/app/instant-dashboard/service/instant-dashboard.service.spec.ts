/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InstantDashboardService } from './instant-dashboard.service';

describe('Service: InstantDashboard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstantDashboardService]
    });
  });

  it('should ...', inject([InstantDashboardService], (service: InstantDashboardService) => {
    expect(service).toBeTruthy();
  }));
});
