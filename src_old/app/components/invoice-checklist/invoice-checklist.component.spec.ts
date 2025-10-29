import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceChecklistComponent } from './invoice-checklist.component';

describe('InvoiceChecklistComponent', () => {
  let component: InvoiceChecklistComponent;
  let fixture: ComponentFixture<InvoiceChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoiceChecklistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoiceChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
