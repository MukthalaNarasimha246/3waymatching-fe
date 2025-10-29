import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityFlowComponent } from './entity-flow.component';

describe('EntityFlowComponent', () => {
  let component: EntityFlowComponent;
  let fixture: ComponentFixture<EntityFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityFlowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
