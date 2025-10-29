import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardModernComponent } from './dashboard-modern.component';

describe('DashboardModernComponent', () => {
  let component: DashboardModernComponent;
  let fixture: ComponentFixture<DashboardModernComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardModernComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardModernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
