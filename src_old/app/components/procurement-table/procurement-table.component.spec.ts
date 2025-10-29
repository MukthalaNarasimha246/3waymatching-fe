import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementTableComponent } from './procurement-table.component';

describe('ProcurementTableComponent', () => {
  let component: ProcurementTableComponent;
  let fixture: ComponentFixture<ProcurementTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcurementTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcurementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
