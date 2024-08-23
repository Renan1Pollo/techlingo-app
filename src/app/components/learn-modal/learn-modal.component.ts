import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  user!: User;
  progressValue: number = 0;

  constructor() {
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

  onBack() {
    this.back.emit();
  }

  updateProgress() {
    this.progressValue = 50;
  }
}
