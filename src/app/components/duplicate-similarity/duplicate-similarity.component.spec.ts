import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateSimilarityComponent } from './duplicate-similarity.component';

describe('DuplicateSimilarityComponent', () => {
  let component: DuplicateSimilarityComponent;
  let fixture: ComponentFixture<DuplicateSimilarityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DuplicateSimilarityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DuplicateSimilarityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
