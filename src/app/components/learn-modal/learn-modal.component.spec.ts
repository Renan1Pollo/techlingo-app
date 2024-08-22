import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnModalComponent } from './learn-modal.component';

describe('LearnModalComponent', () => {
  let component: LearnModalComponent;
  let fixture: ComponentFixture<LearnModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearnModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
