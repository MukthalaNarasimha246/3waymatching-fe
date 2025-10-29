import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EwaybillComponent } from './ewaybill.component';

describe('EwaybillComponent', () => {
  let component: EwaybillComponent;
  let fixture: ComponentFixture<EwaybillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EwaybillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EwaybillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
