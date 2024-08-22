import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../types/User.type';

@Component({
  selector: 'app-learn-modal',
  standalone: true,
  imports: [],
  templateUrl: './learn-modal.component.html',
  styleUrl: './learn-modal.component.scss'
})
export class LearnModalComponent {
  @Input() isModalOpen!: boolean;
  @Input() showHeart!: boolean;
  @Output() closeModal = new EventEmitter();
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

  updateProgress() {
    this.progressValue = 50;
  }
}
