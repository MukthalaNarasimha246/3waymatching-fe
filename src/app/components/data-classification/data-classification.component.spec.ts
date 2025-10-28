import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataClassificationComponent } from './data-classification.component';

describe('DataClassificationComponent', () => {
  let component: DataClassificationComponent;
  let fixture: ComponentFixture<DataClassificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataClassificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
