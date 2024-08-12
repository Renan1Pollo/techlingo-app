import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswersCardComponent } from './answers-card.component';

describe('AnswersCardComponent', () => {
  let component: AnswersCardComponent;
  let fixture: ComponentFixture<AnswersCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswersCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnswersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
