import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceAuditTrailComponent } from './invoice-audit-trail.component';

describe('InvoiceAuditTrailComponent', () => {
  let component: InvoiceAuditTrailComponent;
  let fixture: ComponentFixture<InvoiceAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoiceAuditTrailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoiceAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
