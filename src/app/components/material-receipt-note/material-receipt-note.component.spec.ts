import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialReceiptNoteComponent } from './material-receipt-note.component';

describe('MaterialReceiptNoteComponent', () => {
  let component: MaterialReceiptNoteComponent;
  let fixture: ComponentFixture<MaterialReceiptNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialReceiptNoteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaterialReceiptNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
