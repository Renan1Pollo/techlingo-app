import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { User } from '../../types/User.type';

@Component({
  selector: 'app-learn-modal',
  standalone: true,
  imports: [],
  templateUrl: './learn-modal.component.html',
  styleUrls: ['./learn-modal.component.scss']
})
export class LearnModalComponent implements OnInit {
  @Input() isModalOpen!: boolean;
  @Input() showHeart!: boolean;
  @Input() isQuizCompleted: boolean = false;

  @Output() closeModal = new EventEmitter<void>();
  @Output() continue = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  user: User = {
    id: 0,
    name: 'Usuário',
    email: 'email@example.com',
    password: '',
    score: 0,
    lives: 5
  };

  progressValue: number = 0;

  constructor(private cdr: ChangeDetectorRef) {
    this.updateProgress();
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  close() {
    this.closeModal.emit();
  }

  onContinue() {
    this.continue.emit();
  }

  decreaseLives(lives: number) {
    this.user.lives = lives;
    localStorage.setItem('user', JSON.stringify(this.user));
    this.cdr.detectChanges();
  }

  updateUserScore(userScore: number) {
    this.user.score += userScore;
    localStorage.setItem('user', JSON.stringify(this.user));
    this.cdr.detectChanges();
  }

  onBack() {
    this.back.emit();
  }

  updateProgress() {
    this.progressValue = 50;
  }

}
