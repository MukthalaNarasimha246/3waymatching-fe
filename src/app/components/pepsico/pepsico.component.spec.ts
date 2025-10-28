import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PepsicoComponent } from './pepsico.component';

describe('PepsicoComponent', () => {
  let component: PepsicoComponent;
  let fixture: ComponentFixture<PepsicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PepsicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PepsicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
