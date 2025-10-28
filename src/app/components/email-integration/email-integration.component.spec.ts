import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailIntegrationComponent } from './email-integration.component';

describe('EmailIntegrationComponent', () => {
  let component: EmailIntegrationComponent;
  let fixture: ComponentFixture<EmailIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailIntegrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
