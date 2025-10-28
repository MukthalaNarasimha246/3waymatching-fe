import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptAgainstOrderComponent } from './receipt-against-order.component';

describe('ReceiptAgainstOrderComponent', () => {
  let component: ReceiptAgainstOrderComponent;
  let fixture: ComponentFixture<ReceiptAgainstOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceiptAgainstOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceiptAgainstOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
