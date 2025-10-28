import { TestBed } from '@angular/core/testing';

import { DashboardSeviceService } from './dashboard-sevice.service';

describe('DashboardSeviceService', () => {
  let service: DashboardSeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardSeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
