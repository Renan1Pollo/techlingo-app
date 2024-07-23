import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionInputComponent } from './selection-input.component';

describe('SelectionInputComponent', () => {
  let component: SelectionInputComponent;
  let fixture: ComponentFixture<SelectionInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectionInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
